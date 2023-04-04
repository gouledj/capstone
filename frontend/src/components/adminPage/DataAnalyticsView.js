import React from 'react';
import './DataAnalyticsView.css';
import SalesByProducts from './SalesByProducts.js';
import ProductSalesChart from './ProductSalesChart.js';
import PopularProductPairings from './PopularProductPairings.js';
import AdminNavbar from './AdminNavbar.js';

function DataAnalyticsView() {

    return (
        <>
            <div className='navbar'>
                <AdminNavbar/>
            </div>

            <div className='product-sales-chart'>
                <ProductSalesChart/>
            </div>

            <div className='sales-by-products'>
                <SalesByProducts/>
            </div>

            <div className='pairings'>
                <PopularProductPairings />
            </div>

        </>

        

    );

}
export default DataAnalyticsView;