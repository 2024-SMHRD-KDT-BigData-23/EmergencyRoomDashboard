import React from 'react';
import AdminHeader from '../../components/core/adminheader';
import Suveillance from './sections/suveillance';
import Footer from '../../components/core/footer';

const SuveillancePage = () => {
    return (
        <div>
            <AdminHeader />
            <Suveillance />
            <Footer/>

        </div>
    );
};

export default SuveillancePage;
