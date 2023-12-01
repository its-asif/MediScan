import { Link } from "react-router-dom";


const TestCard = ({test}) => {

    const {_id, name, date, details, image, price, slots} = test;
    // difference between date and today
    const today = new Date();
    const testDate = new Date(date);
    const diffTime = Math.abs(testDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays)
    return (
        <div>
            <div className="card card-compact max-w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" className="w-full h-96"/></figure>
                <div className="card-body text-left">
                    <h2 className="card-title">{name}</h2>
                    <p>{details}</p>
                    <p>Date : {date}</p>
                    <p>Available Dates : {diffDays}</p>
                    <p>Slot Left : {slots}</p>

                    <div className="card-actions justify-end mr-8 mb-5">
                    <Link to={`/testDetails/${_id}`}>
                    <button 
                                        className="block w-full mx-auto rounded bg-yellow-400 p-4 text-lg font-medium transition hover:scale-105"
                    >Show Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestCard;