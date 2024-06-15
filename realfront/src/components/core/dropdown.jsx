import React from 'react';
import '../../assets/scss/dropdown.scss';

const Dropdown = ({ sectionContent, setSectionContent, ncdssContent, setNcdssContent }) => {

    const changeSectionContent = (newContent) => {
        setSectionContent(newContent);
    };

    const changeNcdssContent = (newContent) => {
        setNcdssContent(newContent);
    };

    return (
        <div className='d-flex'>
            {/* 첫 번째 드롭다운 */}
                <div className="dropdown ourdropdown1">
                    <button className="btn btn-warning dropdown-toggle dropBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {sectionContent}
                    </button>
                    <ul className="dropdown-menu">
                        <li><span className="dropdown-item" onClick={() => changeSectionContent('Section')}>All</span></li>
                        <li><span className="dropdown-item" onClick={() => changeSectionContent('일반구역A')}>일반구역A</span></li>
                        <li><span className="dropdown-item" onClick={() => changeSectionContent('일반구역B')}>일반구역B</span></li>
                        <li><span className="dropdown-item" onClick={() => changeSectionContent('중증구역')}>중증구역</span></li>
                    </ul>
                </div>

            {/* 두 번째 드롭다운 */}
                <div className="dropdown ourdropdown2">
                    <button className="btn btn-warning dropdown-toggle dropBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {ncdssContent}
                    </button>
                    <ul className="dropdown-menu">
                        <li><span className="dropdown-item" onClick={() => changeNcdssContent('NCDSS')}>All</span></li>
                        <li><span className="dropdown-item" onClick={() => changeNcdssContent('Discharge')}>Discharge</span></li>
                        <li><span className="dropdown-item" onClick={() => changeNcdssContent('Ward')}>Ward</span></li>
                        <li><span className="dropdown-item" onClick={() => changeNcdssContent('ICU')}>ICU</span></li>
                    </ul>
                </div>
        </div>
    );
}

export default Dropdown;
