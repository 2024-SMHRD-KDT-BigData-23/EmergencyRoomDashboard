import React from "react";
import PropTypes from "prop-types";
import Header from "../components/core/header";



const Test = () => {
    return (
                 <div>
                   <Header />
                   </div>
    );
}

Test.propTypes = {
    classes: PropTypes.object
};

export default Test;