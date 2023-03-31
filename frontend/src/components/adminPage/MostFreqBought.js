import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Typography } from '@mui/material';

function MostFreqBought() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:8000/api/Products/');
      setProducts(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:8000/api/Orders/');
      setOrders(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:8000/api/OrderProduct/');
      setOrderProducts(result.data);
    };
    fetchData();
  }, []);

  const prodList = products.map((product) => ({
    id: product.product_id,
    name: product.product_name,
    description: product.product_description,
    quantity: product.product_quantity,
    price: product.product_price,
    salesprice: product.product_price_sale,
    sale: product.product_price_sale,
    available: product.product_available,
    hgt: product.product_height,
    wgt: product.product_weight,
    img: product.image,
  }));

  const orderList = orders.map((order) => ({
    order_id: order.order_id,
    order_time: order.order_time,
    order_total: order.order_total,
    customer: order.customer,
    order_product: order.order_product,
  }));

  const opList = orderProducts.map((op) => ({
    op_id: op.id,
    op_product: op.product,
    op_customer: op.customer,
    op_qty: op.quantity,
    op_status: op.status,
  }));

  var nestedOfProd = [];
  var nestedOfOP = []; // list of OP lists

  for (const i in orderList) {
    if (orderList[i].order_product.length < 2) {
      continue;
    }
    nestedOfOP.push(orderList[i].order_product);
  }

  // loop through each sublist in the nested list
  for (let i = 0; i < nestedOfOP.length; i++) {
    const subList = nestedOfOP[i];
    const opToProdSubList = [];

    for (let j=0; j<subList.length; j++) {
      console.log("subList[j] " + subList[j]);
      for (let k=0; k<opList.length; k++) {
        if (opList[k].op_id === subList[j]) {
          console.log(opList[k].op_product + " === " + subList[j]);
          opToProdSubList.push(opList[k].op_product);
        }
      }

    }
    nestedOfProd.push(opToProdSubList);
  }
  
  console.log("nestedOfProd.length: " + nestedOfOP.length);
  for (const i in nestedOfProd) {
    console.log("nestedOfProd: " + nestedOfProd[i]);
  }

  var nestedArray = [];
  var freq = countListFrequency(nestedOfProd);
  
  console.log(freq);

  for (const i in freq) {
    const list = JSON.parse(i);
    console.log("list: " + list);
    var tempArr = [];
    var total = 0;
    var ids = "";
    var names = "";
    for (const j in list) { // j is 1,2 then 1,2,3
      var prodDict = {};
      for (const k in prodList) {
        
        if (list[j] === prodList[k].id) {
          console.log("id: " + list[j] + " " + prodList[k].name);
          names += prodList[k].name + ", ";
          ids += prodList[k].id + ", ";
          total +=  prodList[k].price;
        }
      }

    }
    ids = ids.replace(/,(?=[^,]*$)/, '');
    names = names.replace(/,(?=[^,]*$)/, '');
    prodDict["ids"] = ids;
    prodDict["names"] = names;
    prodDict["sum"] = total;
    prodDict["freq"] = freq[i];
    nestedArray.push(prodDict);
  }
  console.log("nestedArray Length: " + nestedArray.length);
  for (let i in nestedArray) {
    console.log(Object.values(nestedArray[i]));
  }

  const columns = [
    { field: 'ids', headerName: 'Product IDS', width: 200 },
    { field: 'names', headerName: 'Product Names', width: 300 },
    { field: 'sum', headerName: 'Combo Price', width: 150 },
    { field: 'freq', headerName: 'Frequency', width: 100 },
  ];

  const rows = nestedArray.map((row) => ({
    id: uuidv4(),
    ids: row.ids,
    names: row.names,
    sum: row.sum,
    freq: row.freq
  }));
    
  return (
    <div style={{
      boxShadow: 2,
      border: 2,
      borderColor: 'primary.light',
      '& .MuiDataGrid-cell:hover': {
        color: 'primary.main',
      },
    }}>
      <Typography variant="h4" style={{ color: 'white', paddingTop: 20, fontWeight: 'bold'}}>Most Commonly Bought Products</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        style={{color: 'white'}}
        sx={{
          fontSize: 18,
          '.MuiDataGrid-columnSeparator': {
          display: 'none',
        },}}
      />
    </div>
  );
}
export default MostFreqBought;

function countListFrequency(lists) {
  const frequency = {};

  for (let i = 0; i < lists.length; i++) {
    const list = lists[i].sort();
    const key = JSON.stringify(list);
    frequency[key] = (frequency[key] || 0) + 1;
  }
  return frequency;
}
