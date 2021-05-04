import React from 'react';
import List from './List';
import {useParams} from 'react-router-dom'

function SearchResults(){

    let {name} = useParams();
    return (
        <>
            <h1>Displaying results for "{name}":</h1>
                <List path={`search/${name}`}/>
        </>
    )
}

export default SearchResults; 