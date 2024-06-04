import React from 'react';
import { Container } from 'react-bootstrap';
import Role from './sections/role';
import AdminHeader from '../../components/core/adminheader';
import Footer from '../../components/core/footer';

const RolePage = () => {
    return (
        <div>
            <AdminHeader />
            <Container>
                <Role />
            </Container>
            <Footer/>
        </div>
    );
};

export default RolePage;
