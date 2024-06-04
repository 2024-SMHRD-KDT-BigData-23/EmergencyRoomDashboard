import React from 'react';
import { Container } from 'react-bootstrap';
import Data from './sections/data';
import AdminHeader from '../../components/core/adminheader';
import Footer from '../../components/core/footer';

const DataPage = () => {
    return (
        <div>
            <AdminHeader />
            <Container>
                <Data />
            </Container>
            <Footer/>
        </div>
    );
};

export default DataPage;
