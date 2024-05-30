import React from "react";
import PropTypes from "prop-types";



import AllListComponent from "./sections/allpatientscomponent.jsx";



const AllList = () => {
    return (
        <div id="main-wrapper">
           
            <div className="page-wrapper">
                <div className="container-fluid">
                    
                   <AllListComponent />
                   
                </div>
            </div>
        
        </div>
    );
}

AllList.propTypes = {
    classes: PropTypes.object
};

export default AllList;