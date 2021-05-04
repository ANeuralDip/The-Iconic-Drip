import React from 'react';
import {Form, Button, ButtonGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Login.css';

function Login(){
    return(<>
        <h1>Login:</h1>
		<Form className="login-form">

  			<Form.Group className="formBasicField">
    			<Form.Label>Email address</Form.Label>
    			<Form.Control id="form-input" type="email" placeholder="Enter email" />
    			<Form.Text className="text-muted">
    			We'll never share your email with anyone else.
    			</Form.Text>
  			</Form.Group>

  			<Form.Group id="formBasicField">
    			<Form.Label>Password</Form.Label>
    			<Form.Control id="form-input" type="password" placeholder="Password" />
  			</Form.Group>

			  <ButtonGroup>
  		<Button id="search-button" type="submit">Clear details</Button>
		<Button id="search-button" type="submit">Login</Button>
  	</ButtonGroup>

	<Form.Text>Don't have an account?</Form.Text>
	<Button id="search-button" as={Link} to="/signup">Sign up></Button>
		</Form>
        </>
    )
}

export default Login;
