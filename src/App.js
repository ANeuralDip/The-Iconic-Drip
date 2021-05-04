import { BrowserRouter } from 'react-router-dom';
import {Modal, Button, Form, Col, Row} from 'react-bootstrap';
import {useState} from 'react';
import { Route, Switch } from "react-router-dom";
import {Item, Navigation, Homepage, Cart, SearchResults, Profile, Lost, Mens, Womens} from './components';
import {AiOutlineGithub} from 'react-icons/ai';
import './App.css';
import ProtectedRoute from "./auth/protected-route";
import NotFound from './components/NotFound';
import RedirectToNotFound from './components/NotFound';

function App() {
	

	const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

	function PopUp(){
    	
		
      	return(
        	<Modal onEscapeKeyDown={handleClose} show={show} size="lg">
          		<Modal.Header>
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

	const DefaultRoutes = () => {
		return ( 
			<>
				<PopUp/>
        		<Navigation/>
				<div className="container flex-grow-1">
        			<Switch>
        				<Route exact path="/" component={Homepage}/>
        				<Route exact path="/men/tops">
            				<Mens path="items/men/tops" />
        				</Route>
        				<Route exact path="/men/bottoms">
            				<Mens path="items/men/bottoms" />
        				</Route>
        				<Route exact path="/women/tops">
            				<Womens path="items/women/tops" />
        				</Route>
        				<Route exact path="/women/bottoms" >
            				<Womens exact path="items/women/bottoms" />
        				</Route>
        				<Route exact path="/accesories">
            				{/* <Accesories /> */}
        				</Route>
        				<Route exact path="/deals">
            				{/* <Deals /> */}
        				</Route>
        				<Route exact path={`/search/:name`} render={() => {}}>
            				<SearchResults/>
        				</Route>
        				<Route exact path="/basket" component={Cart} />
        				<ProtectedRoute path="/profile" component={Profile} />
        				<Route exact path={`/items/:id`} children={<Item />} />
						<Route component={RedirectToNotFound} />
					</Switch>
				</div>
				<div className="footer">
			<Row>
			<Col><button className="text-button" onClick={() => handleShow()}>Subscribe to newsletter</button></Col>
			<Col><button className="text-button">Social media:</button><Row><AiOutlineGithub style={{marginLeft:"170px"}}/></Row></Col>
			<Col><button className="text-button">Terms and Conditions</button></Col>
			<Col><button className="text-button">FAQ</button></Col>
			</Row>
		</div>
			</>
		);
	}
	 

  	return (
		<>
    	<div className="App">
            <Switch>
				<Route component={Lost} path="/notfound"/>
                <Route component={DefaultRoutes}/>
            </Switch>

      </div>
		
		</>
  	);
}

export default App;
