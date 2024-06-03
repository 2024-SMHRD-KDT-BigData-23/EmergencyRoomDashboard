import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const Dropdown = () => {
    /* 드롭다운 선택시 선택 표출 함수*/ 
    const [sectionContent, setSectionContent] = useState('Section');
    const [ncdssContent, setNcdssContent] = useState('NCDSS');

    const changeSectionContent = (newContent) => {
        setSectionContent(newContent);
    };

    const changeNcdssContent = (newContent) => {
        setNcdssContent(newContent);
    };

    return (
        <Row>
            {/* 첫 번째 드롭다운 */}
            <Col xs={1}>
                <div className="dropdown ourdropdown1">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {sectionContent}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={() => changeSectionContent('All')}>All</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => changeSectionContent('일반구역A')}>일반구역A</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => changeSectionContent('일반구역B')}>일반구역B</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => changeSectionContent('중증구역')}>중증구역</a></li>
                    </ul>
                </div>
            </Col>

            {/* 두 번째 드롭다운 */}
            <Col xs={1}>
                <div className="dropdown ourdropdown2">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {ncdssContent}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={() => changeNcdssContent('All')}>All</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => changeNcdssContent('HOME')}>HOME</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => changeNcdssContent('WARD')}>WARD</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => changeNcdssContent('ICU')}>ICU</a></li>
                    </ul>
                </div>
            </Col>
        </Row>
    );
}

export default Dropdown;
