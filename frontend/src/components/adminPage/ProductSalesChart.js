import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {Button, ButtonGroup, Typography} from '@mui/material';

const ProductSalesChart = () => {
  const [orders, setOrders] = useState([]);
  const [timeRange, setTimeRange] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/Orders/');
      setOrders(response.data);
    };
    fetchData();
  }, []);

  const handleClickButton = (days) => {
    setTimeRange(days);
  };

  const filterOrders = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return orders.filter((order) => new Date(order.order_time) >= date);
  };

  const chartData = filterOrders(timeRange).reduce((data, order) => {
    const date = new Date(order.order_time).toLocaleDateString();
    if (!data.labels.includes(date)) {
      data.labels.push(date);
      data.datasets[0].data.push(order.order_total);
    } else {
      const index = data.labels.indexOf(date);
      data.datasets[0].data[index] += order.order_total;
    }
    return data;
  }, { 
    labels: [], 
    datasets: [{
        label: 'Total Sales by Date',
        data: [],
        fill: false,
        borderColor: 'rgba(47, 225, 185, 0.9)',
        tension: 0.1,
        borderWidth: 5
    }]
    });

  return (
    <>
    <Typography variant="h4" style={{ color: 'white', paddingTop: 20, fontWeight: 'bold'}}>Sales Performance</Typography>
      <ButtonGroup
        
        variant="contained"
        aria-label="contained secondary button group">
            <Button sx={{ backgroundColor: "rgb(47, 225, 185)", color: 'white', marginRight: "0.5rem", fontWeight: "bold", ':hover': { backgroundColor: "rgb(47, 225, 185)" } }}  onClick={() => handleClickButton(7)}>Week</Button>
            <Button sx={{ backgroundColor: "rgb(47, 225, 185)", color: 'white', marginRight: "0.5rem", fontWeight: "bold", ':hover': { backgroundColor: "rgb(47, 225, 185)" } }}  onClick={() => handleClickButton(30)}>Month</Button>
            <Button sx={{ backgroundColor: "rgb(47, 225, 185)", color: 'white', marginRight: "0.5rem", fontWeight: "bold", ':hover': { backgroundColor: "rgb(47, 225, 185)" } }}  onClick={() => handleClickButton(90)}>Quarter</Button>
            <Button sx={{ backgroundColor: "rgb(47, 225, 185)", color: 'white', marginRight: "0.5rem", fontWeight: "bold", ':hover': { backgroundColor: "rgb(47, 225, 185)" } }}  onClick={() => handleClickButton(365)}>Year</Button>
      </ButtonGroup>
      <Line data={chartData} options={options}/>
    </>
  );
};

export default ProductSalesChart;

const options= {
    responsive: true,
    // title: { text: 'Revenue Chart', display: true , fontSize: 20, fontColor: 'white'},
    legend: {
      align: 'end',
      labels: {
          fontColor: "white",
          fontSize: 14,
      }
    },
    scales: {
      yAxes: [
        {
          gridLines: { zeroLineColor: "white" },
          ticks: {
            beginAtZero: true,
            fontColor: 'white',
            fontSize: 18,
          },scaleLabel: {
            display: true,
            labelString: 'Revenue in CAD',
            fontSize: 17,
            fontColor: 'white',
          }
        },
      ],
      xAxes: [
        {
          gridLines: { zeroLineColor: "white" },
          ticks: {
            fontColor: 'white',
            fontSize: 18,
        }, scaleLabel: {
          display: true,
          labelString: 'Date',
          fontSize: 20,
          fontColor: 'white',
          }
        }
      ]
    },
  }