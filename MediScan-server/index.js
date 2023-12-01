const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// middleware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gf8ipgr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }  
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const testCollection = client.db("mediScanDB").collection("tests");
    const userCollection = client.db("mediScanDB").collection("users");
    const bannerCollection = client.db("mediScanDB").collection("banners");
    const paymentCollection = client.db("mediScanDB").collection("payments");
    const suggestionCollection = client.db("mediScanDB").collection("suggestions");

    // JWT 
    app.post('/jwt', async(req, res) => {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '6h'});
        res.send({token});
      });

    // verify token
    const verifyToken = (req, res, next) => {
        console.log("inside verify token",req.headers.authorization);
        if(!req.headers.authorization) {
          return res.status(401).send({ message : 'Unauthorized request'});
        }
  
        const token = req.headers.authorization.split(' ')[1];
        
  
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            console.log("inside jwt verify", decoded)
          if(err) {
            return res.status(403).send({ message : 'Unauthorized request'});
          }
          req.decoded = decoded;
          next(); 
        })
      } 

      // use verify admin after verify token
    const verifyAdmin = async(req, res, next) => {
        const email = req.decoded.email;
        const query = {email: email};
        const user = await userCollection.findOne(query);
        let isAdmin = user?.isAdmin;
        
        if(!isAdmin) {
          return res.status(403).send({ message : 'Unauthorized access'});
        }
        next();
      }












    // tests api
    app.get('/tests', async (req, res) => {
        const tests = await testCollection.find().toArray(); 
        res.send(tests);
    })

    app.get('/tests/:id', async (req, res) => {
        const id = req.params.id;
        let test = await testCollection.findOne({_id: id});
        if(!test) {
            test = await testCollection.findOne({_id: new ObjectId(id)});
        }
        res.send(test); 
    })

    app.post('/tests', verifyToken, verifyAdmin, async (req, res) => {
        const newTest = req.body;
        const result = await testCollection.insertOne(newTest);
        // console.log('got new test', req.body);
        res.json(result);
    })

    app.delete('/tests/:id', verifyToken, verifyAdmin, async (req, res) => {
        const id = req.params.id;
        let query = {_id: new ObjectId(id)};
        let result = await testCollection.deleteOne(query);
        if(result.deletedCount == 0) {
            query = {_id: id};
            result = await testCollection.deleteOne(query);
        }
        
        res.send(result);
    })

    app.patch('/tests/:id', async (req, res) => { //
        const id = req.params.id;
        let filter = {_id: new ObjectId(id)};
        // console.log(req.body)
        const updateDoc = {
            $set: {
                name: req.body.name,
                price: req.body.price,
                slots: req.body.slots,
                details: req.body.details,
                image: req.body.image,
                date: req.body.date
            }
        }
        let result = await testCollection.updateOne(filter, updateDoc);
        if(result.modifiedCount == 0) {
            filter = {_id: id};
            result = await testCollection.updateOne(filter, updateDoc);
        }
        res.send(result);
    })

    
    app.patch('/tests/slots/:id', async (req, res) => {
        const id = req.params.id; 
        const filter = {_id: new ObjectId(id)};
        const existingTest = await testCollection.findOne(filter);
        const slots = existingTest.slots;
        const updateDoc = {
            $set: {
                slots: slots - 1
            }
        }
        const result = await testCollection.updateOne(filter, updateDoc);
        res.send(result);
    })




    // banner api

    app.get('/banners', async (req, res) => {
        const banners = await bannerCollection.find().toArray(); 
        res.send(banners);
    }) 

    // get active banner isActive = true
    app.get('/banners/active', async (req, res) => {
        const banners = await bannerCollection.find({isActive: true}).toArray(); 
        res.send(banners);
    })

    app.post('/banners', verifyToken, verifyAdmin, async (req, res) => {
        const newBanner = req.body;
        const result = await bannerCollection.insertOne(newBanner);
        // console.log('got new banner', req.body);
        res.json(result);
    })

    app.patch('/banners/active/:id', verifyToken, verifyAdmin, async (req, res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        
        // Activate the current banner
        const activateBanner = async () => {
            const updateDoc = {
                $set: {
                    isActive: true
                }
            };
            const result = await bannerCollection.updateOne(filter, updateDoc);
            return result;
        };
    
        // Deactivate all other banners
        const deactivateOtherBanners = async () => {
            const otherBannersFilter = {_id: {$ne: new ObjectId(id)}};
            const updateDoc = {
                $set: {
                    isActive: false
                }
            };
            const result = await bannerCollection.updateMany(otherBannersFilter, updateDoc);
            return result;
        };
    
        try {
            const [activateResult, deactivateResult] = await Promise.all([activateBanner(), deactivateOtherBanners()]);
            res.send({ activateResult, deactivateResult });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    });

    app.delete('/banners/:id', verifyToken, verifyAdmin, async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await bannerCollection.deleteOne(query);

        res.send(result);
    })






    // user api
    
    app.get('/users' , async (req, res) => {
        // console.log(req.headers.authorization)
        const users = await userCollection.find().toArray(); 
        res.send(users);
    })
    
    app.get('/users/:email',   async (req, res) => {
        const users = await userCollection.find({email: req.params.email}).toArray();
        res.send(users);
    })

    app.post('/users', async (req, res) => {
        const newUser = req.body;
        const result = await userCollection.insertOne(newUser);
        // console.log('got new user', req.body);
        res.json(result);
    })

    // update user name, bloodGroup, district, upazila, photoURL
    app.patch('/users/:email', verifyToken, async (req, res) => {
        const email = req.params.email;
        const filter = {email: email};
        const updateDoc = {
            $set: {
                name: req.body.name,
                bloodGroup: req.body.bloodGroup,
                district: req.body.district,
                upazila: req.body.upazila,
                photoURL: req.body.photoURL
            }
        }
        const result = await userCollection.updateOne(filter, updateDoc);
        res.send(result);
    })
    

    app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        
        const existingUser = await userCollection.findOne(filter);
        
        const newRole = !existingUser.isAdmin;
        const updateDoc = {
            $set: {
                isAdmin: newRole
            }
        }
        const result = await userCollection.updateOne(filter, updateDoc);
        res.send(result);
    })

    app.patch('/users/active/:id', verifyToken, verifyAdmin, async (req, res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        
        const existingUser = await userCollection.findOne(filter);
        
        const newStatus = !existingUser.active;
        const updateDoc = {
            $set: {
                active : newStatus
            }
        }
        const result = await userCollection.updateOne(filter, updateDoc);
        res.send(result);
    })




    // get if user is admin
    app.get('/users/admin/:email',  async (req, res) => {
        const email = req.params.email;
        const query = {email: email};
        const user = await userCollection.findOne(query);
        let isAdmin = false;
        if(user) {
            isAdmin = user?.isAdmin;
        }
        res.send({isAdmin});
    })

    // get if user is active
    app.get('/users/active/:email', async (req, res) => {
        const email = req.params.email;
        const query = {email: email};
        const user = await userCollection.findOne(query);
        let isActive = false;
        if(user) {
            isActive = user?.active;
        }
        res.send({isActive});
    })







    // payment api
    app.post('/create-payment-intent', async (req, res) => {
        const {price} = req.body;
        const amount = parseInt(price * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ["card"]
        });

        res.send({
            clientSecret: paymentIntent.client_secret
        })
    });

    app.post('/payments', async (req, res) => {
        const payment = req.body;
        const paymentResult = await paymentCollection.insertOne(payment);
        // console.log('got new payment', req.body);
        res.json(paymentResult);
    })

    app.get('/payments', async (req, res) => {
        const payments = await paymentCollection.find().toArray(); 
        const testIds = payments.map(payment => payment.testId);
        const tests = [];
        for(const id of testIds) {
            let test = await testCollection.findOne({_id: new ObjectId(id)});
            if(!test) {
                test = await testCollection.findOne({_id: id});
            }
            // console.log("kam kor please",test)
            tests.push(test);
        }
        
        const combinedData = [];
        for(let i = 0; i < payments.length; i++) {
            const payment = payments[i];
            const test = tests[i];
            // console.log("test =>",test);
            const combined = {
                testName: test.name,
                testDate: test.date,
                ...payment
            }
            combinedData.push(combined);
        }
        res.send(combinedData);
        
        // res.send(payments);
    })
    
    // getting payment which are delivered and match email
    app.get('/payments/delivered/:email', async (req, res) => {
        const payments = await paymentCollection.find({email: req.params.email, status: "delivered"}).toArray();
        res.send(payments);
    })

    // getting payments by user email
    app.get('/payments/:email', async (req, res) => {
        const payments = await paymentCollection.find({email: req.params.email}).toArray();
        const testIds = payments.map(payment => payment.testId);
        const tests = [];
        for(const id of testIds) {
            const test = await testCollection.findOne({_id: new ObjectId(id)});
            tests.push(test);
        }

        const combinedData = [];
        for(let i = 0; i < payments.length; i++) {
            const payment = payments[i];
            const test = tests[i];
            const combined = {
                testName: test.name,
                testDate: test.date,
                ...payment
            }
            combinedData.push(combined);
        }
        res.send(combinedData);

    })

    app.get('/payments/tests/:email', async (req, res) => {
        const payments = await paymentCollection.find({email: req.params.email}).toArray();
        const testIds = payments.map(payment => payment.testId);
        // console.log(testIds);
        res.send(testIds);
    })
    
    // getting payments by test idava
    app.get('/payments/test/:id', async (req, res) => {
        const payments = await paymentCollection.find({testId: req.params.id}).toArray();
        res.send(payments);
    })

    // getting tests with payment count
    app.get('/test/count', async (req, res) => {
        try {
            const payments = await paymentCollection.find().toArray();
            const testIds = payments.map(payment => payment.testId);
    
            const testIdsCount = {};
            testIds.forEach(id => {
                testIdsCount[id] = (testIdsCount[id] || 0) + 1;
            });
    
            const uniqueTestIds = [...new Set(testIds)];
            const tests = await testCollection.find({ _id: { $in: uniqueTestIds.map(id => new ObjectId(id)) } }).toArray();
    
            const combinedData = tests.map(test => ({
                ...test,
                count: testIdsCount[test._id.toString()] || 0,
            }));
    
            res.send(combinedData);
        } catch (error) {
            console.error('Error fetching test count:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
 

    // deleting payment by id
    app.delete('/payments/:id', verifyToken, async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await paymentCollection.deleteOne(query);

        res.send(result);
    })

    // updating payment status to "delivered" and upsert reportLink
    app.patch('/payments/:id', verifyToken, async (req, res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const updateDoc = {
            $set: {
                status: "delivered",
                reportLink: req.body.reportLink
            }
        }
        const result = await paymentCollection.updateOne(filter, updateDoc);
        res.send(result);
    })


    // suggestion api
    app.get('/suggestions', async (req, res) => {
        const suggestions = await suggestionCollection.find().toArray(); 
        res.send(suggestions);
    })


    
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('MediScan is running')
})
 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})