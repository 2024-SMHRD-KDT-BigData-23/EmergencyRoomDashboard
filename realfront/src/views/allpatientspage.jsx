import React from "react";
import PropTypes from "prop-types";



import AllListComponent from "./sections/allpatientscomponent.jsx";



const AllList = () => {
    return (
                <div>
                   <AllListComponent />
                </div>
    );
}

AllList.propTypes = {
    classes: PropTypes.object
};

export default AllList;