import React from "react";
import PropTypes from "prop-types";
import Header from "../components/core/header";
import Dropdown from "../components/core/dropdown";



const Test = () => {
    return (
                 <div>
                   <Dropdown />
                   </div>
    );
}

Test.propTypes = {
    classes: PropTypes.object
};

export default Test;