import * as React from 'react';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ShoppingCart = ({ selectedProduct }) => { // update the parameter here
  const [cart, setCart] = useState(selectedProduct);
  const [open, setOpen] = useState(false);
  console.log("SELECTEDPRODUCT EXIST?")
  console.log(selectedProduct)

  const removeFromCart = (productIndex) => {
    const newCart = cart.filter((_, index) => index !== productIndex);
    setCart(newCart);
  };

  // const total = cart.reduce((acc, product) => acc + product.price, 0);

  return (
    <>
      <IconButton sx={{ position: "absolute", top: '15px', left: '1350px' }} onClick={() => setOpen(true)} color="inherit">
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: '16px' }}>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>

          ) : (
            <ul>
              {cart && cart.map((product, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3>{product.product_name}</h3>
                  <div className="product-information">
                    <p>Price: ${product.product_price}</p>
                    <p>Total: ${product.product_price * product.price_amount}</p>

                  </div>
                  <button onClick={() => removeFromCart(index)}>Remove</button>
                </li>
              ))}
              <hr />
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* <span>Total:</span>
                <span>${total.toFixed(2)}</span> */}
              </li>
            </ul>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default ShoppingCart;
