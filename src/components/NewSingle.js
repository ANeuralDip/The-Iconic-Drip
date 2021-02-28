import React from 'react';

//creating the item cards function
const ItemCard = ({item}) => (
    
    <div className="col s4">
        <div className="card">
            <div className="card image">
                <img src= {`http://localhost:REDACTED/${item.itemId}.png`} alt={item.name}/>{/*get the image for each item by getting the item's 
                picture  from the server using express statoc*/}
                <span className="card-title">{item.name}</span>
            </div>
        <div className="card content"></div>
            <p>{item.itemId}</p>
            <p>Colour: {item.colour}</p>
            <p>Description: {item.description}</p>
            <p>Type: {item.type}</p>
            <p>Price: {item.price}</p>
        </div>
        <br/>
    </div>
);

export default ItemCard;
