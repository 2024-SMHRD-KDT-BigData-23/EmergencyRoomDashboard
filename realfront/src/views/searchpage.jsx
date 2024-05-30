import React from "react";
import PropTypes from "prop-types";



import SearchComponent from "./sections/searchcomponent.jsx";



const Search = () => {
    return (
                 <div>
                   <SearchComponent />
                   </div>
    );
}

Search.propTypes = {
    classes: PropTypes.object
};

export default Search;