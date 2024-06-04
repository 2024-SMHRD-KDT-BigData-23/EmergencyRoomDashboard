import React from 'react';
import Dashboard from './sections/dashboard';
import AdminHeader from '../../components/core/adminheader';
import Footer from '../../components/core/footer';

const AdminPage = () => {
    return (
        <div>
            <AdminHeader />
            <Dashboard />
            <Footer/>
            

        </div>
    );
};

export default AdminPage;
