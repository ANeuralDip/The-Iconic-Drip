import { BrowserRouter } from 'react-router-dom';
import NavigationWithRouter from './components/Navbar';
import {Modal, Button, Form, Col, Row} from 'react-bootstrap';
import {useState} from 'react';
// import Profile from './Profile';
// import NavBar from './auth-nav';
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';

function App() {
	

	const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

	function PopUp(){
    	
		
      	return(
        	<Modal show={show} size="lg">
          		<Modal.Header closeButton>
           			<Modal.Title  id="modal-title">Subscribe to our newsletter</Modal.Title>
          		</Modal.Header>
          	<Modal.Body  id="modal">Subscribe to our newsletter for a 15% discount on your order
            	<Form>
              	<br/>
        			<Form.Label  >Email address:</Form.Label>
                  	<Form.Control id="form-input" type="email" placeholder="Enter email" />
            	</Form>
          	</Modal.Body>
          	<Modal.Footer>
            	<Button id="search-button" onClick={handleClose}>
              		Close
            	</Button>
            	<Button id="search-button" onClick={handleClose}>
              		Subscribe
            	</Button>
          	</Modal.Footer>
        	</Modal>
      	)
    }

  	return (
    
    	<div className="App">
      		<PopUp/>
        	<BrowserRouter>
        		<NavigationWithRouter/>
      		</BrowserRouter>
		<div className="footer">
			<Row>
			<Col><button className="text-button" onClick={() => handleShow()}>Subscribe to newsletter</button></Col>
			<Col><button className="text-button">Social media:</button></Col>
			<Col><button className="text-button">Terms and Conditions</button></Col>
			<Col><button className="text-button">FAQ</button></Col>
			</Row>
		</div>
		</div>
  	);
}

export default App;
