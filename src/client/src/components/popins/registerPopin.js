import React, { useEffect, useState } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Link, useNavigate} from 'react-router-dom';
import '../../style/components/register.css'
const RegisterPopin = (state) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [success, setSuccess] = useState(false);
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', verifyPassword: '' });
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [showPopin, setShowPopin] = useState(false);
    const [error, setError] = useState('');
    const handleRegisterSubmit = async (event) => {
        event.preventDefault();

        if (registerData.password !== registerData.verifyPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            setLoginData({ email: registerData.email, password: registerData.password });
            const res = await axios.post('http://localhost:3001/api/signup', registerData);

            if (res.status === 200 || res.status === 201) {
                try {
                    handleEndRegister();

                    setUser({
                        userId: registerData.email,
                        username: registerData.username
                    });
                    setSuccess(true);

                    const resLogin = await axios.post('http://localhost:3001/api/login', loginData);

                    if (resLogin.status === 200) {
                        const token = resLogin.data.token;
                        localStorage.setItem('jwtToken', token);
                    }

                    // setTimeout(() => {
                    //     setSuccess(false);
                    // }, 5000);
                } catch (error) {
                    console.error('Erreur lors du décodage du token :', error);
                }
            } else {
                console.error('Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire de connexion :', error);
            alert('Données incorrectes');
        }
    };

    const handleEndRegister = () => {
        setShowPopin(false);
    }

    return (
        <div className={"register-popin"} onClick={handleEndRegister}>
            { success && (<div id={"success"}>Inscription réussie !</div>)}
            <div id={"blurred-bg"}></div>
            <div className="popin-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-icon" onClick={handleEndRegister}><img src={'down.png'} alt={'close form'}></img></span>
                <form onSubmit={handleRegisterSubmit} className={'register-form'}>
                    <label>
                        Pseudo :<br/>
                        <input
                            type="text"
                            name="pseudo"
                            value={registerData.username}
                            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        />
                    </label>
                    <br/>
                    <label>
                        Email :<br/>
                        <input
                            type="email"
                            name="email"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Mot de passe :<br/>
                        <input
                            type="password"
                            name="password"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Vérifier le mot de passe :<br/>
                        <input
                            type="password"
                            name="password"
                            value={registerData.verifyPassword}
                            onChange={(e) => setRegisterData({ ...registerData, verifyPassword: e.target.value })}
                        />
                    </label>
                    <br />
                    <button type="submit" className={"button-submit"}>Créer mon compte</button>
            </form>
            </div>
        </div>
    )
}

export default RegisterPopin
