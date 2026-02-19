import {Modal, Button, Form, Col, Row} from 'react-bootstrap';
import {useState} from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import {Item, LinkResults, NavigationWithRouter, Homepage, Cart, SearchResults, Profile, Lost} from './components';
import {AiOutlineGithub} from 'react-icons/ai';
import './App.css';
import RedirectToNotFound from './components/NotFound';
import CheckoutForm from './CheckoutForm';
function App() {
	

	
	//states and functions for opening and closing the 'subscribe to newsletter' component
	const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

	//the 'subscribe to newsletter' component
	function PopUp(){
    	//component based on the 'Modal' component from 'react-bootstrap' + 'Button' component and having an form-based input
		
      	return (
            <Modal
// `handleOnEscapeKeyDown` is removed by codemod.
 show={show} size="lg">
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
        );
    }

	// don't remember what this function and variable were supposed to do, but deleting them stops the routing :D

	function useQuery() {
		return new URLSearchParams(useLocation().search);
	  }
	  
	let query = useQuery();

	const DefaultRoutes = () => {
		return ( 
			<>
				{/* using the popup and navbar components */}
				<PopUp/>
        		<NavigationWithRouter/>
				<div className="container flex-grow-1">
					{/* declaring the main routes */}
        			<Routes>
        				<Route exact path="/" element={<Homepage />}/>
        				<Route exact path="/items" element={<LinkResults />}/>
        				<Route exact path={`/search/:name`} element={<SearchResults />} />
        				<Route  exact path="/basket" element={<Cart />} />
        				<Route  exact path="/profile" element={<Profile />} />
        				<Route path="/items/:item_id" element={<Item />} />
						{/* Route for non-declared url that will redirect to the "/notfound" url */}
						<Route path="*" element={<RedirectToNotFound />} />
					</Routes>
				</div>

				{/* page's footer */}
				<div className="footer">
			<Row>
			<Col><button className="text-button" onClick={() => handleShow()}>Subscribe to newsletter</button></Col>
			<Col><p className="text-button">Social media:</p><Row><a href="https://github.com/ANeuralDip/groupProject" ><AiOutlineGithub style={{marginLeft:"170px"}}/></a></Row></Col>
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
            <Routes>
    <Route path='/checkout' element={<CheckoutForm />}/>
    <Route path="/notfound" element={<Lost />} />
    <Route path="*" element={<DefaultRoutes />}/> {/* Added path="*" */}
</Routes>
      </div>
		
		</>
		
  	);
}

export default App;