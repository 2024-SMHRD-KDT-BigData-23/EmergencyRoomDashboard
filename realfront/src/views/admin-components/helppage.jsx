import React from 'react';
import { Container } from 'react-bootstrap';
import Help from './sections/help';
import AdminHeader from '../../components/core/adminheader';
import Footer from '../../components/core/footer';

const HelpPage = () => {
    return (
        <div>
            <AdminHeader />
            <Container>
                <Help />
            </Container>
            <Footer/>
        </div>
    );
};

export default HelpPage;
