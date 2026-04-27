import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
// const Banner = React.lazy(() => import('./Banner'));
// import AllFeatured from './AllFeatured';
const AllFeatured = React.lazy(() => import('./AllFeatured'));
import HomeShowcase from './HomeShowcase';
// const RecommandationSlider = React.lazy(() => import('./RecommandationSlider'));

const Home = () => {


    return (
        <div>
            <Helmet>
                <title>MediScan | Home</title>
            </Helmet>
            {/* <Suspense fallback={ <p>banner is loading</p>}> */}
                <Banner />
            {/* </Suspense> */}
            
            
            <HomeShowcase />
            
            <Suspense fallback={ <p>Featured section is loading</p>}>
                <AllFeatured />
            </Suspense>
        </div>
    );
};

export default Home;