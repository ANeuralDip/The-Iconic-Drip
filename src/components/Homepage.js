import React, {useState, useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import './Homepage.css';
import {Form, Modal, Button} from 'react-bootstrap';

function Homepage(){

    const [home, setHome] = useState([])

    useEffect(()=>{
        
        axios.get(`http://localhost:REDACTED/items`)//perform the get request, gathering all the database values
        .then((response) => {
            return response.data;
        })
        .then((data) => {
            setHome(data);//binding the database data to the item state
        })
        .catch((err) => console.log(err))
        
    },[])

    function renderItems(){//function that creates an item card for each item in the database
        return home.map(item =>
            <Carousel.Item ><img id="card-image" key={item.itemId} src={`http://localhost:REDACTED/${item.itemId}.png`} alt="image" /></Carousel.Item>
        );
    };

    return(<>
        <h1>Hello</h1>
        <Carousel>
            {renderItems()}
        </Carousel>
        </>
    )
}

export default Homepage;