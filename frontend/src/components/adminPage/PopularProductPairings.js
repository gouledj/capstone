import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { Typography } from '@mui/material';
import './ProductSalesChart.css';

function PopularProductPairings() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultProduct = await axios.get('http://127.0.0.1:8000/api/Products/');
      setProducts(resultProduct.data);
      const resultOrders = await axios.get('http://127.0.0.1:8000/api/Orders/');
      setOrders(resultOrders.data);
    };
    fetchData();
  }, []);

  const frequencies = [];
  const ordersByProd = [];

  orders.forEach(order => {
    const orderStr = JSON.parse(order.products);
    const formattedStr = order.products.replace(/[\[\]]/g, '');
    const stringArr = formattedStr.split(',');
    const intArr = stringArr.map(Number);
    const idArr = [];
    
    if (intArr.length > 3 && intArr.length %2 === 0) {
      console.log("true");
      for (let i = 0; i < intArr.length; i += 2) {
        const myProduct = products.find((p) => p.product_id === intArr[i]);
        // idStr += myProduct.product_id + ", ";
        idArr.push(myProduct.product_id);
        // productStr += myProduct.product_name + ", ";
      }
      console.log("idArr");
      console.log(idArr);
      ordersByProd.push(idArr);
      // frequencies.push(idArr);
    }
  });
  console.log("ordersByProd");
  console.log(ordersByProd);
  const freq = countListFrequency(ordersByProd);
  console.log(freq);

  for (let i in freq) {
    // console.log(freq[i]); // 3 then 2 freq
    // console.log(i); // [1,2] then [1,2,3] productID
    const l = JSON.parse(i);
    console.log("L below");
    console.log(l);
    var prodDict = {};
    var names = "";
    var ids = "";
    var total = 0;
    for (let j in l) {
      console.log(l[j]);
      const myProduct = products.find((p) => p.product_id === l[j]);
      console.log(myProduct.product_name);
      names += myProduct.product_name + ", ";
      ids += myProduct.product_id + ", ";
      total += myProduct.product_price;
    }

    ids = ids.replace(/,(?=[^,]*$)/, '');
    names = names.replace(/,(?=[^,]*$)/, '');
    prodDict["ids"] = ids;
    prodDict["names"] = names;
    prodDict["sum"] = total;
    prodDict["freq"] = freq[i];
    // console.log(prodDict);
    frequencies.push(prodDict);
    console.log("Done");
  }

  for (let i in frequencies) {
    console.log(frequencies[i]);
  }

  const columns = [
        { field: 'ids', headerName: 'Product IDs', width: 200 },
        { field: 'names', headerName: 'Product Names', width: 400},
        { field: 'sum', headerName: 'Group Price', width: 150 },
        { field: 'freq', headerName: 'Frequency', width: 150 },
      ];


  const rows = frequencies.map((row) => ({
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
      <Typography variant="h4" 
      style={{ color: 'white', paddingTop: 20, fontWeight: 'bold'}}>Popular Combos</Typography>
      <DataGrid className='datagrid'
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        sx={{
          fontSize: 18,
          '.css-rtrcn9-MuiTablePagination-root' : {
            color: 'white',
          },
          color: 'white',
          '.MuiDataGrid-columnSeparator': {
          display: 'none',
        },}}
      />
    </div>
  );
}
export default PopularProductPairings;

function countListFrequency(lists) {
  const frequency = {};

  for (let i = 0; i < lists.length; i++) {
    const list = lists[i].sort();
    const key = JSON.stringify(list);
    frequency[key] = (frequency[key] || 0) + 1;
  }
  return frequency;
}
