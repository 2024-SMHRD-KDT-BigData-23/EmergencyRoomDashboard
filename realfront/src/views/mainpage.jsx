import React from "react";
import PropTypes from "prop-types";
import Header from "../components/core/header";
import Dropdown from "../components/core/dropdown";
import Search from "../components/core/search";
import MainTable from "../components/core/maintable";
import { Row, Col, Container } from 'react-bootstrap';
import '../assets/scss/maintable.scss';



const List = () => {
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
            <MainTable />
        </main>
        </div>
        
    );
}

List.propTypes = {
    classes: PropTypes.object
};

export default List;