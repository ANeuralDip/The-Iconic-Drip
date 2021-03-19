import React from 'react';
import List from './List';

function Womens(props){

    function WomensTops() {
        return <List path="items/women/tops"/>
    }

    function WomensBottoms(){
        return <List path="items/women/bottoms"/>
    }


    return(
        <div>
            {props.path === "items/women/bottoms" && <><h1>Womens' Bottoms:</h1><WomensBottoms /></>}
            {props.path === "items/women/tops" && <><h1>Womens' Tops:</h1><WomensTops /></>}
            {props.path === "items/women" && <><h1>Womens' Clothing:</h1><WomensBottoms /><WomensTops /></>}
        </div>
    );
}

export default Womens;