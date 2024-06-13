import React from 'react';
import AdminHeader from '../../components/core/adminheader';
import Footer from '../../components/core/footer';
import Report from './sections/report';
import { Container } from 'react-bootstrap';

const ReportPage = () => {
    return (
        <div>
            <AdminHeader />
            <Container className='adminBody d-flex align-items-center justify-content-center'>
            <Report/>
            </Container>
            <Footer/>
            

        </div>
    );
};

export default ReportPage;
