import React from 'react';
import List from './List';
import {useLocation} from 'react-router-dom';//react-router-dom function for getting data from the url

function LinkResults(){

    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }
      
    let query = useQuery();

    function getTitle(){
        let category = query.get("category")
        let type = query.get("type")
        if(type == "t-shirt"|| type == "hoodie"){
                type = type + 's'
            }
        if (category == "men" || category == "women") {
            category = category + "'s"
        }
        if (type == null){
            return (category + ':')
        }
        return (category+ ' ' + type + ':')
    }
    return (
        <>
            <h1>{getTitle()}</h1>
                {/* render search results */}
                <List/>

        </>
    )
}

export default LinkResults; 