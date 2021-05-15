import React, {useState, useEffect} from 'react';
import Carousel from 'react-material-ui-carousel'
import axios from 'axios';
import './Homepage.css';
import {Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';

function Homepage(){

	// states for storing the carousels data
	const [men, setMen] = useState([])
	const [women, setWomen] = useState([])
	const [accessories, setAccessories] = useState([])

	//fetching the data from the server
	useEffect(()=>{
		
		axios.get(`http://localhost:REDACTED/items?category=men`)//perform the get request, gathering all the database values
		.then((response) => {
			let data = response.data;
			setMen(data);//binding the database data to the men state
		})
			
		.catch((err) => console.log(err))

		axios.get(`http://localhost:REDACTED/items?category=women`)//perform the get request, gathering all the database values
		.then((response) => {
			let data = response.data;
			setWomen(data);//binding the database data to the women state
		})
			
		.catch((err) => console.log(err))

		axios.get(`http://localhost:REDACTED/items?category=accessories`)//perform the get request, gathering all the database values
		.then((response) => {
			let data = response.data;
			setAccessories(data);//binding the database data to the accessories state
		})
			
		.catch((err) => console.log(err))
		
	},[])

	function Slides(type){//function that creates a carousel for each state received using props
		function renderItems(type){
			//mapping the state and returning the images
			return type.map(item =>
			<img id="card-image" src={`http://localhost:REDACTED/${item.item_id}.jpg`} alt="carousel-image" />
		)}; 
		return (
		
			// carousel component from @material-ui with attributes
		<Carousel     
			navButtonsAlwaysVisible = "true"
			navButtonsProps={{
				style: {
					backgroundColor: 'aqua',
					borderRadius: 0
				},
			}}
			indicatorIconButtonProps={{
				style: {
					padding: '10px',
					color: 'aqua'  
				}
			}}
			activeIndicatorIconButtonProps={{
				style: {
					color: "white",
					backgroundColor: 'aqua'
				}
			}} className="carousel">
			
			{/* call to the mapping function */}
			{renderItems(type)}
			</Carousel>

		)
	};

	return(
	<div>
		<h1>Welcome to The Iconic Drip online shopping site!</h1>
		<br/>
		{/* @material-ui component used for layout */}
		<Grid
  			container
  			direction="row"
  			justify="space-evenly"
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
	)
}

export default Homepage;