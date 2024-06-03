import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../components/core/header";
import Dropdown from "../components/core/dropdown";
import Search from "../components/core/search";
import MainTable from "../components/core/maintable";
import "../assets/scss/maintable.scss";
import axios from "axios";

const List = () => {

  const [patients, setPatients] = useState([]);
  const [sectionContent, setSectionContent] = useState("All");
  const [ncdssContent, setNcdssContent] = useState("All");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/ER/medical-patients/${sectionContent}/${ncdssContent}`)
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [sectionContent, ncdssContent]);

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="d-flex justify-content-between dropSearch">
        <Dropdown sectionContent={ sectionContent } setSectionContent={ setSectionContent } ncdssContent={ ncdssContent } setNcdssContent={ setNcdssContent } />
        <Search />
      </div>
      <main className="mainTableCom">
        <MainTable patients={patients} />
      </main>
    </div>
  );
};

List.propTypes = {
  classes: PropTypes.object,
};

export default List;
