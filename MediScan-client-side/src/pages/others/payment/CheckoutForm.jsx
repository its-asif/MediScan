import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useActiveBanner from "../../../hooks/useActiveBanner";

const CheckoutForm = ({test, refetch}) => {
    const [error, setError] = useState('');
    const {user} = useAuth();
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const price = test?.price;
    const banner = useActiveBanner();
    const activeCoupon = banner[0][0];
    const activeCouponCode = activeCoupon?.coupon_code;
    const activeDiscountRate = activeCoupon?.discount_rate;
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(test?.price);
    
    useEffect(() => {
        setTotal(price)
    }, [price])


    useEffect( () => {
        if(total){
            axiosSecure.post('/create-payment-intent', {price: total})
            .then(res => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret);
            })
        }
    },[axiosSecure, total])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( !stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);
        if(!card){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });

        if(error){
            console.log(error);
            setError(error.message);
        }
        else{
            console.log(paymentMethod);
            setError('');
        }

        // consfirm payment
        const {paymentIntent, error : confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card: card,
                billing_details:{
                    name: user?.displayName || 'anonymous',
                    email: user?.email || 'anonymous'
                }
            }
        });


        if(confirmError){
            console.log(confirmError);
            Swal.fire({
                title: "Payment Failed",
                text: confirmError.message,
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
            });
        }
        else{
            console.log("payment intent", paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log(paymentIntent);
                setTransactionId(paymentIntent.id);

                const payment ={
                    transactionId : paymentIntent.id,
                    email: user?.email || 'anonymous',
                    price: total,
                    date: new Date(),
                    testId : test?._id,
                    status : 'pending',
                }

                const res = await axiosSecure.post('/payments', payment);

                // patch test and decrease slots by 1 every time payment is successful
                const res2 = await axiosSecure.patch(`/tests/slots/${test?._id}`, {slots: test?.slots - 1});
                refetch();

                console.log("payment", res.data);
                
                Swal.fire({
                    position: 'top-end',
                    title: "Payment Success",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                });

            }
        }
    }
    return (
        <div className="w-full">
            <h3 className="text-2xl font-semibold mb-6">Pay with Card</h3>
            {/* <p className="text-xs">coupon : {activeCouponCode}</p> */}
            <span className="text-sm font-semibold mb-4 mr-2">Coupon Code:</span>

            <input type="text" placeholder="Enter Coupon Code" name="couponCode"
                onChange={(e) => {
                    if(e.target.value === activeCouponCode){
                        setDiscount(price * activeDiscountRate / 100);
                        setTotal(price - price * activeDiscountRate / 100);
                    }
                    else{
                        setDiscount(0);
                        setTotal(price);
                    }
                }}
            className="input input-sm border-black mb-2" />
   
            <h3 className="text-2xl font-semibold mb-6">Payment Details</h3>

            <table className="table table-compact table-zebra my-5 mb-10">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Discount</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${price}</td>
                        <td>${discount}</td>
                        <td>${total}</td>
                    </tr>
                </tbody>
            </table>

            <h3 className="text-2xl font-semibold mb-6">Card Details</h3>
            <form onSubmit = {handleSubmit}>
                
            <CardElement
                options={{
                style: {
                    base: {
                    fontSize: '20px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    },
                    invalid: {
                    color: '#9e2146',
                    },
                },
                }}
            />
            <button
            type="submit" 
            disabled={ transactionId || !stripe || !clientSecret }
            className="btn btn-sm btn-warning mt-5"
            >
                { !transactionId ? "Pay" : "Paid"}
            </button>
            
            {error && <p className="text-rose-700 mt-2">* {error}</p>}
            {transactionId && <p className="text-green-700 mt-2">Your Transaction id: {transactionId} </p>}

            </form>
        </div>
    );
};

export default CheckoutForm;