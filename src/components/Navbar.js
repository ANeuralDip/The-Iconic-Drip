import React, {useState} from 'react';
//import components used for routing
import {useLocation, NavLink, Link, withRouter} from 'react-router-dom';
//import css
import './Navbar.css';
//importing react-bootstrap components
import {Form, FormControl, Image, Button, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
//importing icons:
import {BsSearch} from 'react-icons/bs';
import {AiOutlineHome} from 'react-icons/ai';
import {FaShoppingBasket, FaPercentage} from 'react-icons/fa';

import AuthenticationButton from './authentication-button';

function Navigation(){//component definition with props 
    
    // const location  = useLocation();//location from react-router-dom used for highlighting current page in menu
    const [field, setField]=useState("");//field variable for storing search bar query
    let location = useLocation();

    return(
        <div>

            {/* page title*/}
            <h1 className="title">The Iconic Drip</h1>

            {/* navigation bar*/}
            <Navbar bg="dark" collapseOnSelect expand="xl">
                {/*site's logo as a to home button */}
                <Navbar.Brand><Link exact to="/"> <Image id="logo" src="/white-logo.png" alt="logo"/></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav activeKey={location} className="navigation">

                        {/* dropdown menu item for male clothing*/}
                        <NavDropdown alignRight renderMenuOnMount={true} title="Men's Clothing">
                                <Nav.Link as={Link} activeClassName="is-active" to="/items?category=men&type=t-shirt">Tshirts</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link as={Link} activeClassName="is-active" to="/items?category=men&type=jeans">Jeans</Nav.Link>
                        </NavDropdown>

                        {/* dropdown menu item for female clothing*/}
                        <NavDropdown alignRight renderMenuOnMount={true} collapseOnSelect={true} title="Women's Clothing">
                            <Nav.Link as={Link} to="/items?category=women&type=hoodie">Hoodies</Nav.Link>
                            <NavDropdown.Divider />
                            <Nav.Link as={Link} to="/items?category=women&type=t-shirt">Tshirts</Nav.Link>
                            <NavDropdown.Divider />
                            <Nav.Link as={Link} to="/items?category=women&type=trousers">Trousers</Nav.Link>
                            <NavDropdown.Divider />
                            <Nav.Link as={Link} to="/items?category=women&type=shoes">Shoes</Nav.Link>
                        </NavDropdown>
                        
                        {/* dropdown menu item for unisex clothing*/}
                        <NavDropdown alignRight renderMenuOnMount={true} collapseOnSelect={true} title="Unisex Clothing">
                            <Nav.Link as={Link} to="/items?category=unisex&type=hoodie">Hoodies</Nav.Link>
                            <NavDropdown.Divider />
                            <Nav.Link as={Link} to="/items?category=unisex&type=t-shirt">Tshirts</Nav.Link>
                            <NavDropdown.Divider />
                            <Nav.Link as={Link} to="/items?category=unisex&type=shoes">Shoes</Nav.Link>
                        </NavDropdown>

                        {/* dropdown menu item for accessories */}
                        <Nav.Link as={Link} to="/items?category=accessories">Accesories</Nav.Link>

                        {/* Nav.Link for deals */}
                        <Nav.Link as={Link} to="/deals">Deals<FaPercentage /></Nav.Link>
                        
                        {/* div within navbar containing the user-related pages (account and cart) */}
                        <div className="client-side">
                            <Nav.Link as={Link} to="/basket"><FaShoppingBasket /> Cart</Nav.Link>
                        <AuthenticationButton />
                            
                        </div>
                        </Nav>
                        
            </Navbar>

            {/* search bar and button */}
				<Container fluid>
						<Form inline id="search-bar">   
            				<FormControl id="search-input" value={field} onChange ={e => setField(e.target.value)}
                             type="text" placeholder="Search item" className="mr-sm-2" />
            				{/* Search button acts as a link when pressed or form is submited */}
                            <Link  to={`/search/${field}`}><Button id="search-button" type="submit" variant="outline-dark">
                                <BsSearch /></Button>
                            </Link>
                            <span/>
        				</Form>	
				</Container>
            </div>
    );
}

const NavigationWithRouter = withRouter(Navigation)

export default NavigationWithRouter;