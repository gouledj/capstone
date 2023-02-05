import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './SearchBar.css';
import Box from '@mui/material/Box';


//Search bar functionality will handle search but also items that come up below, don't make another component for it.
function SearchBar() {
  console.log("test")
  return (
    <div className="search-bar">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: '1000px', backgroundColor: '#ECEBF1', borderRadius: '3rem' }}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />


    </div>
  )
}

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
]

export default SearchBar