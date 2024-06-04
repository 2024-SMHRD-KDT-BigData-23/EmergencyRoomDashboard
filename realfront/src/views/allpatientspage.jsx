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
  const [sectionContent, setSectionContent] = useState("All");
  const [ncdssContent, setNcdssContent] = useState("All");
  const [searchNameId, setSearchNameId] = useState(null);
  const resultWard = 'past'

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/ER/medical-patients/${sectionContent}/${ncdssContent}/${searchNameId}/${resultWard}`)
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error); 
      });
  }, [sectionContent, ncdssContent, searchNameId]);

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="d-flex justify-content-between dropSearch">
        <Dropdown sectionContent={ sectionContent } setSectionContent={ setSectionContent } ncdssContent={ ncdssContent } setNcdssContent={ setNcdssContent } />
        <Search setSearchNameId={ setSearchNameId } />
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