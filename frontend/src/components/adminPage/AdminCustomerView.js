import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "./AdminCustomerView.css"
import AdminNavbar from './AdminNavbar.js';




function AdminCustomerView() {

  const [listOfCustomers, setlistOfCustomers] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/Customer/")
      .then((response) => {
        setlistOfCustomers(response.data);
        setLoad(true);

      })
  }, [])

  console.log(listOfCustomers)
  return (
    <div className="item-gallery-box">
      <AdminNavbar />


      <div className="search-bar">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          sx={{ width: '1240px', backgroundColor: '#ECEBF1', borderRadius: '3rem' }}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
      </div>


      <div className='customer-rows-flex'>
        {listOfCustomers.map((customer, id) => (
          <div key={id} className="customer-details-list">
            <div className="customer-firstName">{customer.firstName}</div>
            <div className="customer-lastName">{customer.lastName}</div>
            <div className="customer-phone">{customer.customerPhone}</div>
            <div className="customer-email">{customer.email}</div>
            <div className="customer-location">{customer.streetName + customer.streetNumber + customer.city + customer.province}</div>
            <div className="customer-postal-code">{customer.postal_code} </div>
          </div>
        ))}
      </div>

    </div>

  )
}

export default AdminCustomerView