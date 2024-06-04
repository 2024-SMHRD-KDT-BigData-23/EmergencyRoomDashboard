import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';



import LoginComponent from "./sections/logincomponent.jsx";



const Login = () => {
    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate('/admin')

    };
    return (
        <div id="main-wrapper">
           
            <div className="page-wrapper">
                <div className="container-fluid">
                   <LoginComponent />
                   <Button variant="primary" onClick={handleAdminClick}>Admin 페이지로 이동</Button>
                </div>
            </div>
        
        </div>
    );
}

Login.propTypes = {
    classes: PropTypes.object
};

export default Login;