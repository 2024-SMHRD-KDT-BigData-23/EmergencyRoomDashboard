import React from 'react';
import { Container } from 'react-bootstrap';
import Dashboard from './sections/dashboard';
import AdminHeader from '../../components/core/adminheader';
import Footer from '../../components/core/footer';
import '../../assets/scss/adminstyle.scss'

const AdminPage = () => {
    return (
        <div>
            <AdminHeader />
            <Container className='adminBody'>
                <Dashboard />
            </Container>
            <Footer/>
        </div>
    );
};

export default AdminPage;
