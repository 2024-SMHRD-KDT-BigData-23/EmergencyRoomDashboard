import React, { useState } from "react";
import { Container, Row, Col, Table, Button, Form, Modal } from 'react-bootstrap';

const Role = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Doctor', lastLogin: '2024-06-01', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Nurse', lastLogin: '2024-05-30', status: 'Inactive' }
    ]);

    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [showRoleModal, setShowRoleModal] = useState(false);
    const [roles, setRoles] = useState([
        { id: 1, name: 'Doctor', description: 'Responsible for patient care' },
        { id: 2, name: 'Nurse', description: 'Assists doctors in patient care' }
    ]);
    const [newRole, setNewRole] = useState({ name: '', description: '' });

    const handleShowUserModal = (user) => {
        setSelectedUser(user);
        setShowUserModal(true);
    };

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

    return (
        <Container fluid>
            {/* 상단 섹션 */}
            <Row className="mb-3">
                <Col>
                    <Form>
                        <Form.Group controlId="search">
                            <Form.Control type="text" placeholder="Search..." />
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Group controlId="roleFilter">
                            <Form.Control as="select">
                                <option>All Roles</option>
                                <option>Doctor</option>
                                <option>Nurse</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Form>
                        <Form.Group controlId="statusFilter">
                            <Form.Control as="select">
                                <option>All Statuses</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            {/* 중간 섹션 */}
            <Row className="mb-3">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Last Login</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.lastLogin}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <Button variant="info" onClick={() => handleShowUserModal(user)}>View</Button>
                                        <Button variant="warning" className="mx-2">Edit</Button>
                                        <Button variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* 사용자 상세 보기 모달 */}
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

            {/* 하단 섹션: 새로운 사용자 추가 */}
            <Row className="mb-3">
                <Col>
                    <Form>
                        <Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Control as="select">
                                    <option>Choose...</option>
                                    <option>Doctor</option>
                                    <option>Nurse</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select">
                                    <option>Choose...</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        <Button variant="primary" type="submit">
                            Add User
                        </Button>
                    </Form>
                </Col>
            </Row>

            {/* 역할 관리 섹션 */}
            <Row className="mb-3">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Role Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(role => (
                                <tr key={role.id}>
                                    <td>{role.name}</td>
                                    <td>{role.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={handleShowRoleModal}>Add Role</Button>
                </Col>
            </Row>

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
