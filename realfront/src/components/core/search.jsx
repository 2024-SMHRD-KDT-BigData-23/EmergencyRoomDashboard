import React from 'react';
import SearchImg from '../../assets/images/search.png'; // 메뉴 아이콘 이미지

const Search = ({ setSearchNameId }) => {

    const search = (event) => {
        event.preventDefault();
        setSearchNameId(event.target.search.value);
    };

    return (
            
            <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <form onSubmit={ search } className="d-flex">
                            <input name="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-secondary" type="submit">
                            <img src={SearchImg} alt="Search" style={{ width: '20px', height: '20px',  }}></img>
                            </button>
                        </form>
                    </div>
            </nav>
     );
};



export default Search;