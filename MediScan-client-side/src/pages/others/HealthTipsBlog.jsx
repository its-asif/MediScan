import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../shared/SectionTitle';
import Swal from 'sweetalert2';

const HealthTipsBlog = () => {

    const healthTipsData = [
        {
            title: 'The Power of Healthy Eating',
            description:
                'Discover the benefits of incorporating nutritious foods into your daily diet. Learn about superfoods and meal planning for optimal health.',
            image: 'https://img.freepik.com/free-vector/people-healthy-food_24908-55181.jpg?w=360&t=st=1701189648~exp=1701190248~hmac=db13029f20d632acdf3c65db859e255ea5a2ff62d198438ba01ae97b92a3fb12',
            year: '2022',
            date: 'OCT 10',
            link: '/health-tips/healthy-eating',
        },
        {
            title: 'Staying Active for a Healthy Life',
            description:
                'Explore the importance of regular physical activity in maintaining a healthy lifestyle. Find tips on creating a personalized exercise routine.',
            image: 'https://img.freepik.com/free-vector/family-health-sport-fitness-flat-horizontal-composition-with-grandparents-parents-kid-exercising-with-barbells-outdoor-illustration_1284-29281.jpg?w=826&t=st=1701189691~exp=1701190291~hmac=785de9a5a392bad3b47229def07833118b42814450221d8c0b3dd517e1d16bc1',
            date: '2022-10-15',
            year: '2022',
            date: 'OCT 15',
            link: '/health-tips/staying-active',
        },
        {
            title: 'Mindfulness and Mental Health',
            description:
                'Learn about the connection between mindfulness practices and mental well-being. Discover techniques for managing stress and improving mental health.',
            image: 'https://img.freepik.com/free-vector/young-man-practicing-yoga-exercises-mental-body-health_74855-20437.jpg?w=740&t=st=1701189780~exp=1701190380~hmac=b9e5016d65c44fd35a4e5ccef96eeab02543291b278cd875600642147e963775',
            date: '2022-10-20',
            year: '2022',
            date: 'Sep 23',
            link: '/health-tips/mindfulness-mental-health',
        },
        {
            title: 'Quality Sleep for a Healthier You',
            description:
                'Explore the impact of quality sleep on overall health and well-being. Find tips on improving sleep hygiene and creating a restful bedtime routine.',
            image: 'https://img.freepik.com/free-vector/sleep-analysis-isometric-composition_1284-23930.jpg?w=360&t=st=1701189832~exp=1701190432~hmac=7c9a76009fba2e4824c2b22dbf4dadb4118eec133c9f9e4571a5554f961b15dd',
            date: '2022-10-25',
            year: '2023',
            date: 'Feb 13',
            link: '/health-tips/quality-sleep',
        },
    ];

    console.log(healthTipsData)
    return (
        <div>
            <Helmet>
                <title>MediScan | Health Tips Blog</title>
            </Helmet>
            <SectionTitle
                heading="Health Tips Blog"
                subHeading="Explore our informative articles, tips, and guides for a healthier lifestyle."
            />
            <div className="grid lg:grid-cols-2 gap-10 m-20">
                {/* Health Tip */}
                {
                    healthTipsData.map((healthTip, index) => (
                        <article className="flex bg-white transition shadow-xl p-4 hover:border-2 " >
                            <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                                <div
                                    className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                                >
                                    <span>{healthTip.year}</span>
                                    <span className="w-px flex-1 bg-gray-900/10"></span>
                                    <span>{healthTip.date}</span>
                                </div>
                            </div>

                            <div className="hidden sm:block sm:basis-56">
                                <img
                                    alt="Healthy Eating"
                                    src={healthTip.image}
                                    className="aspect-square h-full w-full object-cover"
                                />
                            </div>

                            <div className="flex flex-1 flex-col justify-between">
                                <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                                    <a href="#">
                                        <h3 className="font-bold uppercase text-gray-900">
                                            {healthTip.title}
                                        </h3>
                                    </a>

                                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                                        {healthTip.description}
                                    </p>
                                </div>

                                <div className="sm:flex sm:items-end sm:justify-end">
                                    <span
                                        className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                                        onClick={() =>{
                                            Swal.fire({
                                                title: 'Coming Soon',
                                                text: 'This feature is not available yet!',
                                                icon: 'info',
                                                showCancelButton: false,
                                                showConfirmButton: false,
                                                timer: 3000,
                                            })
                                        }}
                                    >
                                        Read Blog
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))
                }

                
            </div>
        </div>
    );
};

export default HealthTipsBlog;
