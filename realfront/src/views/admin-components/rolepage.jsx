    import React, { useEffect, useState } from 'react';
    import { Container } from 'react-bootstrap';
    import Role from './sections/role';
    import AdminHeader from '../../components/core/adminheader';
    import Footer from '../../components/core/footer';
    import axios from 'axios';
    import { useParams } from 'react-router-dom';

    const RolePage = () => {

        
        const { id, role, status } = useParams();

        

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
        const [ modal, setModal ] = useState([]);

        // 삭제 성공 실패 여부 함수
        const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
        const [showDeleteFailModal, setShowDeleteFailModal] = useState(false);
        // 수정 성공 실패 여부 함수
        const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
        const [showEditFailModal, setShowEditFailModal] = useState(false);
        // 유저 추가 성공 실패 여부 함수
        const [showAddSuccessModal, setShowAddSuccessModal] = useState(false);
        const [showAddFailModal, setShowAddFailModal] = useState(false);

        // 수정사항을 저장하는 변수
        const [editUser, setEditUser] = useState({
            staffName: '',
            staffRole: '',
            staffId: '',
            staffPw: ''
        });
        // 수정할 유저 id
        const [editId, setEditId] = useState([]);


        // 유저 추가 변수
        const [addUser, setAddUser] = useState({
            staffRole: 'Attending Physicians',
            staffPw: ''
        });



        
        


        // user 리스트
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

        // user 수정
        const handleEdit = () => {
            console.log('staffId : ',editUser.staffId)
            axios
            .put(`http://localhost:8080/api/role/edit/${editId}`, editUser)
            .then(response => {
                setShowEditSuccessModal(true);
                    // 데이터 갱신을 위해 사용자 목록 재호출
                    axios.get(`http://localhost:8080/api/staff`).then(response => {
                        const formattedData = response.data.map(item => ({
                            ...item,
                            activityDate: extraDateAndTime(item.activityDate)
                        }));
                        setUsers(formattedData);
                    }).catch(error => console.error('Error fetching data: ', error));
            })
            .catch((error) => {
                setShowEditFailModal(true);
                console.error('Error fetching search data : ',error);
            });
        };

        // user 권한해제
        const handleDelete = async (id) => {
            try {
            const deleteResponse = await axios.delete(`http://localhost:8080/api/role/unusable/${id}`);
            
            if (deleteResponse.status === 200) {
                setShowDeleteSuccessModal(true);
                
                // 데이터 갱신을 위해 사용자 목록 재호출
                const getResponse = await axios.get(`http://localhost:8080/api/staff`);
                
                const formattedData = getResponse.data.map(item => ({
                ...item,
                activityDate: extraDateAndTime(item.activityDate)
                }));
                
                setUsers(formattedData);
            } else {
                throw new Error('Failed to restore user');
            }
            } catch (error) {
            setShowDeleteFailModal(true);
            console.error('Error restoring user: ', error);
            }
        };

        // user 권한부여
        const handleRestore = async (id) => {
            try {
            const deleteResponse = await axios.delete(`http://localhost:8080/api/role/restore/${id}`);
            
            if (deleteResponse.status === 200) {
                setShowEditSuccessModal(true);
                
                // 데이터 갱신을 위해 사용자 목록 재호출
                const getResponse = await axios.get(`http://localhost:8080/api/staff`);
                
                const formattedData = getResponse.data.map(item => ({
                ...item,
                activityDate: extraDateAndTime(item.activityDate)
                }));
                
                setUsers(formattedData);
            } else {
                throw new Error('Failed to delete user');
            }
            } catch (error) {
            setShowEditFailModal(true);
            console.error('Error deleting user: ', error);
            }
        };

        // user 추가
        const handleAddUser = async () => {
            console.log("staffRole값은?? : ", addUser.staffRole)
            axios
            .post(`http://localhost:8080/api/role/add`, addUser)
            .then(response => {
                setShowAddSuccessModal(true);
                    // 데이터 갱신을 위해 사용자 목록 재호출
                    axios.get(`http://localhost:8080/api/staff`).then(response => {
                        const formattedData = response.data.map(item => ({
                            ...item,
                            activityDate: extraDateAndTime(item.activityDate)
                        }));
                        setUsers(formattedData);
                    }).catch(error => console.error('Error fetching data: ', error));
            })
            .catch((error) => {
                setShowAddFailModal(true);
                console.error('Error fetching data : ', error);
            });

        }

        // search
        useEffect(() => {
            
            axios
            .get(`http://localhost:8080/api/role/search/${id}/${role}/${status}`)
            .then(response => {
                const formattedData = response.data.map(item => ({
                    ...item,
                    activityDate: extraDateAndTime(item.activityDate)
                }));
                setUsers(formattedData);
            })
            .catch(error => {
                console.error('Error fetching search data : ', error);
            });
        }, [id, role, status])
        



        return (
            <div>
                <AdminHeader />
                <Container className='adminBody'>
                    <Role users = { users } showDeleteSuccessModal={showDeleteSuccessModal} setShowDeleteSuccessModal={setShowDeleteSuccessModal}
                    showDeleteFailModal={showDeleteFailModal} setShowDeleteFailModal={setShowDeleteFailModal}
                    handleDelete={handleDelete}
                    showEditSuccessModal = {showEditSuccessModal} setShowEditSuccessModal={setShowEditSuccessModal}
                    showEditFailModal={showEditFailModal} setShowEditFailModal={setShowEditFailModal} handleEdit = {handleEdit} setEditUser={setEditUser}
                    setEditId={setEditId} setAddUser={setAddUser} handleAddUser={handleAddUser} showAddSuccessModal={showAddSuccessModal} 
                    setShowAddSuccessModal={setShowAddSuccessModal} showAddFailModal={showAddFailModal} setShowAddFailModal={setShowAddFailModal} 
                    addUser={addUser} setModal={setModal} modal={modal} handleRestore={handleRestore} />
                </Container>
                <Footer/>
            </div>
        );
    };
    export default RolePage;