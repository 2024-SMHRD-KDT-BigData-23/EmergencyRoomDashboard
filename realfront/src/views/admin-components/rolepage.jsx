import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Role from './sections/role';
import AdminHeader from '../../components/core/adminheader';
import Footer from '../../components/core/footer';
import axios from 'axios';

const RolePage = () => {

    // Timestamp 형식의 데이터를 "년/월/일/시/분/초"로 쪼개주는 함수
    const extraDateAndTime = (timestamp) => {
        if (timestamp !== null) {
            const date = new Date(timestamp);

            const year = String(date.getFullYear()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            const second = String(date.getSeconds()).padStart(2, '0');

            return {
                year,
                month,
                day,
                hour,
                minute,
                second
            };
        } else {
            return timestamp;
        }
    }
    const [ users, setUsers ] = useState([]);
    const [ edit, setEdit ] = useState([]);
    const [ editUser, setEditUser ] = useState([]);
    const [deleteId, setDeleteId] = useState([]);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const [showDeleteFailModal, setShowDeleteFailModal] = useState(false);

    useEffect(() => {

        axios
        .get(`http://localhost:8080/api/staff`)
        .then(response => {
            const formattedData = response.data.map(item => ({
                ...item,
                activityDate: extraDateAndTime(item.activityDate)
            }));
            setUsers(formattedData);
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

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/role/delete/${deleteId}`)
            .then(response => {
                setShowDeleteSuccessModal(true);
            })
            .catch(error => {
                setShowDeleteFailModal(true);
                console.error('Error fetching search data : ',error);
            })
    }, {deleteId})
    



    return (
        <div>
            <AdminHeader />
            <Container>
                <Role users = { users } setEdit = {setEdit} setEditUser = {setEditUser} setDeleteId = {setDeleteId} 
                showDeleteSuccessModal={showDeleteSuccessModal} setShowDeleteSuccessModal={setShowDeleteSuccessModal}
                showDeleteFailModal={showDeleteFailModal} setShowDeleteFailModal={setShowDeleteFailModal} />
            </Container>
            <Footer/>
        </div>
    );
};

export default RolePage;
