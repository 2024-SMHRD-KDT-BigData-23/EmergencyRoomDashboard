import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchForm = () => {

    const inputRef = useRef(null);
    const navigate = useNavigate();

    const search = (event) => {
        event.preventDefault();
        const searchValue = inputRef.current.value;
        if (searchValue.trim() === '') {
            alert("검색어를 다시 입력해주세요.");
        } else {
            navigate(`/search/List/${searchValue}`);
        }
        inputRef.current.value = '';
    };

    return (
            <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <form onSubmit={ search } className="d-flex">
                            <input name="search" ref={inputRef} className="form-control me-2" type="search" placeholder="Patient ID or Name" aria-label="Search" />
                            <button className="btn SearchBtn" type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </form>
                    </div>
            </nav>
     );
};

export default SearchForm;