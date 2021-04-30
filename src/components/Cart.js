import React, { useState, useEffect, useReducer} from 'react';
import axios from 'axios';
import {Table, Button } from 'react-bootstrap';

function Cart(){

    const [cart, setCart] = useState([])
    let prices = cart.map(({ price }) => price)
    let total = prices.reduce((a,b) => a + b, 0)

    function removeFromBasket(itemId){

        window.alert(itemId + " removed from basket  ")
        axios.delete(`http://localhost:REDACTED/basket/${itemId}`)
        .then( (response) => {
        // handle success
        // var resData = response.data.data;
        console.log("New single response", response.data)
        
        
        axios.get(`http://localhost:REDACTED/basket`)//perform the get request, gathering all the database values
        .then((response) => {
            return response.data;
        })
        .then((data) => {
            setCart(data);//binding the database data to the item state
        })
        .catch((err) => console.log(err))
        });
        
    }


    useEffect(()=>{
        
        axios.get(`http://localhost:REDACTED/basket`)//perform the get request, gathering all the database values
        .then((response) => {
            return response.data;
        })
        .then((data) => {
            setCart(data);//binding the database data to the item state
        })
        .catch((err) => console.log(err))
        
    }, [])

    function RenderItems(){//function that creates an item card for each item in the database
        return cart.map(item =>
            <tr>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.price * item.quantity}</td>
                <td><Button variant="danger" onClick={() => removeFromBasket(item.itemId)}>Delete</Button></td>
            </tr>
        );
    };

    return(
        <div>
            <h1>Your shopping basket:</h1>
            <h1></h1>

                <Table hover borderless variant="dark" size="xxl">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            <RenderItems/>
                            
                    </tbody>
                <tr>
                    
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Total: {total}</th>
                </tr>
                </Table>
                <Button>Proceed to checkout</Button>
        </div>
    )
}

export default Cart;