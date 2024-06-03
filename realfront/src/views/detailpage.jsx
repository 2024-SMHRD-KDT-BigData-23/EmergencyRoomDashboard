import React from "react";
import PropTypes from "prop-types";
import DetailComponent from "./sections/detailcomponent.jsx";
import Header from "../components/core/header.jsx";


const Detail = () => {
    return (

        <div>
            <Header />
            <DetailComponent />
        </div>

    );
}

Detail.propTypes = {
    classes: PropTypes.object
};

export default Detail;