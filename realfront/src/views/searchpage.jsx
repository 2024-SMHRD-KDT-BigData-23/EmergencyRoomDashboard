import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../components/core/header";
import Dropdown from "../components/core/dropdown";
import "../assets/scss/maintable.scss";
import axios from "axios";
import SearchForm from "../components/core/searchForm";
import SearchTable from "../components/core/searchtable";


const Search = () => {

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
        <Dropdown sectionContent={sectionContent} setSectionContent={setSectionContent} ncdssContent={ncdssContent} setNcdssContent={setNcdssContent} />
        <SearchForm />
      </div>
      <main className="mainTableCom">
        <SearchTable patients={patients} />
      </main>
    </div>
  );
}

Search.propTypes = {
  classes: PropTypes.object
};

export default Search;