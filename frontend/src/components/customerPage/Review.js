import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useLocation } from "react-router-dom";



export default function Review(props) {

  const location = useLocation();
  // const { state } = location;
  console.log("REVIEW COMPONENT")
  const { firstName, lastName, address1, city, state, state1, zip, country } = props;
  // console.log(firstName + " " + lastName + " " + address1 + " " + city + " " + state.addCartProduct + " " + zip)
  console.log(state.addCartProduct)

  const getTotalPrice = () => {
    return state.addCartProduct.reduce((total, product) => {
      return total + product.product_price * product.quantity;
    }, 0);
  };





  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {state.addCartProduct.map((product) => (
          <ListItem key={product.product_id} sx={{ py: 1, px: 0 }}>
            <ListItemText className="checkout-description" primary={product.product_name} secondary={product.product_description} sx={{ width: '350px' }} />
            <Typography variant="body2">{product.product_price + "$ x" + product.product_quantity}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {getTotalPrice() + "$"}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid style={{ display: 'flex', flexDirection:"column", justifyContent: 'center', paddingLeft:"10rem"}}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping Address
          </Typography>
          <Typography gutterBottom>{firstName + lastName}</Typography>
          <Typography gutterBottom>{address1}</Typography>
          <Typography gutterBottom>{city + country}</Typography>
          <Typography gutterBottom>{zip}</Typography>


        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>


        </Grid>
      </Grid>
    </React.Fragment >
  );
}