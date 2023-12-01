import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import AllFeatured from './AllFeatured';
import RecommandationSlider from './RecommandationSlider';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>MediScan | Home</title>
            </Helmet>
            <Banner />
            <AllFeatured />
            <RecommandationSlider />
        </div>
    );
};

export default Home;