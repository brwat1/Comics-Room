import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import CurrentReadings from '../components/CurrentReadings.js'
import Wishlist from '../components/Wishlist.js'
import RecentBoughts from '../components/RecentBoughts.js'
import '../style/components/account.css'
import RegisterPopin from "../components/popins/registerPopin";
function Account() {
    const [user, setUser] = useState(null);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [showPopin, setShowPopin] = useState(false);
    const navigate = useNavigate();
    const secretKey = 'test';

    useEffect(() => {
        const handleRegister = () => {
            setShowPopin(true);
        };

        const registerButton = document.getElementById('register-button');

        if (registerButton) {
            registerButton.addEventListener('click', handleRegister);

            return () => {
                registerButton.removeEventListener('click', handleRegister);
            };
        }

        // Ajoutez cette partie pour la vérification
        return () => {
            if (registerButton) {
                registerButton.removeEventListener('click', handleRegister);
            }
        };
    }, []);

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

                    navigate('/comics');
                    navigate('/account');
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

    const handleRegister = () => {
        setShowPopin(true);
    }

    return (
        <div className="account-container">
            {user && user.username ? (
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
                    <p>Connectez-vous pour accéder à votre compte</p>
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
                    <div id={'register-container'}>
                        Pas encore inscrit ? Créez un compte <a id={'register-button'}>ici</a>
                    </div>
                    { showPopin && (
                        <RegisterPopin/>
                    )}
                </div>
            )}
        </div>
    );
}

export default Account;