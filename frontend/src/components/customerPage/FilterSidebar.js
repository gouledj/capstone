import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

export default function FilterSidebar({ onFilter }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [onSale, setOnSale] = useState(false);

  const handleFilter = () => {
    const filter = {
      minPrice: minPrice,
      maxPrice: maxPrice,
      onSale: onSale,
    };
    onFilter(filter);
  };

  return (
    <div>
      <TextField
        label="Minimum Price"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Maximum Price"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Checkbox checked={onSale} onChange={(e) => setOnSale(e.target.checked)} />
      On Sale
      <Button variant="contained" onClick={handleFilter}>
        Apply
      </Button>
    </div>
  );
}