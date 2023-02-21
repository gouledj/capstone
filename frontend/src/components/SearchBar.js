import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './SearchBar.css';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



//Search bar functionality will handle search but also items that come up below, don't make another component for it.
function SearchBar() {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/Products/")
      .then((response) => {
        setProducts(response.data);
        setLoad(true);

      })
  }, [])

  console.log(products)


  // {
  //   companyDetails.map((item, id) => (
  //     <ul className="company-details-list">
  //       <h1>Company Details</h1>
  //       <h1>Company Name: {item.name}</h1>
  //       <h1>Company Symbol: {item.symbol}</h1>
  //       <h1>Stock is traded on: {item.exchange}</h1>
  //       <h1>Description: {item.description}</h1>
  //     </ul>

  //   ))
  // }


  // console.log("test")
  return (

    <div className="item-gallery-box">
      <div className="search-bar">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: '1000px', backgroundColor: '#ECEBF1', borderRadius: '3rem' }}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />

      </div>

      <div className='item-flex'>
        {products.map((item, id) => (
          <div key={id} className="product-details-list">

            <div>{item.product_name}</div>
            <div> {item.product_description}</div>
          </div>

        ))}


        }
      </div>

    </div>
  )
}

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
]

export default SearchBar