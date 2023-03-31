import React from 'react';
import './DataAnalyticsView.css';
import BarChart from './BarChart.js';
import LineChart from './LineChart.js';
import Association from './Association.js';
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

            <div className='association'>
                <Association />
            </div>

        </>

        

    );

}
export default DataAnalyticsView;