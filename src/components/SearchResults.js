import React from 'react';
import List from './List';
import {useParams} from 'react-router-dom';//react-router-dom function for getting data from the url

function SearchResults(){

    let {name} = useParams();//get the name from the url using useParams()
    return (
        <>
            <h1>Displaying results for "{name}":</h1>
                {/* render search results */}
                <List/>

        </>
    )
}

export default SearchResults; 