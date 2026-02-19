import React, {useState, useEffect} from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios'
import {Col, Row, Button} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {Snackbar} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import './Item.css';
import {useAuth0} from '@auth0/auth0-react';

function Item() {
	const {user} = useAuth0()
	// useParams is a react-router-dom API that lets us retrieve data from the url
	let { item_id } = useParams();
	const [error, setError] = useState('')
	//create the item state, which strores all of the item's attributes gathered from the database
	const [item, setItem] = useState({})
	//states for storing quantity and size before sending them to the server
	const [quantity, setQuantity] = useState(1)
	const [size, setSize] = useState('xs')

	//source for the image which is found using the url parameters
	let src1 =`http://localhost:REDACTED/${item_id}.jpg`

	
	//same Alert/Snackbar components from the NewSingle.js
	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const [open, setOpen] = React.useState(false);

  	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
  	};

	function addToBasket(){//add to basket function

		item.size = size//creating a size property and assigning the size state
		item.quantity = quantity//creating a quantity property and assigning the quantitystate
		setOpen(true);//open the Alert/Snackbar components
		axios.post(`http://localhost:REDACTED/basket/${user.email}`, item)//send the item to the server
		.catch((err) => {setError(err)})
		setError('')
	};

//the effect runs at the initial rendering
		useEffect(()=>{
				
				axios.get(`http://localhost:REDACTED/items/${item_id}`)//perform the get request, gathering the database row with item_id as id
				.then((response) => {
								console.log("data:", response.data)
								let data = response.data[0];
								setItem(data)    
				})
				.catch((err) => console.log(err))
				
		}, [])


		// react-star-rating component from the documentation
		function Foo() {
				const [rating, setRating]=useState(3,5)

					// rating = 2;
					return (
						<StarRatings
							rating={rating}
							starRatedColor="aqua"
							changeRating={setRating}
							numberOfStars={5}
							name='rating'
						/>
					);
				}

		//function for determining sizes: clothes have sizes from XS to XL, shoes from 37 to 43, and accessories have a universal size
		function sizes(category, type){
			if (category == 'accessories'){
				return (
					<Button id="item-button" as="select" onChange={(e) => setSize(e.target.value)}>
						<option value="universal">Universal</option>
					</Button >
				)
			}
			else if (type == 'shoes') {
				return (
					<Button id="item-button" as="select" onChange={(e) => setSize(e.target.value)}>
						<option value={37}>37</option>
						<option value={38}>38</option>
						<option value={39}>39</option>
						<option value={40}>40</option>
						<option value={41}>41</option>
						<option value={42}>42</option>
						<option value={43}>43</option>
					</Button >
				)
			}
			else{
				return(
					<Button id="item-button" as="select" onChange={(e) => setSize(e.target.value)}>
						<option value="xs">XS</option>
						<option value="s">S</option>
						<option value="m">M</option>
						<option value="l">L</option>
						<option value="xl">XL</option>
					</Button >
				)
			}
										
		}	

		//main component's return
		return (
			<div>
				{/* using columns and rows for displating the image and other item information side by side */}
				<Row>
					<Col className="item-header">
						<h1 style={{color:"#009999"}}>{item.name}</h1>
						<img
							className="item-image"
							src={src1}
							alt="item-image"/>
				
					</Col>
					<Col style={{marginTop:"50px"}}>
						<Foo />
							<h3 className="item-description">{item.description}</h3>
							<h2 className="item-caption"style={{color:"#009999"}}>Size:</h2>
							{/* sizes function call */}
							{sizes(item.category, item.type)}
							<h2 className="item-caption">Quantity:</h2>
							{/* select button for selecting quantity */}
							<Button id="item-button" as="select" onChange={(e) => setQuantity(e.target.value)}>
								<option value={1} >1</option>
								<option value={2} >2</option>
								<option value={3} >3</option>
								<option value={5} >5</option>
								<option value={10}>10</option>
							</Button>
							<br/>
							<h2 className="item-caption">Price per item:</h2>
							<h3 className="item-price"> £{item.price}</h3>
							<h2 className="item-caption">Price total:</h2>
							<h3 className="item-price"> £{item.price * quantity}</h3>
							<Button onClick={() => addToBasket()}  id="item-button">Add to basket</Button>
							<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
								{error ? 
									<Alert onClose={handleClose} severity="error">
										{item.name} already in cart. Modify the quantity in the cart page.
									</Alert> :
									<Alert onClose={handleClose} severity="success">
										{item.name} added to cart.
									</Alert>}
	  						</Snackbar>
					</Col>
				</Row>
			</div>
		);
	}

export default Item;
