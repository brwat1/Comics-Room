import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function Login() {
    const [user, setUser] = useState(null);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
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
            console.log(1)
            console.log(res)

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

    return (
        <div className="App">
            {user ? (
                <div>
                    <h1>Bienvenue, {user.username}!</h1>
                </div>
            ) : (
                <div>
                    <p>Connectez-vous pour accéder à votre compte.</p>
                    <form onSubmit={handleLoginSubmit}>
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