import React, {useState} from 'react';
//import components used for routing
import {withRouter, NavLink, Link} from 'react-router-dom';
//import css
import './Navbar.css';
//import the creacte routes
import Routes from './Routes';
//importing react-bootstrap components
import {Form, FormControl, Image, Button, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
//importing icons:
import {BsSearch} from 'react-icons/bs';
import {AiOutlineHome} from 'react-icons/ai';
import {RiAccountCircleFill} from 'react-icons/ri';
import {FaShoppingBasket} from 'react-icons/fa';
import AuthNav from './auth-nav';
import AuthenticationButton from './authentication-button';

function Navigation(props){//component definition with props 
    
    const { location } = props;//location from react-router-dom used for highlighting current page in menu
    const [field, setField]=useState("");//field variable for storing search bar query


    return(
        <div>

            {/* page title*/}
            <h1 className="title">The Iconic Drip</h1>

            {/* navigation bar*/}
            <Navbar bg="dark" collapseOnSelect expand="xl">
                {/*site's logo as a to home button */}
                <Navbar.Brand><Link exact to="/"> <Image id="logo" src="/white-logo.png" alt="logo"/></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav activeKey={location.pathname} className="navigation">{}
                        <Nav.Link as={NavLink} exact to="/"><AiOutlineHome size={32}/></Nav.Link>{/* home logo*/}

                        {/* dropdown menu item for male clothing*/}
                        <NavDropdown alignRight eventKey="link0" collapseOnSelect={true} renderMenuOnMount={true} as={NavLink} to="/men" title="Men's Clothing">
                                <Nav.Link eventKey="link1" as={NavLink} to="/men/tops">Tops</Nav.Link>
                                <NavDropdown.Divider />
                                <Nav.Link eventKey="link2" as={NavLink} to="/men/bottoms">Bottoms</Nav.Link>
                        </NavDropdown>

                        {/* dropdown menu item for female clothing*/}
                        <NavDropdown alignRight renderMenuOnMount={true} as={NavLink} to="/women" title="Women's Clothing">
                            <Nav.Link eventKey="link3"as={NavLink} to="/women/tops">Tops</Nav.Link>
                            <NavDropdown.Divider />
                            <Nav.Link eventKey="link4" as={NavLink} to="/women/bottoms">Bottoms</Nav.Link>
                        </NavDropdown>

                        {/* TBA dropdown menu item for accessories */}
                        <NavDropdown alignRight renderMenuOnMount={true} as={NavLink} to="/accesories" title="Accesories" id="basic-nav-dropdown">
                        </NavDropdown>

                        <Nav.Link as={NavLink} to="/deals">Deals</Nav.Link>
                        
                        {/* div withing navbar containing the user-related pages */}
                        <div className="client-side">
                            <Nav.Link as={NavLink} to="/basket"><FaShoppingBasket /> Shopping basket</Nav.Link>
                            {/* <NavDropdown id="account" title={<><RiAccountCircleFill /> Account</>}>
                                
                                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                                <Nav.Link as={Link} to="/login">Log in</Nav.Link>
                            </NavDropdown> */}
                        <AuthenticationButton />
                            
                        </div>
                        </Nav>
                        
            </Navbar>

            {/* search bar and button */}
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

const NavigationWithRouter = withRouter(Navigation);{/* used for getting the location prop  and the= closest <Route> match(from Routes.js) */}
export default NavigationWithRouter;