import React from 'react';
import List from './List';

function Mens(props){

    function MensTops() {
        return <List path="items/men/tops"/>
    }

    function MensBottoms(){
        return <List path="items/men/bottoms"/>
    }

    return(
        <div>
            {props.path === "items/men/bottoms" && <><h1>Mens' Bottoms:</h1><MensBottoms /></>}
            {props.path === "items/men/tops" && <><h1>Mens' Tops:</h1><MensTops /></>}
            {props.path === "items/men" && <><h1>Mens' Clothing:</h1><MensBottoms /><MensTops /></>}
        </div>
    )

}

export default Mens;