import React from "react";
import PropTypes from "prop-types";



import CurrentPage from "./sections/maincomponent.jsx";



const List = () => {
    return (
        <div>
                   <CurrentPage />
        </div>
        
    );
}

List.propTypes = {
    classes: PropTypes.object
};

export default List;