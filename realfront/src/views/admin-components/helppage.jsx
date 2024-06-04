import React from 'react';
import Help from './sections/help';
import AdminHeader from '../../components/core/adminheader';
import Footer from '../../components/core/footer';

const HelpPage = () => {
    return (
        <div>
            <AdminHeader />
            <Help />
            <Footer/>

        </div>
    );
};

export default HelpPage;
