import React from 'react';
import {

    Switch,
    Route
} from 'react-router-dom';
import Mens from './Mens';
import Womens from './Womens';
import SignUp from './SignUp';
// import Accesories from './Accesories';
// import Deals from './Deals';
import SearchResults from './SearchResults';
import Homepage from './Homepage';
import Cart from './Cart';
import Login from './Login';


function Routes(props){

    return(
        <Switch>
        <Route exact path="/">
            <Homepage />
        </Route>
        <Route path="/men/tops">
            <Mens path="items/men/tops" />
        </Route>
        <Route path="/men/bottoms">
            <Mens path="items/men/bottoms" />
        </Route>
        <Route path="/women/tops">
            <Womens path="items/women/tops" />
        </Route>
        <Route path="/women/bottoms" >
            <Womens path="items/women/bottoms" />
        </Route>
        <Route path="/signup" >
            <SignUp />
        </Route>
        <Route path="/accesories">
            {/* <Accesories /> */}
        </Route>
        <Route path="/deals">
            {/* <Deals /> */}
        </Route>
        <Route exact path={`/search/${props.search}`}>
                {/* <List path={`${props.search}`}/> */}
            <SearchResults search={props.search}/>
        </Route>
        <Route path="/basket">
            <Cart />    
        </Route>
        <Route path="/signup">
            <SignUp />    
        </Route>
        <Route path="/login">
            <Login />    
        </Route>
    </Switch>
    )   
}
export default Routes;