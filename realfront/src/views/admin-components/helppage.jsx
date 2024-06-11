import React from 'react';
import { Container } from 'react-bootstrap';
import Help from './sections/help';
import AdminHeader from '../../components/core/adminheader';
import Footer from '../../components/core/footer';
import '../../assets/scss/adminstyle.scss'

const HelpPage = () => {
    return (
        <div>
            <AdminHeader />
            <Container className='adminBody d-flex align-items-center justify-content-center'>
                <Help />
            </Container>
            <Footer/>
        </div>
    );
};

export default HelpPage;
