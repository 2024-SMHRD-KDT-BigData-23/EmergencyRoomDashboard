import React from "react";
import PropTypes from "prop-types";



import SearchComponent from "./sections/searchcomponent.jsx";



const Search = () => {
    return (
        <div id="main-wrapper">
           
            <div className="page-wrapper">
                <div className="container-fluid">
                 
                   <SearchComponent />
                   
                </div>
            </div>
        
        </div>
    );
}

Search.propTypes = {
    classes: PropTypes.object
};

export default Search;