import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NewSingle from './NewSingle';

//create the List component
function List(){

    //create the item state, which strores all of the item's attributes gathered from the database
    const [item, setitem] = React.useState([])

    //the effect runs at the initial rendering
      useEffect(()=>{
        console.log('component mounted!')

        axios.get('http://localhost:REDACTED/items')//perform the get request, gathering all the database values
        .then((response) => {
            console.log("response:", response)
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

    return(
        <div className="row">
            <ul>{/* creating a list of the previous item cards */}
                {renderItems()}
            </ul>
        </div>
    );

}

export default List;