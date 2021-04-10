import React from 'react';
import {Form, Button, ButtonGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "./Signup.css";

function SignUp(){

    return (
	<div>
		<h1>Sign Up:</h1>
		<Form className="signup-form">

  			<Form.Group controlId="formBasicEmail">
    			<Form.Label>Email address</Form.Label>
    			<Form.Control id="form-input" type="email" placeholder="Enter email" />
    			<Form.Text className="text-muted">
    			We'll never share your email with anyone else.
    			</Form.Text>
  			</Form.Group>

  			<Form.Group controlId="formBasicPassword">
    			<Form.Label>Password</Form.Label>
    			<Form.Control id="form-input" type="password" placeholder="Password" />
  			</Form.Group>

  			<Form.Group controlId="formBasicPassword">
    			<Form.Label>Re-enter Password</Form.Label>
    			<Form.Control id="form-input" type="password" placeholder="Password" />
  			</Form.Group>

  			<Form.Group controlId="formBasicCheckbox">
    			<Form.Check type="checkbox" label="Subscribe to newsletter" />
				<Form.Check type="checkbox" label="Remember me" />
				<Form.Text>By creating an account you agree to our Terms & Privacy</Form.Text>
  			</Form.Group>

  	<ButtonGroup>
  		<Button id="search-button" type="submit">Clear details</Button>
		<Button id="search-button" type="submit">Sign Up</Button>
  	</ButtonGroup>

	<Form.Text>Already have an account?</Form.Text>
	<Button id="search-button" as={Link} to="/login">Log in</Button>
</Form></div>

      );
    }

export default SignUp;
