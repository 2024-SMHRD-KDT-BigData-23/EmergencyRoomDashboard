import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/scss/login.scss';
import backmp4 from '../../assets/images/background.mp4';
import mainH from '../../assets/images/mainHeader.png';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                staffId: username,
                staffPw: password
            }, { withCredentials: true });
            const token = response.headers['authorization'];
            if (response.data === "Login Successful") {
                localStorage.setItem("token", (token||'').split(" ")[1]); // JWT 토큰 저장
                sessionStorage.setItem("staffId", username); // 브라우저 세션에 사용자 아이디 저장
                if(username ==='admin' && password === 'admin') {
                    navigate('/admin'); 
                } else {
                    navigate('/present/List/All');
            }
            } else {
                setError('로그인 실패. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('Error logging in', error);
            setError('아이디와 비밀번호를 확인해주세요.');
        }
    };

    return (
        
        <div className='login-container'>
            <video autoPlay loop muted id="background-video">
                    <source src={backmp4} type="video/mp4" />
                    Your browser does not support the video tag.
            </video>
                <div className='loginbox'>
                    <form onSubmit={handleLogin}>
                    <img src={mainH} className="loginLogo"></img>
                        <label className='loginTitle'>
                            NCDSS
                            </label>
                        <div className="idpwbox">
                            <input
                                type="text"
                                placeholder="USER NAME"
                                className="logininput"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="PASSWORD"
                                className="logininput"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" className='loginButton'>LOGIN</button>
                            {error && <p className='errorMent'>{error}</p>}
                        </div>
                    </form>
                </div>
        </div>
    );
};

export default LoginComponent;
