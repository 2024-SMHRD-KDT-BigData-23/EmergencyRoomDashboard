import React from "react";
import PropTypes from "prop-types";



import CurrentPage from "./sections/maincomponent.jsx";



const List = () => {
    return (
        <div id="main-wrapper">
           
            <div className="page-wrapper">
                <div className="container-fluid">
                 
                   <CurrentPage />
                   
                </div>
            </div>
        
        </div>
    );
}

List.propTypes = {
    classes: PropTypes.object
};

export default List;