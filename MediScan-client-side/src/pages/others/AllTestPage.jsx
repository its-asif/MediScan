import React, { useEffect, useState } from 'react';
import SectionTitle from '../shared/SectionTitle';
import { Helmet } from 'react-helmet-async';
import TestCard from './TestCard';
import useTests from '../../hooks/UseTests';

const ITEMS_PER_PAGE = 6;

const AllTestPage = () => {
    const [tests, loading] = useTests();
    const [searchDate, setSearchDate] = useState('');
    const [filteredTest, setFilteredTest] = useState(formatDate(new Date()));
    const [currentPage, setCurrentPage] = useState(1);

    const testFromToday = tests.filter(test => test.date >= filteredTest);
    const filteredTests = testFromToday.filter(test => {
        const testDate = formatDate(new Date(test.date));
        const enteredDate = formatDate(new Date(searchDate));
        return !isNaN(searchDate) || testDate === enteredDate;
    });

    const totalPages = Math.ceil(filteredTests.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentTests = filteredTests.slice(startIndex, endIndex);

    function formatDate(date) {
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();

        if (month.length === 1) month = '0' + month;
        if (day.length === 1) day = '0' + day;

        return `${year}-${month}-${day}`;
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='lg:p-5 lg:pt-0'>
            <Helmet>
                <title>MediScan | All Tests</title>
            </Helmet>

            <SectionTitle
                heading={'Explore Our Diagnostic Tests'}
                subHeading={'Discover a wide range of diagnostic tests tailored for your health needs'}
            ></SectionTitle>

            {/* Search by Date */}
            <div className='mb-4'>
                <label className='label'>
                    <span className='label-text'>Search by Date</span>
                </label>
                <input
                    type='date'
                    className='input input-bordered'
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />
                <input type='button' onClick={() => setSearchDate('')} className='btn mx-4 ' value={'clear'} />
            </div>

            <div className='grid lg:grid-cols-3 gap-10 mb-5'>
                {currentTests.map((test) => (
                    <TestCard key={test._id} test={test}></TestCard>
                ))}
            </div>

            <div className='flex justify-center space-x-2'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllTestPage;
