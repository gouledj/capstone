import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './SalesByProducts.css';
import {Button, ButtonGroup, Typography} from '@mui/material';

function SalesByProducts() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedDays, setSelectedDays] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      const productsResult = await axios.get('http://127.0.0.1:8000/api/Products/');
      setProducts(productsResult.data); 
      const ordersResult = await axios.get('http://127.0.0.1:8000/api/Orders/');
      setOrders(ordersResult.data);
    };
    fetchData();
  }, []);

  const handleClickButton = (days) => {
    setSelectedDays(days);
  };

  const translateDaysToDate = (days) => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() - days)).toISOString();
  };

  const filterOrders = (days) => {
    const date = translateDaysToDate(days);
    return orders.filter((order) => order.order_time.substring(0,10) >= date.substring(0,10));
  };

  const filteredOrders = filterOrders(selectedDays);

  // Tally up product sales
  const productNames = {};
  const productSales = {};

  filteredOrders.forEach((order) => {
    // console.log(order.products);
      const formattedStr = order.products.replace(/[\[\]]/g, '');
      const stringArr = formattedStr.split(',');
      const intArr = stringArr.map(Number);

      for (let i=0; i<intArr.length; i+=2) {
        const productName = products.find((p) => p.product_id === intArr[i]);
        const productQuantity = intArr[i+1];

        if (productQuantity === undefined && productName === undefined)  {
          continue;
        }
        if (!productSales[productName.product_id]) {
          productNames[productName.product_id] = productName.product_name;
          productSales[productName.product_id] = 0;
        }
        productSales[productName.product_id] += productQuantity;
      }
  });


  const mydata = {
    labels: Object.values(productNames),
    datasets: [
      {
        label: 'Product Sales',
        data: Object.values(productSales),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderWidth: 4,
      },
    ],
  };


  return (
  <>
  <Typography variant="h4" style={{ color: 'white', paddingTop: 20, fontWeight: 'bold'}}>Product Sales</Typography>
  <ButtonGroup
    color="primary"
    variant="contained"
    aria-label="contained secondary button group">
    <Button onClick={() => handleClickButton(1)}>Today</Button>
    <Button onClick={() => handleClickButton(7)}>Week</Button>
    <Button onClick={() => handleClickButton(30)}>Month</Button>
    <Button onClick={() => handleClickButton(90)}>Quarter</Button>
    <Button onClick={() => handleClickButton(365)}>Year</Button>
  </ButtonGroup>
  <Bar 
  data={mydata} 
  options= {{
    responsive: true,
    legend: {
      align: 'end',
      labels: {
          fontColor: "white",
          fontSize: 18,
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            fontColor: 'white',
            fontSize: 18,
          },scaleLabel: {
            display: true,
            labelString: 'Units of Sale',
            fontSize: 17,
            fontColor: 'white',
          }
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: 'white',
            fontSize: 18,
        }, scaleLabel: {
          display: true,
          labelString: 'Product Names',
          fontSize: 20,
          fontColor: 'white',
          }
        }
      ]
    },
  }}
  />
  </>
  );
}

export default SalesByProducts;
