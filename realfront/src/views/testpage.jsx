import React from "react";
import PropTypes from "prop-types";
import '../assets/scss/maintable.scss'; 
import AdminHeader from "../components/core/adminheader";



const Test = () => {
    return (
        <div>
        <header>
            <AdminHeader />
        </header>
        <div className="d-flex justify-content-between dropSearch">
        </div>
        <main className="mainTableCom">
        </main>
        </div>
    );  
}

Test.propTypes = {
    classes: PropTypes.object
};

export default Test;