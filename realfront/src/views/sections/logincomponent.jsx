/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/scss/login.scss';

const LoginComponent = () => {
    const [staffId, setStaffId] = useState('');
    const [staffPw, setStaffPw] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/', {
                staffId: staffId,
            staffPw: staffPw
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
        <div className='loginbox'>
            
                        <h1 className="title font-bold">NCDSS</h1>
                        <form onSubmit={handleLogin}>
                        <div className="idpwbox">
                            <input
                                type="text"
                                placeholder="아이디를 입력하세요."
                                className="logininput"
                                value={staffId}
                                onChange={(e) => setStaffId(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="비밀번호를 입력하세요."
                                className="logininput"
                                value={staffPw}
                                onChange={(e) => setStaffPw(e.target.value)}
                            />
                             <button type="submit" className='loginButton'>SIGN IN</button>
                            </div>
                        </form>
                        
                        {error && <p>{error}</p>}
              
        </div>
    );
};

export default LoginComponent;
