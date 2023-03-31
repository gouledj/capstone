import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
// import {Title} from 'chart.js';
import './BarChart.css';
import {Button, ButtonGroup, Typography} from '@mui/material';

function BarChart() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [selectedDays, setSelectedDays] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      const productsResult = await axios.get('http://127.0.0.1:8000/api/Products/');
      setProducts(productsResult.data); 
      const orderProductsResult = await axios.get('http://127.0.0.1:8000/api/OrderProduct/');
      setOrderProducts(orderProductsResult.data);
      const ordersResult = await axios.get('http://127.0.0.1:8000/api/Orders/');
      setOrders(ordersResult.data);
    };
    fetchData();
  }, []);

  // console.log("SelectedDay is");
  // console.log(selectedDays);

  const handleClickButton = (days) => {
    setSelectedDays(days);
  };

  const translateDaysToDate = (days) => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() - days)).toISOString();
    // return "2023-03-22T19:54:30.396Z";
  };

  const filterOrders = (days) => {
    const date = translateDaysToDate(days);
    // console.log("Date");
    // console.log(date);
    // return orders.filter((order) => order.order_time.substring(0,10) < date.substring(0,10));
    return orders.filter((order) => order.order_time.substring(0,10) >= date.substring(0,10));
  };

  const filteredOrders = filterOrders(selectedDays);
  // console.log("filteredOrders.len = " + filteredOrders.length);
  // console.log("orderProducts.len = " + orderProducts.length);

  // Tally up product sales
  const productNames = {};
  const productSales = {};
  filteredOrders.forEach((order) => {
    order.order_product.forEach((order_opid) => {
      // console.log("order.order_product= " + order_opid);
      const order_product = orderProducts.find((op) => op.id === order_opid);
      // console.log("order_product = " + order_product);
      const productName = products.find((p) => p.product_id === order_product.product);
      if (order_product) {
        if (!productSales[order_product.product]) {
          productSales[order_product.product] = 0;
          productNames[productName.product_id] = productName.product_name;
        }
        productSales[order_product.product] += order_product.quantity;
      }
    });
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

export default BarChart;
