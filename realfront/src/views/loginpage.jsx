import React from "react";
import PropTypes from "prop-types";
import '../assets/scss/style.scss'
import LoginComponent from "./sections/logincomponent.jsx";

const Login = () => {

    return (
        <div className="loginBody">
            <LoginComponent />
        </div>
    );
}

Login.propTypes = {
    classes: PropTypes.object
};

export default Login;