import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import axios from "axios";
import '../style/components/comicsPage.css';

const ComicsPage = () => {
    const [user, setUser] = useState(null);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const secretKey = 'test';

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            try {
                navigate('/account');
            } catch (error) {
                console.error('Erreur lors du décodage du token :', error);
            }
        }

        const getUserData = async () => {
            const decoded = jwt_decode(token, secretKey);
            const email = decoded.userId;
            const res = await axios.get('http://localhost:3001/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: { email },
            });

            if (res.status === 201) {
                setUser({
                    userId: email,
                    username: res.data.username
                });
            }
        };

        getUserData();
    }, []);

    return (
        <div className={'comics-container'}>
            <input type="text" id="searchInput" placeholder="Rechercher..." />
            <div id="searchResults"></div>

            {/*TODO : aller chercher les données en base de tous les comics dispo, faire p-e une pagination, barre de recherche en haut, voir comment opti la recherche, p-e indexer*/}
        </div>
    )

    // return (
    //     <Routes>
    //       <Route path='/' element={<div />} />
    //       <Route path=':id' element={<div />} />
    //     </Routes>
    // )
}

export default ComicsPage
