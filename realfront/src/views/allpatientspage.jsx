import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../components/core/header";
import Dropdown from "../components/core/dropdown";
import Search from "../components/core/search";
import "../assets/scss/maintable.scss";
import axios from "axios";
import PastTable from "../components/core/pasttable.jsx";

const AllList = () => {
    const [patients, setPatients] = useState([]);
    const [sectionContent, setSectionContent] = useState("전체");
    const [ncdssContent, setNcdssContent] = useState("전체");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/ER/past-patients/${sectionContent}/${ncdssContent}`)
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
        <PastTable patients={patients} />
      </main>
    </div>
  );
};

AllList.propTypes = {
    classes: PropTypes.object
};

export default AllList;