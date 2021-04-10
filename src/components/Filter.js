import React from 'react';
import {DropdownButton} from 'react-bootstrap';

function Filter(){
    return(
        <>
            <DropdownButton menuAlign="right" title="Filter">
                <h3>Filter</h3>
                <h3>Price range:</h3>
                <h3>Brands:</h3>
                <h3>Sizes:</h3>
            </DropdownButton>
        </>
    )
}

export default Filter;
