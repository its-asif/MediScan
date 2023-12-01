import { Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar';
import Footer from '../pages/shared/Footer';
import React, { useState, useEffect } from 'react';

const Main = () => {
    

    return (
        <div 
        // className={`${isdark ? 'bg-[#1f1f1f] text-white' : 'bg-white'}`}
        >
            <Navbar />

            <div className='mt-16'>
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default Main;