import React, {useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './NewSingle.css';
import axios from 'axios';
import {Snackbar} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import {useAuth0} from '@auth0/auth0-react';
//creating the item card function
function ItemCard({item}){

	const {user} = useAuth0()
	const [error, setError] = useState('')//state for storing if the database returned an error, used in the Alert/Snackbar components
		
		// alert function that returns MuiAlert component from @material-ui, used in the Snackbar component, with attributes pased as props
		function Alert(props) {
				return <MuiAlert elevation={6} variant="filled" {...props} />;
		}

		const [open, setOpen] = React.useState(false);//state for showing the Alert/Snackbar component

	const handleClose = (event, reason) => {//function for closing the Alert/Snackbar
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
		item.quantity = 1; 

		//function for adding an item to the basket
		function addToBasket(){

				setOpen(true);//display the Alert/Snackbar component
				axios.post(`http://localhost:8080/basket/${user.email}`, item)//send the item to the server
				.catch((err) => {setError(err)})//if the server returns an error, update the error state
				setError('')//set error state to null after displaying the Alert/Snackbar component 
		
		}
		return(
		<div className="item-card">
			{/* creating a card for the item */}
				<Card id="card" bg="light" text="dark" border="dark" >
					{/* card image working as a link to the item's page */}
						<Link  to={`/items/${item.item_id}`}>
							<Card.Img id="image" src={`http://localhost:8080/${item.item_id}.jpg`} />
						</Link>
						<Card.Body id="card-body">
							{/* card title working as a link to the item's page */}
						<Card.Title as={Link} to={`/items/${item.item_id}`}>{item.name}</Card.Title>
							{/* displating item's desciption and price */}
							<Card.Text>
								{item.description} <br/>
							</Card.Text>
							<Card.Text className="price">£{item.price}</Card.Text>
						</Card.Body>
							{/* button for adding item to basket */}
								<Button id="basket-button" onClick={() => addToBasket()}>Add to basket</Button>
								{/* Alert component neste in the Snackbar component */}
								<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
									{/* ternary operator for displaying the alert type:
									if the server doesn't return an error it will display a success alert, otherwise it would display an error alert */}
									{error ? 
										<Alert onClose={handleClose} severity="error">
											{item.name} already in cart. Modify the quantity in the cart page.
										</Alert> :
										<Alert onClose={handleClose} severity="success">
											{item.name} added to cart. Chooses the size in the cart page.
										</Alert>}
								</Snackbar>
				</Card>
		</div>
);
}

export default ItemCard;
