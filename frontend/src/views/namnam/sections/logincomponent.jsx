/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
import axios from 'axios';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/', {
                username,
                password
            }, { withCredentials: true } // withCredentials를 추가
        );
            console.log(response.data);
            // 로그인 성공 시 토큰을 저장하고 페이지 이동
            localStorage.setItem('token', response.data.token);
            navigate('/List');
        } catch (error) {
            console.error('Error logging in', error);
            setError('로그인 실패. 다시 시도해 주세요.');
        }
    };

    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <Col md="7" className="text-center">
                        <h1 className="title font-bold">NCDSS</h1>
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="ID"
                                className="form-control mt-3"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control mt-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button className="btn btn-primary mt-3" type="submit">Sign in</button>
                        </form>
                        {error && <p>{error}</p>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LoginComponent;
