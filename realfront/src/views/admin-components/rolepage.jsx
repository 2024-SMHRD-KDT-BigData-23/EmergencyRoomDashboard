import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Role from './sections/role';
import AdminHeader from '../../components/core/adminheader';
import Footer from '../../components/core/footer';
import axios from 'axios';

const RolePage = () => {

    const [ users, setUsers ] = useState([]);
    const [ edit, setEdit ] = useState([]);
    const [ editUser, setEditUser ] = useState([]);

    useEffect(() => {

        axios
        .get(`http://localhost:8080/api/staff`)
        .then(response => {
            setUsers(response.data)
        })
        .catch((error) => {
            console.error('Error fetching data : ', error);
        });

    }, []);

    useEffect(() => {
        console.log('staffId : ',editUser.staffId)
        axios
        .get(`http://localhost:8080/api/edit/staff/${editUser.staffId}`,{
            params:{
                staffId : edit.name,
                staffRole : edit.role
            }
        })
        .then(response => {
        })
        .catch((error) => {
            console.error('Error fetching data : ', error);
        });
    }, [edit, editUser]);
    





    return (
        <div>
            <AdminHeader />
            <Container>
                <Role users = { users } setEdit = {setEdit} setEditUser = {setEditUser} />
            </Container>
            <Footer/>
        </div>
    );
};

export default RolePage;
