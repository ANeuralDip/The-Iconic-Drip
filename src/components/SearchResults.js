import React from 'react';
import List from './List';

function SearchResults(props){


    return (
        <>
            <h1>Displaying results for "{props.search}":</h1>
                <List path={`search/${props.search}`}/>
        </>
    )
}

export default SearchResults;