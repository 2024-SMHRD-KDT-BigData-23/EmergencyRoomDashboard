    import React, { useState } from "react";
    import { Container, Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';
    import { useNavigate } from "react-router-dom";

    const Role = ({ users, setEdit, handleDelete , showDeleteSuccessModal, setShowDeleteSuccessModal, showDeleteFailModal, setShowDeleteFailModal,
        showEditSuccessModal, setShowEditSuccessModal, showEditFailModal, setShowEditFailModal, handleEdit, setEditUser, setEditId, setAddUser, handleAddUser,
        showAddSuccessModal, setShowAddSuccessModal, showAddFailModal, setShowAddFailModal, addUser, setModal, modal, handleRestore,

    }) => {

        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 10; // 한 페이지에 표시할 항목 수

        // 현재 페이지에 표시할 데이터를 계산합니다.
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

        // 페이지를 변경하는 함수입니다.
        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        // 총 페이지 수를 계산하고 페이지 번호를 배열에 저장합니다.
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const [showDeleteModal, setShowDeleteModal] = useState(false);
        const [showUserModal, setShowUserModal] = useState(false);
        const [selectedUser, setSelectedUser] = useState(null);
        const [showUserEditModal, setUserEditModal] = useState(false);
        const [showUserAddModal, setUserAddModal] = useState(false);

        const [showRoleModal, setShowRoleModal] = useState(false);
        const [roles, setRoles] = useState([
            { id: 1, name: 'Doctor', description: 'Responsieble for patient care' },
            { id: 2, name: 'Nurse', description: 'Assists doctors in patient care' }
        ]);
        const [newRole, setNewRole] = useState({ name: '', description: '' });

        const handleShowUserEdit = (user) => {
            setSelectedUser(user);
            setEditUser(user);
            setUserEditModal(true);  
        };

        const handleShowUserModal = (user) => {
            setSelectedUser(user);
            setShowUserModal(true);
        };

        const handleShowDeleteModal = (user, a) => {
            setSelectedUser(user);
            setShowDeleteModal(true);
            setModal(a)
        };


        // 유저 추가 모달창 관련
        const handleUserAddModal = () => {
            setUserAddModal(true);
        };

        const handleCloseUserAddModal = () => setUserAddModal(false);

        const handleUserAddChange = (e) => {
            const { name, value } = e.target;
            setAddUser(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleCloseDeleteModal = () => {
            setShowDeleteModal(false);
        };    

        //
        const handleCloseUseEditModal = () => setUserEditModal(false);
        //

        const handleCloseUserModal = () => setShowUserModal(false);

        const handleShowRoleModal = () => setShowRoleModal(true);

        const handleCloseRoleModal = () => setShowRoleModal(false);

        const handleRoleChange = (e) => {
            const { name, value } = e.target;
            setNewRole((prevRole) => ({ ...prevRole, [name]: value }));
        };

        const handleAddRole = () => {
            setRoles((prevRoles) => [...prevRoles, { ...newRole, id: prevRoles.length + 1 }]);
            setNewRole({ name: '', description: '' });
            setShowRoleModal(false);
        };


        // 수정 모달창 관련
        const [editFilter, setEditFilter] = useState({
            name: '',
            role: ''
        })
        const handleEditChange = (e) => {
            const { name, value } = e.target;
            setEditUser(prevState => ({
                ...prevState,
                [name]: value
            }));
            setSelectedUser(prevUser => ({
                ...prevUser,
                [name]: value
            }));
            
        };


        // 검색관련
        const [search, setSearch] = useState([]);

        const [filter, setFilter] = useState({
            staffId: '',
            staffRole: 'All Roles',
            staffStatus: 'All Statuses'
        });
        const handleFilterChange = (e) => {
            const { name, value } = e.target;
            setFilter({ ...filter, [name]: value });
        };

        const navigate = useNavigate();


        const handleSubmit = (e) => {
            e.preventDefault();

            let updatedFilter = { ...filter };
            if (filter.staffId === '') {
                updatedFilter = { ...filter, staffId: 'All' };
            }else{
                setFilter(filter);
            }

            navigate(`/Role/${updatedFilter.staffId}/${updatedFilter.staffRole}/${updatedFilter.staffStatus}`);

        };

    


        return (
            <Container fluid className="p-2">
                {/* 상단 섹션 */}
                <Row className="mb-3">
                <Col>
                    <h2>User Management</h2>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="search">
                                    <Form.Control type="text" name="staffId" value={filter.staffId} onChange={handleFilterChange} placeholder="Search Id..." />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="roleFilter">
                                    <Form.Select name="staffRole" value={filter.staffRole} onChange={handleFilterChange}>
                                        <option value="All Roles">All Roles</option>
                                        <option value="Attending Physician">Attending Physician</option>
                                        <option value="Resident Physician">Resident Physician</option>
                                        <option value="Fellow">Fellow</option>
                                        <option value="Emergency Medicine Specialist">Emergency Medicine Specialist</option>
                                        <option value="Consulting Physician">Consulting Physician</option>
                                        <option value="Registered Nurse">Registered Nurse</option>
                                        <option value="Emergency Room Nurse">Emergency Room Nurse</option>
                                        <option value="Nurse Practitioner">Nurse Practitioner</option>
                                        <option value="Clinical Nurse Specialist">Clinical Nurse Specialist</option>
                                        <option value="Charge Nurse">Charge Nurse</option> 
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="statusFilter">
                                    <Form.Select name="staffStatus" value={filter.staffStatus} onChange={handleFilterChange}>
                                        <option value="All Statuses">All Statuses</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button type="submit">Search</Button>
                            </Col>
                            <Col className="d-flex align-items-end justify-content-end">
                            <Button className="mx-2 btn-success" onClick={() => handleUserAddModal()} >Add user</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                </Row>

                {/* 중간 섹션 */}
                <Row className="mb-3">
                    <Col>
                        <Table bordered hover style={{textAlign:"center"}}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>ID</th>
                                    <th>Role</th>
                                    <th>Last Login</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(user => (
                                    <tr key={user.id} className={user.staffAuthority === 'unusable' ? 'unusable-row' : ''}>
                                        <td>{user.staffName}</td>
                                        <td>{user.staffId}</td>
                                        <td>{user.staffRole}</td>
                                        <td>{user?.activityDate ? `${user.activityDate.year}.${user.activityDate.month}.${user.activityDate.day} ${user.activityDate.hour}:${user.activityDate.minute}` : "N/A"}</td>
                                        <td>{user.staffStatus}</td>
                                        <td>
                                            {user.staffAuthority === 'unusable' ? (
                                                <>
                                                    <Button className="btn-sm mx-2 custom-primary" onClick={() => {handleShowDeleteModal(user); setModal("restore") }  }>Restore</Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button className="btn-sm mx-2" variant="warning" onClick={() => { handleShowUserEdit(user); setEditId(user.staffId); setModal("edit") }}>Edit</Button>
                                                    <Button className="btn-sm" variant="danger" onClick={() => {handleShowDeleteModal(user); setModal("delete") }  }>Unusable</Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <div style={{ textAlign: 'center' }}>
                            <ul className="pagination justify-content-center" >
                                {pageNumbers.map(number => (
                                    <li key={number} className="page-item">
                                        <button onClick={() => paginate(number)} className="page-link" >
                                            {number}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>

                {/* 사용자 상세 보기 모달 >DB연결필요*/}
                {selectedUser && (
                    <Modal show={showUserModal} onHide={handleCloseUserModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>User Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><strong>Name:</strong> {selectedUser.name}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Role:</strong> {selectedUser.role}</p>
                            <p><strong>Last Login:</strong> {selectedUser.lastLogin}</p>
                            <p><strong>Status:</strong> {selectedUser.status}</p>
                            <p><strong>Activity Log:</strong></p>
                            <ul>
                                <li>Logged in on 2024-06-01</li>
                                <li>Updated profile on 2024-05-25</li>
                                <li>Logged out on 2024-05-20</li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseUserModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}

                {/* staff정보 수정 모달*/}
                {selectedUser && (
                    <Modal show={showUserEditModal} onHide={handleCloseUseEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formId" style={{ marginBottom: '20px', marginTop : '20px', style : "font-weight: bold", fontSize:'18px'}}>
                                <Form.Label>User Id : {selectedUser.staffId}</Form.Label>
                            </Form.Group>
                            <Form.Group controlId="formRole" style={{ marginBottom: '20px' }}>
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    name="staffRole"
                                    value={selectedUser.staffRole}
                                    onChange={handleEditChange}
                                >
                                <option value="Attending Physician">Attending Physician</option>
                                <option value="Resident Physician">Resident Physician</option>
                                <option value="Fellow">Fellow</option>
                                <option value="Emergency Medicine Specialist">Emergency Medicine Specialist</option>
                                <option value="Consulting Physician">Consulting Physician</option>
                                <option value="Registered Nurse">Registered Nurse</option>
                                <option value="Emergency Room Nurse">Emergency Room Nurse</option>
                                <option value="Nurse Practitioner">Nurse Practitioner</option>
                                <option value="Clinical Nurse Specialist">Clinical Nurse Specialist</option>
                                <option value="Charge Nurse">Charge Nurse</option>    
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formPw" style={{ marginBottom: '20px' }}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="staffPw"
                                    placeholder="새 비밀번호를 입력하세요 (미 입력시 기존 비밀번호 유지)"
                                    onChange={handleEditChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUseEditModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {handleEdit(selectedUser.staffId); handleCloseUseEditModal();}}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                )}

                {/* staff 추가 모달*/}
                    <Modal show={showUserAddModal} onHide={handleCloseUserAddModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formName" style={{ marginBottom: '20px' }} >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="staffName"
                                    placeholder="이름을 입력하세요"
                                    onChange={handleUserAddChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formRole" style={{ marginBottom: '20px' }}>
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    name="staffRole"
                                    value={addUser.staffRole}
                                    onChange={handleUserAddChange}
                                >
                                <option value="Attending Physician">Attending Physician</option>
                                <option value="Resident Physician">Resident Physician</option>
                                <option value="Fellow">Fellow</option>
                                <option value="Emergency Medicine Specialist">Emergency Medicine Specialist</option>
                                <option value="Consulting Physician">Consulting Physician</option>
                                <option value="Registered Nurse">Registered Nurse</option>
                                <option value="Emergency Room Nurse">Emergency Room Nurse</option>
                                <option value="Nurse Practitioner">Nurse Practitioner</option>
                                <option value="Clinical Nurse Specialist">Clinical Nurse Specialist</option>
                                <option value="Charge Nurse">Charge Nurse</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formId" style={{ marginBottom: '20px' }}>
                                <Form.Label>Id</Form.Label>
                                <Form.Control
                                    type="id"
                                    name="staffId"
                                    placeholder="아이디를 입력하세요"
                                    onChange={handleUserAddChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPw" style={{ marginBottom: '20px' }}>
                                <Form.Label>password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="staffPw"
                                    placeholder="비밀번호를 입력하세요"
                                    onChange={handleUserAddChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseUserAddModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => { handleCloseUserAddModal(); handleAddUser()}}>
                            Add User
                        </Button>
                    </Modal.Footer>
                </Modal>
    






                {/* 삭제 확인 모달, 권한부여 확인모달 */}
                {selectedUser && (
                    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                        <Modal.Header closeButton>
                            {modal === 'delete' && (
                            <Modal.Title>Confirm Unusable</Modal.Title>
                            )}
                            {modal === 'restore' && (
                            <Modal.Title>Confirm Restore</Modal.Title>
                            )}

                        </Modal.Header>
                        <Modal.Body>
                            {modal === 'delete' && (
                            <p>{selectedUser.staffId}의 권한을 해제 하시겠습니까? </p>
                            )}
                            {modal === 'restore' && (
                            <p>{selectedUser.staffId}의 권한을 복구 시키겠습니까? </p>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDeleteModal} >
                                Cancel
                            </Button>
                            {modal === 'delete' && (
                            <Button variant="danger" onClick={ () => {handleDelete(selectedUser.staffId); handleCloseDeleteModal();}}>
                                Unusable
                            </Button>
                            )}
                            {modal === 'restore' && (
                            <Button variant="danger" onClick={ () => {handleRestore(selectedUser.staffId); handleCloseDeleteModal();}}>
                                Restore
                            </Button>
                            )}
                        </Modal.Footer>
                    </Modal>
                )}
                {/* 삭제 성공 모달 */}
                <Modal show={showDeleteSuccessModal} onHide={() => setShowDeleteSuccessModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Unuseable Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        권한 해제가 완료되었습니다.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteSuccessModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* 삭제 실패 모달 */}
                <Modal show={showDeleteFailModal} onHide={() => setShowDeleteFailModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Fail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        권한 해제를 실패했습니다. 다시 시도해주세요.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteFailModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/* 수정 성공 모달, 권한부여 성공 모달 */}
                <Modal show={showEditSuccessModal} onHide={() => setShowEditSuccessModal(false)}>
                    <Modal.Header closeButton>
                        {modal === 'edit' && ( 
                        <Modal.Title>Edit Success</Modal.Title>
                        )}
                        {modal === 'restore' && (
                        <Modal.Title>Restore Success</Modal.Title>
                        )}
                    </Modal.Header>
                    {modal === 'edit' && (       
                        <Modal.Body>
                        수정이 성공적으로 완료되었습니다.
                        </Modal.Body>
                    )}
                    {modal === 'restore' && (
                        <Modal.Body>
                        권한 부여가 완료되었습니다.
                        </Modal.Body>
                    )}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditSuccessModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* 수정 실패 모달, 권한부여 실패 모달 */}
                <Modal show={showEditFailModal} onHide={() => setShowEditFailModal(false)}>
                    <Modal.Header closeButton>
                        {modal === 'edit' && ( 
                        <Modal.Title>Edit Fail</Modal.Title>
                        )}
                        {modal === 'restore' && (
                        <Modal.Title>Restore Fail</Modal.Title>
                        )}
                    </Modal.Header>
                    {modal === 'edit' && (
                        <Modal.Body>
                        수정이 실패했습니다. 다시 시도해주세요.
                        </Modal.Body>
                    )}
                    {modal === 'restore' && (
                        <Modal.Body>
                        권한 부여를 실패했습니다. 다시 시도해주세요.
                        </Modal.Body>
                    )}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditFailModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/* 유저 추가 성공 모달 */}
                <Modal show={showAddSuccessModal} onHide={() => setShowAddSuccessModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        계정 생성이 완료되었습니다.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddSuccessModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* 유저 추가 실패 모달 */}
                <Modal show={showAddFailModal} onHide={() => setShowAddFailModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Fail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        계정 생성이 실패했습니다. 다시 시도해주세요.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddFailModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>









                {/* 역할 추가 모달 */}
                <Modal show={showRoleModal} onHide={handleCloseRoleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Role</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formRoleName">
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={newRole.name}
                                    onChange={handleRoleChange}
                                    placeholder="Enter role name"
                                />
                            </Form.Group>

                            <Form.Group controlId="formRoleDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={newRole.description}
                                    onChange={handleRoleChange}
                                    placeholder="Enter role description"
                                />
                            </Form.Group>

                            <Button variant="primary" onClick={handleAddRole}>
                                Add Role
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseRoleModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    };

    export default Role;
