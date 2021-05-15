import React from "react";
//import the login and logout buttons
import LoginButton from "./login-button"; 
import LogoutButton from "./logout-button";
//components for routing
import {NavLink} from 'react-router-dom';
import {Nav, NavDropdown} from 'react-bootstrap';
//auth0 used for logging in
import { useAuth0 } from "@auth0/auth0-react";

// component that will render different components if the user is logged in or not
const AuthenticationButton = () => {

	// using auth0 for logging in 
	const { isAuthenticated } = useAuth0();

	// conditional rendering: if the user isn't authenticated display the log in button, otherwise display a dropdown with the profile and log outbuttons
	return isAuthenticated ? <><NavDropdown title="Account"><Nav.Link as={NavLink} to="/profile">Profile</Nav.Link><LogoutButton /></NavDropdown></> : <LoginButton />;
};

export default AuthenticationButton;
