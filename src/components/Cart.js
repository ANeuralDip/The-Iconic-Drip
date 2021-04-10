import React, { useState, useEffect} from 'react';
import axios from 'axios';
import CartCard from './CartCard';
import { CardDeck } from 'react-bootstrap';

function Cart(){


    const [cart, setCart] = useState([])
    let prices = cart.map(({ price }) => price)
    let total = prices.reduce((a,b) => a + b, 0)

    useEffect(()=>{
        
        axios.get(`http://localhost:REDACTED/basket`)//perform the get request, gathering all the database values
        .then((response) => {
            return response.data;
        })
        .then((data) => {
            setCart(data);//binding the database data to the item state
        })
        .catch((err) => console.log(err))
        
    },[])

    function renderItems(){//function that creates an item card for each item in the database
        return cart.map(item =>
            <CartCard key={item.itemId} item={item} />
        );
    };

    return(
        <div>
            {console.log('FROM CART', total)}
            <h1>Cart:</h1>
                <CardDeck >
                {renderItems()}
                </CardDeck>
                <br/>
                <h2 id="total">Total: {total}</h2>
        </div>
    )
}

export default Cart;