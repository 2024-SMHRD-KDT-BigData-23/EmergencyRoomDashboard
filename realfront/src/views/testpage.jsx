import React from "react";
import PropTypes from "prop-types";
import '../assets/scss/maintable.scss'; 
import DecisionDrop from "../components/core/decisionmodal ";



const Test = () => {
    return (
        <div>
            <DecisionDrop />
        </div>
    );  
}

Test.propTypes = {
    classes: PropTypes.object
};

export default Test;