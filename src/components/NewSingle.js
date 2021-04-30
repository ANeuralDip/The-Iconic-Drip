import React, {useState} from 'react';
import {Button, ButtonGroup, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './NewSingle.css';
import {BsFolderSymlinkFill, BsHeartFill} from 'react-icons/bs';
import axios from 'axios';
import Routes from './Routes';
//creating the item cards function
function ItemCard({item}){

    item.quantity = 1; 
    function addToBasket(){

        window.alert("Item "+ item.name + "QUANTITY: "+ item.quantity + " added to basket")
        axios.post(`http://localhost:REDACTED/basket`, item)
        .then( (response) => {
        // handle success
        // var resData = response.data.data;
        
        console.log("Item added to cart", response.data)
    });
    }
    return(
    <div className="item-card">
        {console.log(item)}
        <Card id="card" bg="light" text="dark" border="dark" >
            <Link  to={`/${item.itemId}`}><Card.Img id="image" src={`http://localhost:REDACTED/${item.itemId}.png`} />
            </Link>
            <Card.Body id="card-body">
            <Card.Title as={Link} to={`/${item.itemId}`}>{item.name}</Card.Title>
                    <Card.Text>
                    {item.description} <br/>
                    </Card.Text>
                    <Card.Text className="price">£{item.price}</Card.Text>
            </Card.Body>
                <Button id="basket-button" onClick={() => addToBasket()}>Add to basket</Button>
        </Card>
    </div>
);
}

export default ItemCard;
