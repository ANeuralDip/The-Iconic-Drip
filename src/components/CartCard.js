import React, {useState} from 'react';
import {Button, ButtonGroup, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {BsFolderSymlinkFill, BsHeartFill} from 'react-icons/bs';
import axios from 'axios';
//creating the item cards function
function CartCard({item}){

    
    function removeFromBasket(){

        axios.post(`http://localhost:REDACTED/basket`, item)
        .then( (response) => {
        // handle success
        // var resData = response.data.data;
        console.log("New single response", response.data)
    });
    }
    return(
    <div className="item-card">
        
        <Card id="card" bg="light" text="dark" border="dark" >
            <Link  to={`/items/${item.name}`}><Card.Img id="image" src={`http://localhost:REDACTED/${item.itemId}.png`} />
            </Link>
            <Card.Body className="card-body">
            <Card.Title as={Link} to={`/items/${item.name}`}>{item.name}</Card.Title>
                    <Card.Text>
                    {item.description} <br/>
                    </Card.Text>
                    <Card.Text className="price">£{item.price}</Card.Text>
            </Card.Body>
                Number of items: 
                <Button id="button" as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Button>
                <br />
                <Button id="button" onClick={() => removeFromBasket()}>Remove from basket</Button>
                
        </Card>   
    </div>
);
}

export default CartCard;
