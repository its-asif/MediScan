import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Query, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const AllFeatured = () => {
    const axiosPublic = useAxiosPublic();

    // promotion data
    const promotions = [
        {
            title: "Cardiac Health Checkup",
            description: "Comprehensive heart health checkup. Book now for a free consultation!",
            image: 'https://i.ibb.co/72DQcRq/promo1.jpg',
        },
        {
            title: "Diabetes Screening Package",
            description: "Free diabetes screening package. Book now for peace of mind!",
            image: 'https://i.ibb.co/j4YJVzR/promo2.jpg',
        },
        {
            title: "Wellness & Immunity Boost",
            description: "Boost your immunity! Book now for a free wellness consultation!",
            image: 'https://i.ibb.co/6gqQwFS/promo3.jpg',
        }

    ];


    const { data: featuredTests = [], refetch } = useQuery({
        queryKey: 'featuredTests',
        queryFn: async () => {
            const res = await axiosPublic.get('/test/count');
            return res.data;
        },
    });

    const sortedTests = featuredTests.sort((a, b) => b.testIdsCount - a.testIdsCount);

    // Display up to 3 featured tests
    const featuredTestsData = featuredTests.slice(0, 3);
    console.log(featuredTestsData);



    return (
        <div className='px-10'>
            <SectionTitle heading="Explore Featured Tests" subHeading="Discover our handpicked featured tests, curated just for you!" />

            {/* Static Promotions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promotions.map((promotion, index) => (
                    <div key={index} className="card max-w-96 h-72  bg-base-100 shadow-xl image-full">
                        <figure>
                            <img src={promotion.image} alt={promotion.title} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-center text-2xl font-extrabold">{promotion.title}</h2>
                            <p>{promotion.description}</p>
                            <div className="card-actions justify-end">
                                <Link to={'/allTestPage'}>
                                    <button className="btn ">Promotional</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Featured Tests */}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {featuredTests.map((test) => (
                    <div key={test._id} className="card max-w-96 h-72 bg-base-100 shadow-2xl image-full">
                        <figure>
                            <img src={test.image} alt={test.name} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-center text-2xl font-extrabold">{test.name}</h2>
                            <p>{test.details}</p>
                            <div className="card-actions justify-end">
                                <Link to={'/allTestPage'}>
                                <button className="btn ">Booked : {test.count}</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllFeatured;
