import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ItemCard from './NewSingle';
import { Row, Col, DropdownButton, Dropdown, Container} from 'react-bootstrap/';
import './List.css';
import Filter from './Filter';
import {useLocation, useParams} from 'react-router-dom';
import {Grid} from '@mui/material';

//create the List component
function List(){

	const [value, setValue] = useState(0);
	let location = useLocation();
	let {name} = useParams();

		//create the item state, which strores all of the item's attributes gathered from the database
		const [item, setitem] = React.useState([])

		//the effect runs at the initial rendering
			useEffect(()=>{
				//if clause for when list is used by either the search bar (the if statement) or by the navbar links (else statement)
				if (name) {
					axios.get(`http://localhost:REDACTED/search/${name}`)//perform the get request, gathering all the database values
				.then((response) => {
						return response.data;    
				})
				.then((data) => {
						setitem(data);//binding the database data to the item state

				})
				.catch((err) => console.log(err))
				} else {
				axios.get(`http://localhost:REDACTED/items${location.search}`)//perform the get request, gathering all the database values
				.then((response) => {
						return response.data;    
				})
				.then((data) => {
						setitem(data);//binding the database data to the item state

				})
				.catch((err) => console.log(err))}
				
		},[])
		
		//mapping the item object 
		function renderItems(){//function that creates an item card for each item in the database
				return item.map(item =>
								<ItemCard key={item.itemId} item={item} />
				);
		};


		//sort button component
		function SortButton(){


			//sorting function with arguemnts: field(what to sort), reverse(whether to reverse sort), and primer (preparing the items for sorting)
			const sort_by=(field, reverse, primer) => {

				const key = primer ?//conditional statement for applying the primer function
					function(x) {
						return primer(x[field])
					} :
					function(x) {
						return x[field]
					};
			
				reverse = !reverse ? 1 : -1;//conditional statement for reverse variable
				//(if reverse is true it will be -1 and if false it will be equal to 1)
			
				return function(a, b) {
					return a = key(a), b = key(b), reverse * ((a > b) - (b > a));//function for comparing field one by one and apply the reverse
				}
			}
			
		return (
            // the sort button, which is a dropdown button with different options
            <div>
                <DropdownButton id="sort-button" title="Sort by:">
                    {/* onClick function composed of the sort function and setValue, used for forcing react to re-render the list */}
                    <Dropdown.Item id="sort-option" onClick={() => {setValue(value+1); item.sort(sort_by('name', false, (a) =>  a.toUpperCase())) }}>Alphabetically</Dropdown.Item>
                    <Dropdown.Item id="sort-option" onClick={() => {setValue(value+1); item.sort(sort_by('name', true, (a) =>  a.toUpperCase())) }}>Reverse alphabetically</Dropdown.Item>
                    <Dropdown.Item id="sort-option" onClick={() => {setValue(value+1); item.sort(sort_by('price', false, parseFloat())) }}>Price ascending</Dropdown.Item>
                    <Dropdown.Item id="sort-option" onClick={() => {setValue(value+1); item.sort(sort_by('price', true, parseFloat())) }}>Price descending</Dropdown.Item>
                </DropdownButton>
            </div>
        );
}

		return (
            <>
                {/* creating a div for the Filter and Sort components */}
                <div className="buttons">
				<Filter />
				<SortButton/>
				
				
				</div>
                <div className="cards">{/* creating a list of the previous item cards */}
                    <Grid
container
direction="row"
justifyContent="space-evenly"
alignItems="center"
>{renderItems()}</Grid>
                </div>
            </>
        );

}

export default List;