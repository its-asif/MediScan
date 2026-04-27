import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const AllFeatured = () => {
    const axiosPublic = useAxiosPublic();

    // promotion data
    const promotions = [
        {
            title: "Cardiac Health Checkup",
            description: "Comprehensive heart health checkup. Book now for a free consultation!",
            image: 'https://i.ibb.co/QQXNmB9/promo1.webp',
        },
        {
            title: "Diabetes Screening Package",
            description: "Free diabetes screening package. Book now for peace of mind!",
            image: 'https://i.ibb.co/zrb2Jkh/promo2.webp',
        },
        {
            title: "Wellness & Immunity Boost",
            description: "Boost your immunity! Book now for a free wellness consultation!",
            image: 'https://i.ibb.co/6gqQwFS/promo3.jpg',
        }

    ];


    const { data: featuredTests = [] } = useQuery({
        queryKey: ['featuredTests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/test/count');
            return res.data;
        },
    });

    const featuredTestsData = [...featuredTests]
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);


    return (
        <section className='mediscan-shell py-8 sm:py-12'>
            <SectionTitle heading="Explore Featured Tests" subHeading="Discover our handpicked featured tests, curated just for you!" />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {promotions.map((promotion, index) => (
                    <article key={index} className="group overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 text-base-content shadow-2xl shadow-slate-950/10 transition hover:-translate-y-1 hover:shadow-primary/10">
                        <div className="relative h-72 overflow-hidden">
                            <img src={promotion.image} alt={promotion.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/55 to-transparent" />
                            <div className="absolute left-4 top-4 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                                Promo
                            </div>
                        </div>
                        <div className="space-y-4 p-6">
                            <h2 className="text-2xl font-bold">{promotion.title}</h2>
                            <p className="text-sm leading-7 text-base-content/75">{promotion.description}</p>
                            <Link to={'/allTestPage'} className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-content transition hover:bg-primary-focus">
                                View Tests
                            </Link>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredTestsData.map((test, index) => (
                    <article key={test._id ?? index} className="overflow-hidden rounded-[1.75rem] border border-base-300 bg-base-100 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl">
                        <div className="relative h-60 overflow-hidden">
                            <img src={test.image} alt={test.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/35 to-transparent" />
                            <span className="absolute left-4 top-4 rounded-full bg-base-100/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-base-content">
                                Featured
                            </span>
                        </div>
                        <div className="space-y-4 p-6 text-base-content">
                            <h2 className="text-2xl font-black tracking-tight">{test.name}</h2>
                            <p className="text-sm leading-7 text-base-content/75">{test.details}</p>
                            <div className="flex items-center justify-between gap-3 pt-2">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.24em] text-base-content/50">Bookings</p>
                                    <p className="text-2xl font-black text-base-content">{test.count}</p>
                                </div>
                                <Link to={'/allTestPage'} className="inline-flex items-center rounded-full bg-base-300 px-5 py-3 text-sm font-semibold text-base-content transition hover:bg-base-200">
                                    View all
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default AllFeatured;
