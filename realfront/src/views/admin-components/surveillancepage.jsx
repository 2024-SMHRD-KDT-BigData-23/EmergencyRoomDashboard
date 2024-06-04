import React from 'react';
import { Container } from 'react-bootstrap';
import AdminHeader from '../../components/core/adminheader';
import Suveillance from './sections/suveillance';
import Footer from '../../components/core/footer';

const SuveillancePage = () => {
    return (
        <div>
            <AdminHeader />
            <Container>
                <Suveillance />
            </Container>
            <Footer/>
        </div>
    );
};

export default SuveillancePage;
