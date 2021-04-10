import React, {useState} from 'react';
import {
    Navbar,
    Nav, 
    NavDropdown,
} from 'react-bootstrap';

import {withRouter, NavLink, Link} from 'react-router-dom';
import './Navbar.css';
import Routes from './Routes';
import {Form, FormControl, Image, Button, Container, Dropdown} from 'react-bootstrap';
import {BsSearch} from 'react-icons/bs';
import {AiOutlineHome, AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {RiAccountCircleFill, RiArrowDropDownLine} from 'react-icons/ri';
import {FaShoppingBasket} from 'react-icons/fa';

function Navigation(props){
    
    const { location } = props;
    const [field, setField]=useState("");


    return(
        <div>

            <h1 className="title">The Iconic Drip</h1>

            <Navbar bg="dark" collapseOnSelect expand="xl">
                <Navbar.Brand><Link exact to="/"> <Image id="logo" src="/white-logo.png" alt="logo"/></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav activeKey={location.pathname} className="navigation">
                        <Nav.Link as={NavLink} exact to="/"><AiOutlineHome size={32}/></Nav.Link>
        
                        <NavDropdown renderMenuOnMount={true} drop="down" as={NavLink} to="/men" title="Men's Clothing" className="ligma">
                                <Nav.Link as={NavLink} to="/men/tops">Tops</Nav.Link>
                                    <Nav.Link>Another action</Nav.Link>
                                    <Nav.Link >Something</Nav.Link>
                                <NavDropdown.Divider />

                                <Nav.Link as={NavLink} to="/men/bottoms">Bottoms</Nav.Link>
                                    {/* <NavLink  activeClassName="selected" href="#action/3.2">Another action</NavLink>
                                    <NavLink  activeClassName="selected" href="#action/3.3">Something</NavLink> */}
                                
                            
                        </NavDropdown>

                        <NavDropdown renderMenuOnMount={true} as={NavLink} to="/women" title="Women's Clothing">
                            <Nav.Link className="dropdown-title" as={NavLink} to="/women/tops">Tops</Nav.Link>
                            <Nav.Link >Another action</Nav.Link>
                                    <Nav.Link >Something</Nav.Link>
                                    {/* <NavLink href="#action/3.2">Another action</NavLink>
                                    <NavLink href="#action/3.3">Something</NavLink> */}
                            <NavDropdown.Divider />

                            <Nav.Link className="dropdown-title" as={NavLink} to="/women/bottoms">Bottoms</Nav.Link>
                                    {/* <NavLink href="#action/3.2">Another action</NavLink>
                                    <NavLink href="#action/3.3">Something</NavLink> */}
                                
                            
                        </NavDropdown>



                        <NavDropdown renderMenuOnMount={true} as={NavLink} to="/accesories" title="Accesories" id="basic-nav-dropdown">
                                {/* <NavLink href="#action/3.2">Another action</NavLink>
                                <NavLink href="#action/3.3">Something</NavLink> */}
                        </NavDropdown>

                        
                        <Nav.Link as={NavLink} to="/deals">Deals</Nav.Link>
                                
                        
                            
                        
                        <div className="client-side">
                            <Nav.Link as={NavLink} to="/basket"><FaShoppingBasket /> Shopping basket</Nav.Link>
                            <NavDropdown id="account" title={<><RiAccountCircleFill /> Account</>}>
                                
                                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </NavDropdown>
                        </div>
                        </Nav>
                        

            
            </Navbar>
				<Container>
						<Form inline id="search-bar">   
            				<FormControl id="search-input" value={field} onChange ={e => setField(e.target.value)} type="text" placeholder="Search item" className="mr-sm-2" />
            				<Link  to={`/search/${field}`}><Button id="search-button" type="submit" variant="outline-dark"><BsSearch /></Button></Link><span/>
        				</Form>	
				</Container>
            <Routes search={field}/>
            </div>
    );
}

const NavigationWithRouter = withRouter(Navigation);
export default NavigationWithRouter;