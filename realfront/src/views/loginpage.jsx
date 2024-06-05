import React from "react";
import PropTypes from "prop-types";



import LoginComponent from "./sections/logincomponent.jsx";



const Login = () => {
    
    return (
        <div id="main-wrapper">
           
            <div className="page-wrapper">
                <div className="container-fluid">
                   <LoginComponent />
                  
                </div>
            </div>
        
        </div>
    );
}

Login.propTypes = {
    classes: PropTypes.object
};

export default Login;