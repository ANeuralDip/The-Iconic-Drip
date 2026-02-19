import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import {Form, Button, ButtonGroup, FormLabel} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Login.css';
import { FormGroup } from "@mui/material";

const Profile = () => {

	const [value, setValue] = useState(0)
	const { user } = useAuth0();
	const [customer, setCustomer] = useState({
		first_name: '',
		last_name: '',
		address: '',
		postcode: '',
		country: '',
		mobile: '',
		email: user.email
	})

	useEffect(()=>{
	axios.get(`/customers/${user.email}`)
	.then((response) => {
		return response.data;
	})
	.then((data) => {
		
		if (data[0] == null) {
			console.log(data[0])
		console.log(customer)
			return
		} 
		else {
			setCustomer(data[0])
		}
		console.log(data[0])
		console.log(customer)//binding the database data to the item state
	})
	.catch((err) => console.log(err))
},[])

	const handleChange = e => {
		const { name, value } = e.target;
		setCustomer(prevCustomer => ({
			...prevCustomer,
			[name]: value
		}));
	};

	function handleSubmit(){
		axios.post(`http://localhost:8080/customers`, customer)//send the item to the server
			.catch((err) => console.log(err))//if the server returns an error, update the error state
			setValue(value+1)
		}

		function handleUpdate(){
			axios.put(`http://localhost:8080/customers`, customer)//send the item to the server
			.catch((err) => console.log(err))
		}
		

	return (
		<div>
			<Form className="login-form" onSubmit={() => handleSubmit()}>

				<Form.Group className="formBasicField">
  					<Form.Label>First Name:</Form.Label>
  					<Form.Control
   						required
						id="form-input"
						type="text" 
						placeholder="John" 
						value={customer.first_name}
						name="first_name"
						onChange={handleChange}
						/>
				</Form.Group>

				<Form.Group id="formBasicField">
					<Form.Label>Last name:</Form.Label>
  					<Form.Control
						required
						name="last_name"
						id="form-input"
						type="text"
						placeholder="Doe"
						value={customer.last_name}
						onChange={handleChange}/>
				</Form.Group>

				<Form.Group id="formBasicField">
  					<Form.Label>Address:</Form.Label>
  					<Form.Control 
					  	required 
						id="form-input" 
						type="text" 
						placeholder="0 Nowhere Bouldevard"
						value={customer.address}
						name="address"
						onChange={handleChange} />
				</Form.Group>

				<Form.Group id="formBasicField">
  					<Form.Label>Postcode:</Form.Label>
  					<Form.Control 
					  	required  
						id="form-input" 
						type="text" 
						placeholder="X00 000" 
						value={customer.postcode}
						name="postcode"
						onChange={handleChange}/>
				</Form.Group>

				<Form.Group id="formBasicField">
  					<Form.Label>Country:</Form.Label>
  					<Form.Control 
					  	required
						id="form-input" 
						type="text" 
						placeholder="United Kingdom" 
						value={customer.country}
						name="country"
						onChange={handleChange}/>
				</Form.Group>

				<Form.Group id="formBasicField">
  					<Form.Label>Mobile:</Form.Label>
  					<Form.Control
						required	
						id="form-input"	
						type="text"	
						placeholder="07000000000" 
						value={customer.mobile}
						name="mobile"
						onChange={handleChange}/>
				</Form.Group>

				<FormGroup><FormLabel>Email: {user.email}</FormLabel></FormGroup>
		
		<Button  type="submit" >Save details</Button>
</Form>
{console.log("CUST", customer, value)}
		</div>
	);
};

export default Profile;
