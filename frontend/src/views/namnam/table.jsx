import React from "react";
import PropTypes from "prop-types";

// core components
import Header from "../../components/header/header.jsx";
import HeaderBanner2 from "../../components/banner2/banner2.jsx";
import Footer from "../../components/footer/footer.jsx";


import TableComponent from "./sections/tablecomponent.jsx";




const Table = () => {
    return(

        
            <div id="main-wrapper">
                <Header />
                <div className="page-wrapper">
                    <div className="container-fluid">
                        <HeaderBanner2 >
                     <TableComponent/>
                       </HeaderBanner2 >
                    </div>
                </div>
                <Footer />
            </div>
    )
}


Table.propTypes = {
    classes: PropTypes.object
};
export default Table;