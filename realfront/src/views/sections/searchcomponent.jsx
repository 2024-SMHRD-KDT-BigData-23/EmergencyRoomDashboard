import React, { useState } from 'react';
import menuWhite from '../../assets/images/menuwhite.png';
import menu from '../../assets/images/menu.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
    // 환자 검색
    const [patients, setPatients] = useState('');
    // 예외 사항
    const [error, setError] = useState('');
    // 경로 설정
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/List', { patients });
            console.log(response.data);
            // 토큰을 저장하고 페이지 이동
            localStorage.setItem('token', response.data.token);
            navigate('/List');
        } catch (error) {
            console.error('Error Search in', error);
            setError('Search에 실패하였습니다.');
        }
    };

    return (
        <div className="loginbox">
            <h1 className="title font-bold">NCDSS</h1>
            <form onSubmit={handleSearch}>
                <div className="idpwbox">
                    <input
                        type="text"
                        placeholder="P-ID?"
                        className="PID"
                        value={patients}
                        onChange={(e) => setPatients(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </div>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SearchComponent;
