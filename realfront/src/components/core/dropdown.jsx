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
                    <button className="btn dropdown-toggle dropBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {sectionContent}
                    </button>
                    <ul className="dropdown-menu">
                        <li><span className="dropdown-item" onClick={() => changeSectionContent('All')}>All</span></li>
                        <li><span className="dropdown-item" onClick={() => changeSectionContent('일반구역A')}>일반구역A</span></li>
                        <li><span className="dropdown-item" onClick={() => changeSectionContent('일반구역B')}>일반구역B</span></li>
                        <li><span className="dropdown-item" onClick={() => changeSectionContent('중증구역')}>중증구역</span></li>
                    </ul>
                </div>

            {/* 두 번째 드롭다운 */}
                <div className="dropdown ourdropdown2">
                    <button className="btn dropdown-toggle dropBtn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {ncdssContent}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={() => changeNcdssContent('All')}>All</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => changeNcdssContent('HOME')}>HOME</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => changeNcdssContent('WARD')}>WARD</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => changeNcdssContent('ICU')}>ICU</a></li>
                    </ul>
                </div>
        </div>
    );
}

export default Dropdown;
