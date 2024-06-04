import React from 'react';
import AdminHeader from '../../components/core/adminheader';
import Footer from '../../components/core/footer';
import Report from './sections/report';

const ReportPage = () => {
    return (
        <div>
            <AdminHeader />
            <Report/>
            <Footer/>
            

        </div>
    );
};

export default ReportPage;
