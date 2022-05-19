import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchApiData } from '../../thunks/fetchApiData';
import PieChart from '../PieChart/PieChart';
import BarChart from '../BarChart/BarChart';


const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchApiData());
    }, [dispatch]);


    return (

        <div className='container my-3 text-center'>

            <h1 className='mb-3 text-primary'>
                Create Graphs Assignment
            </h1>

            <h2 className='mb-3 text-secondary'>
                <em>D3.js Data Driven Documents</em>
            </h2>

            <div className='d-flex justify-content-around align-items-end mt-4'>

                <PieChart />

                <BarChart />

            </div>

        </div>

    );

};


export default Home;