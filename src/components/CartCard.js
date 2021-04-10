import React, {useState} from 'react';
import {Button, ButtonGroup, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './CartCard.css';
//creating the item cards function
function CartCard({item}){

    
    function removeFromBasket(){

        window.alert(item.name + " removed from basket  ")
        axios.delete(`http://localhost:REDACTED/basket${item.itemId}`)
        .then( (response) => {
        // handle success
        // var resData = response.data.data;
        console.log("New single response", response.data)
    });
    }
    return(
        
    <div className="cart-card">
        {console.log(item)}
        <Card id="cart-card"  bg="light" text="dark" border="dark">
            <Link  to={`/items/${item.name}`}><Card.Img id="cart-image" src={`http://localhost:REDACTED/${item.itemId}.png`} />
            </Link>
            <Card.Body className="cart-body">
            <Card.Title as={Link} to={`/items/${item.name}`}>{item.name}</Card.Title>
                    <Card.Text className="price">£{item.price}</Card.Text>
                    
            </Card.Body>
                <Card.Text id="quantity">Number of items: </Card.Text> 
                <Button id="basket-button" as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Button>
                <br />
                <Button id="basket-button" onClick={() => removeFromBasket()}>Remove from basket</Button>
                
        </Card>   
    </div>
);
}

export default CartCard;
