import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ItemCard from './NewSingle';
import { CardDeck, DropdownButton, Dropdown, Button} from 'react-bootstrap/';
import './List.css';
import Filter from './Filter';
//create the List component
function List(props){

	const [value, setValue] = useState(0);
		

		//create the item state, which strores all of the item's attributes gathered from the database
		const [item, setitem] = React.useState([])

		//the effect runs at the initial rendering
			useEffect(()=>{
				console.log('component mounted!')

				axios.get(`http://localhost:REDACTED/${props.path}`)//perform the get request, gathering all the database values
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
		
		function renderItems(){//function that creates an item card for each item in the database
				return item.map(item =>
								<ItemCard key={item.itemId} item={item} />
				);
		};

		function SortButton(){

			const sort_by=(field, reverse, primer) => {

				const key = primer ?
					function(x) {
						return primer(x[field])
					} :
					function(x) {
						return x[field]
					};
			
				reverse = !reverse ? 1 : -1;
			
				return function(a, b) {
					return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
				}
			}
			
		return(
			<div>
			<DropdownButton id="sort-button" title="Sort by:">
				<Dropdown.Item id="sort-option" onClick={() => {setValue(value+1); item.sort(sort_by('name', false, (a) =>  a.toUpperCase())) }}>Alphabetically</Dropdown.Item>
				<Dropdown.Item id="sort-option" onClick={() => {setValue(value+1); item.sort(sort_by('name', true, (a) =>  a.toUpperCase())) }}>Reverse alphabetically</Dropdown.Item>
				<Dropdown.Item id="sort-option" onClick={() => {setValue(value+1); item.sort(sort_by('price', false, parseFloat())) }}>Price ascending</Dropdown.Item>
				<Dropdown.Item id="sort-option" onClick={() => {setValue(value+1); item.sort(sort_by('price', true, parseFloat())) }}>Price descending</Dropdown.Item>
			</DropdownButton>
			</div>
		)
}

		return(
			<>
				<div style={{display: 'flex'}}>
				<SortButton />
				<Filter />
				
				</div>	
					<>{/* creating a list of the previous item cards */}
						<CardDeck>{renderItems()}</CardDeck>
					</>
			</>
		);

}

export default List;