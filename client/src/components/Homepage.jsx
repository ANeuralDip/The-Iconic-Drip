import React, {useState, useEffect} from 'react';
import Carousel from 'react-material-ui-carousel'
import axios from 'axios';
import './Homepage.css';
import {Grid} from '@mui/material';
import {Link} from 'react-router-dom';
import {getItems} from '../apis/items';

function Homepage(){

	// states for storing the carousels data
	const [men, setMen] = useState([])
	const [women, setWomen] = useState([])
	const [accessories, setAccessories] = useState([])
    const fetchData = async () => {
                const menData = await getItems('','men');
                const womenData = await getItems('','women');
                const accessoriesData = await getItems('accessory','');

                setMen(menData);
                setWomen(womenData);
                setAccessories(accessoriesData);
            };
	//fetching the data from the server
	useEffect(()=>{
		fetchData();
	},[])

	function Slides(type){//function that creates a carousel for each state received using props
		function renderItems(type){
			//mapping the state and returning the images
			return type.map(item => (
                <img
                    key = {item.item_id}
                    className="card-image"
                    src={`http://localhost:8080/${item.item_id}.jpg`}
                    alt={item.item_name} />
            )
		)}; 
		return (
            // carousel component from @material-ui with attributes
            <Carousel     
                navButtonsAlwaysInvisible={true}
                indicators={false}
                className="carousel">
                {/* call to the mapping function */}
                {renderItems(type)}
            </Carousel>
        );
	};

	return (
        <div>
            <h1>Welcome to The Iconic Drip online shopping site!</h1>
            <br/>
            {/* @material-ui component used for layout */}
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
            
                {/* title + men carousel; with the title working as a link to the items */}
                <div className="container">
                    <Link to="/items?category=men"><h2 className="carousel-title">Our Men Collection</h2></Link>
                    {Slides(men)}
                </div>

                {/* title + women carousel; with the title working as a link to the items */}
                <div>
                    <Link to="/items?category=women"><h2 className="carousel-title">Our Women Collection</h2></Link>
                    {Slides(women)}
                </div>
            
                {/* title + accessories carousel; with the title working as a link to the items */}
                <div className="container">
                    <Link to="/items?category=accessories"><h2 className="carousel-title">Our Accessories</h2></Link>
                    {Slides(accessories)}
                </div>
            </Grid>
        </div>
    );
}

export default Homepage;