import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Table, Button } from 'react-bootstrap';
import {Select, MenuItem}  from '@mui/material';
import './Cart.css';
import {Snackbar} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import {useAuth0} from '@auth0/auth0-react';

function Cart(){
    const { user } = useAuth0();


	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const [open, setOpen] = React.useState(false);//state for showing the Alert/Snackbar component

const handleClose = (event, reason) => {//function for closing the Alert/Snackbar
if (reason === 'clickaway') {
	return;
}

setOpen(false);
};

    const [value, setValue] = useState(0)
    const [cart, setCart] = useState([])
    let prices = cart.map(({ price }) => price)
    let quantities = cart.map(({quantity}) => quantity)

    var c = quantities.map(function(e, i) {
        return [e* prices[i]];
      });
    let total = c.reduce((a,b) => Number(a) + Number(b), 0)

    

      function handleCheckout(){
          console.log(cart)
          axios.put(`http://localhost:8080/basket/${user.email}`, cart)
      }

    function removeFromBasket(id, size, name){
		
		setOpen(true)
        console.log(value)
        setValue(value+1)
        console.log(value)
        axios.delete(`http://localhost:8080/basket/${user.email}`,{ data: {item_id: id, size: size}})

        }
        

    useEffect(()=>{
        
        axios.get(`http://localhost:8080/basket/${user.email}`)//perform the get request, gathering all the database values
        .then((response) => {
            return response.data;
        })
        .then((data) => {
            setCart(data);//binding the database data to the item state
        })
        .catch((err) => console.log(err))
        
    }, [value])

    function RenderItems(){//function that creates an item card for each item in the database
        return cart.map((item, index) =>
            <tr key={index}>
                <td>{index+1}</td>
                <td><Link to={`/items/${item.item_id}`}><p id="cart-link">{item.name}</p></Link></td>
                <td><Select id="cart-select-option" value={item.quantity} displayEmpty onChange={(e) => {
          setCart([...cart].map(object => {
            if(object.item_id === item.item_id) {
              return {
                ...object,
                quantity: (e.target.value)
              }
            }
            else return object;
          }))
        }}>
        <MenuItem value="" disabled style={{display:"none"}}>Select</MenuItem>
        <MenuItem id="cart-select-option" value={1} >1</MenuItem>
        <MenuItem id="cart-select-option" value={2} >2</MenuItem>
        <MenuItem id="cart-select-option" value={3} >3</MenuItem>
        <MenuItem id="cart-select-option" value={5} >5</MenuItem>
        <MenuItem id="cart-select-option" value={10}>10</MenuItem>
        </Select></td>
                <td>£{item.price}</td>
                <td>{item.size.toUpperCase()}</td>
                <td>£{item.price*item.quantity}</td>
                <td><Button variant="danger" onClick={() => removeFromBasket(item.item_id, item.size, item.name)}>Delete</Button></td>
            </tr>
        );
    };

    return(
        <div>
            <h1>Your shopping basket:</h1>
                <Table hover className="cart-table" size="xl">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Size</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            <RenderItems/>
                            
                    
                <tr>
                    
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total: £{total}</td>
                    <td></td>
                </tr></tbody>
                </Table>
                <Link to="/checkout" target="_blank"><Button onClick={() => handleCheckout()}>Proceed to checkout</Button></Link>
				<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error">
				Item removed from cart.
			</Alert> 
	</Snackbar>
        {console.log(value)}
        </div>
    )
}

export default Cart;