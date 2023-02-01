import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import React from 'react'

//Search bar functionality will handle search but also items that come up below, don't make another component for it.
function SearchBar() {
  return (
    <div className="search-bar'">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />


    </div>
  )
}

export default SearchBar