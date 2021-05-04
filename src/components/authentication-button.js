import React from "react";

import LoginButton from "./login-button"; 
import LogoutButton from "./logout-button";

import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./profile";
import {Nav, Link} from 'react-bootstrap';

const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <><LogoutButton /><Nav.Link to="/profile">Profile</Nav.Link></> : <LoginButton />;
};

export default AuthenticationButton;
