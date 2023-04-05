import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import AdminNavbar from './AdminNavbar.js';


const OrdersUrl = "http://127.0.0.1:8000/api/Orders/";
const productsUrl = "http://127.0.0.1:8000/api/Products/";
const customerUrl = "http://127.0.0.1:8000/api/Customer/";

function AdminViewOrders() {
  const [OrderData, setOrderData] = useState([]);
  const [ProductData, setProductData] = useState({})


  useEffect(() => {
    fetchOrderData();
    fetchProductData();
  }, []);


  const fetchProductData = async () => {
    axios.get(productsUrl).then((response) => {
      setProductData(response.data);
      const userEmail = window.localStorage.getItem('user');

    });
  };

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(OrdersUrl);
      // Add unique id property to each row
      const ordersWithId = response.data.map(order => ({ ...order, id: order.order_id }));
      setOrderData(ordersWithId);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  console.log(ProductData)
  const columns = [
    { field: 'order_id', headerName: 'Order ID', flex: 1 },
    { field: 'customer', headerName: 'Customer', flex: 1 },
    { field: 'order_time', headerName: 'Order Time', flex: 1 },
    { field: 'order_total', headerName: 'Order Total', flex: 1 },
    { field: 'order_status', headerName: 'Order Status', flex: 1, valueGetter: () => 'Completed' },
    {
      field: 'products',
      headerName: 'Products',
      flex: 1,
      width: 500,

      renderCell: (params) => {
        const productIds = JSON.parse(params.value);
        console.log("PRODUCT IDS");
        console.log(productIds);

        // Loop over each product ID and print the product name
        const productNames = productIds.map(productId => {
          const product = ProductData.find(product => product.product_id === productId[0]);
          return <div style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-all', maxWidth: '100%' }} key={product.product_id}>{product.product_name}</div>;
        });

        console.log("PRODUCT NAMES");
        console.log(productNames);

        // You can also join the product names into a single string
        // and return it to be rendered in the cell
        return (
          <div >
            {productNames}
          </div>
        );
      }
    },
  ];



  return (

    <>

      <div className="navbar">
        <AdminNavbar />
      </div>

      <div style={{ height: '700px', width: '100%', backgroundColor: 'white', paddingBottom: '8px' }}>
        <DataGrid
          rows={OrderData}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          headerBackgroundColor="#CCCCCC"
          rowBackgroundColor="#FFFFFF"
        />
      </div>


    </>

  );
}

export default AdminViewOrders;
