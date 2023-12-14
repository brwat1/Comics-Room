import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import CurrentReadings from '../components/CurrentReadings.js'
import Wishlist from '../components/Wishlist.js'
import RecentBoughts from '../components/RecentBoughts.js'
import '../style/components/login.css'
function Login() {
    const [user, setUser] = useState(null);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const secretKey = 'test';

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
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

        if (token) {
            try {
                getUserData();
            } catch (error) {
                console.error('Erreur lors du décodage du token :', error);
            }
        }
    }, []);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('http://localhost:3001/api/login', loginData);

            if (res.status === 200) {
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);

                try {
                    const decoded = jwt_decode(token, secretKey);
                    setUser({
                        userId: decoded.userId,
                        username: ''
                    });
                } catch (error) {
                    console.error('Erreur lors du décodage du token :', error);
                }
            } else {
                console.error('Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire de connexion :', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setUser(null);
        handleRedirect('/')
    };

    const handleRedirect = (path) => {
        navigate(path);
    }

    return (
        <div className="login-container">
            {user ? (
                <div>
                    <h1>Bienvenue, {user.username}!</h1>
                    <button onClick={handleLogout}>Se déconnecter</button>
                    <CurrentReadings/>
                    <Wishlist/>
                    <RecentBoughts/>
                    <button onClick={() => handleRedirect('/comics')}>Ma collection</button>
                </div>
            ) : (
                <div>
                    <p>Connectez-vous pour accéder à votre compte.</p>
                    <form onSubmit={handleLoginSubmit} className={'login-form'}>
                        <label>
                            Email :
                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            />
                        </label>
                        <br />
                        <label>
                            Mot de passe :
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                        </label>
                        <br />
                        <button type="submit">Se connecter</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Login;