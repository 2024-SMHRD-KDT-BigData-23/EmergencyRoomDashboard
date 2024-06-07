import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../components/core/header";
import Dropdown from "../components/core/dropdown";
import MainTable from "../components/core/maintable";
import "../assets/scss/maintable.scss";
import "../assets/scss/style.scss";
import axios from "axios";
import SearchForm from "../components/core/searchForm";
import NCount from "../components/core/ncdsscount";

const List = () => {

    // Timestamp 형식의 데이터를 "년/월/일/시/분/초"로 쪼개주는 함수
    const extraDateAndTime = (timestamp) => {
      const date = new Date(timestamp);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();

      return {
          year,
          month,
          day,
          hour,
          minute,
          second
      };
  }

  const [patients, setPatients] = useState([]);
  const [sectionContent, setSectionContent] = useState("All");
  const [ncdssContent, setNcdssContent] = useState("All");
  const [searchNameId, setSearchNameId] = useState("null");
  const resultWard = 'now'

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/ER/medical-patients/${sectionContent}/${ncdssContent}/${searchNameId}/${resultWard}`)
      .then((response) => {
        const formattedData = response.data.map(item => ({

          
          ...item,
          admissionInTime: extraDateAndTime(item.admissionInTime),
          admissionOutTime: extraDateAndTime(item.admissionOutTime),
          patientVitalCreatedAt: extraDateAndTime(item.patientVitalCreatedAt)
      }));
      console.log("서버에서 가져온 데이터 ", formattedData);
      setPatients(formattedData);
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
        <div className="d-flex ">
        <NCount />
        <SearchForm setSearchNameId={ setSearchNameId } />
        </div>
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
