import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

  const { pageStatus, patientNameId } = useParams();
  const [action, setAction] = useState(false);

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
  const [sectionContent, setSectionContent] = useState("Section");
  const [ncdssContent, setNcdssContent] = useState("NCDSS");

  const [deepNcdssCounts, setDeepNcdssCounts] = useState({
    ICU: 0,
    Discharge: 0,
    Ward: 0
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/ER/patients/${pageStatus}/${sectionContent}/${ncdssContent}/${patientNameId}`)
      .then((response) => {

        const formattedData = response.data.map(item => ({
          ...item,
          admissionInTime: extraDateAndTime(item.admissionInTime),
          admissionOutTime: extraDateAndTime(item.admissionOutTime),
          patientVitalCreatedAt: extraDateAndTime(item.patientVitalCreatedAt)
        }));

        const counts = formattedData.reduce((acc, item) => {
          if (item.deepNcdss === 'ICU') {
            acc.ICU++;
          } else if (item.deepNcdss === 'Discharge') {
            acc.Discharge++;
          } else if (item.deepNcdss === 'Ward') {
            acc.Ward++;
          }
          return acc;
        }, { ICU: 0, Discharge: 0, Ward: 0 });

        console.log("서버에서 가져온 데이터 ", formattedData);
        setPatients(formattedData);
        setDeepNcdssCounts(counts);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [pageStatus, sectionContent, ncdssContent, patientNameId, action]);

  return (
    <div>
      <header>
        <Header />
      </header>

      <div className="d-flex justify-content-between dropSearch">
        <Dropdown sectionContent={sectionContent} setSectionContent={setSectionContent} ncdssContent={ncdssContent} setNcdssContent={setNcdssContent} />
        <div className="d-flex ">
          <NCount deepNcdssCounts={deepNcdssCounts} />
          <SearchForm />
        </div>
      </div>
      <main className="mainTableCom">
        <MainTable patients={patients} setAction={setAction} />
      </main>
    </div>
  );
};

List.propTypes = {
  classes: PropTypes.object,
};

export default List;
