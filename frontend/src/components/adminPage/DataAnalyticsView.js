import React from 'react';
import './DataAnalyticsView.css';
import BarChart from './BarChart.js';
import LineChart from './LineChart.js';
import MostFreqBought from './MostFreqBought.js';
import AdminNavbar from './AdminNavbar.js';

function DataAnalyticsView() {

    return (
        <>
            <div className='navbar'>
          <AdminNavbar/>
            </div>

            <div className='linechart'>
                <LineChart/>
            </div>

            <div className='barchart'>
                <BarChart/>
            </div>

            <div className='mostfreqbought'>
                <MostFreqBought />
            </div>

        </>

        

    );

}
export default DataAnalyticsView;