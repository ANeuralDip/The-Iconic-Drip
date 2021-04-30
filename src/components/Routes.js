import React, {useEffect, useState} from 'react';
import {
    useParams,
    Switch,
    Route
} from 'react-router-dom';
import Mens from './Mens';
import Womens from './Womens';
import {Col, Card, Row, Button} from 'react-bootstrap';
// import Accesories from './Accesories';
// import Deals from './Deals';
import SearchResults from './SearchResults';
import Homepage from './Homepage';
import Cart from './Cart';
import Profile from './profile';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

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
        <Route path="/profile">
            <Profile/>    
        </Route>
        <Route path={`/items/:id`} children={<Child />}>
        </Route>
    </Switch>
    )   
}

function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();


//create the item state, which strores all of the item's attributes gathered from the database
const [item, setitem] = useState([])
const [quantity, setQuantity] = useState(1)
const [size, setSize] = useState('XS')
function addToBasket(){

    item.quantity=quantity
    console.log(item)
    window.alert("Item "+ item.name + " QUANTITY: "+ item.quantity + " added to basket")
    axios.post(`http://localhost:REDACTED/basket`, item)
    .then( (response) => {
    // handle success
    // var resData = response.data.data;
    
    console.log("Item added to cart", response.data)
});
}

//the effect runs at the initial rendering
    useEffect(()=>{
        console.log('component mounted!')

        axios.get(`http://localhost:REDACTED/items/${id}`)//perform the get request, gathering all the database values
        .then((response) => {
                console.log("response:", response)
                console.log("data:", response.data)
                return response.data;    
        })
        .then((data) => {
                setitem(data);//binding the database data to the item state

        })
        .catch((err) => console.log(err))
        
    },[])
    function Foo() {
        const [rating, setRating]=useState()

          // rating = 2;
          return (
            <StarRatings
              rating={rating}
              starRatedColor="yellow"
              changeRating={setRating}
              numberOfStars={5}
              name='rating'
            />
          );
        }

    return (
        <div>
            <Row>
                <Col className="item-header">
                    <h1>{item.name}</h1>
                    <Card.Img id="image" style={{marginLeft:"50px"}}src={`http://localhost:REDACTED/${id}.png`} />
                </Col>
                <Col style={{marginTop:"50px"}}>
                <Foo />
                    <h2>Description: </h2>
                    <h3>{item.description}</h3>
                    <h2>Size:</h2>
                    <Button id="search-button" as="select" onChange={(e) => setSize(e.target.value)}>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </Button >
                    <h2>Quantity:</h2>
                    <Button id="search-button" as="select" onChange={(e) => setQuantity(e.target.value)}>
                        <option value={1} >1</option>
                        <option value={2} >2</option>
                        <option value={3} >3</option>
                        <option value={5} >5</option>
                        <option value={10}>10</option>
                    </Button>
                    <br/>
                    <Button onClick={() => addToBasket()} style={{marginTop:"50px"},{fontSize:"30px"}} id="search-button">Add to basket</Button>
                    <h1>QUANTITY OF ITEMS: {quantity}</h1>
                    <h1>Size OF ITEMS: {size}</h1>
                </Col>
            </Row>
        </div>
    );
  }
export default Routes;