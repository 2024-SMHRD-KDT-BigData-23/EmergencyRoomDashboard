import React from "react";
import PropTypes from "prop-types";
import Header from "../components/core/header";
import Dropdown from "../components/core/dropdown";
import Search from "../components/core/search";
import MainTable from "../components/core/maintable";
import '../assets/scss/maintable.scss';
import PastTable from "../components/core/pasttable";



const Test = () => {
    return (
        <div>
        <header>
            <Header />
        </header>
        <div className="d-flex justify-content-between dropSearch">
                <Dropdown />
                <Search />
        </div>
        <main className="mainTableCom">
            <PastTable />
        </main>
        </div>
    );  
}

Test.propTypes = {
    classes: PropTypes.object
};

export default Test;