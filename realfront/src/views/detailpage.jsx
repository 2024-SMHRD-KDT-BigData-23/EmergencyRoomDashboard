import React from "react";
import PropTypes from "prop-types";
import DetailComponent from "./sections/detailcomponent.jsx";



const Detail = () => {
    return (
           
                <div>
                   <DetailComponent />
                </div>
        
    );
}

Detail.propTypes = {
    classes: PropTypes.object
};

export default Detail;