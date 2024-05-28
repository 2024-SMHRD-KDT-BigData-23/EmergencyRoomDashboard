import React from 'react';
import '../../assets/scss/css.scss';
import menuWhite from '../assets/images/menuwhite.png';
import menu from '../assets/images/menu.png';

const Header = () => (
    <header className="ourheader">
      <div className="headerContainer">
        <a className="btn" data-bs-toggle="offcanvas" href="#offcanvasExample" role="img" aria-controls="offcanvasExample">
          <img src={menuWhite} className="menuimg" width="40" height="40" alt="menu"/>
        </a>
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            <img src={menu} width="40" height="40" alt="menu"/>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div className="list-group list-group-flush" width="300px">
              <a href="#" className="list-group-item list-group-item-action">Present Patient</a>
              <a href="#" className="list-group-item list-group-item-action">All Patient</a>
              <a href="#" className="list-group-item list-group-item-action">Search Patient</a>
            </div>
          </div>
        </div>
        <div className="titleSet">
          <div className="MainTitle">NCDSS</div>
          <div className="SubTitle">by NAMNAM</div>
        </div>
        <div className="hopitalUser">
          <span className="hopitalUserLable">스마트병원</span>
        </div>
      </div>
    </header>
  );
  
  export default Header;