import React, { useState } from 'react'
import axios from 'axios'

function RegisterForm() {
    const [ formData, setFormData ] = useState({
        email: '',
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const res = await axios.post('http://localhost:3001/api/signup', formData)
            console.log('res', res.data)
            setFormData({
                email: '',
                username: '',
                password: ''
            })
        } catch (error) {
            console.error('Error when submitting register form', error)
        }
    }

    return (
        <div>
            <h1>FORM</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor={'email'}>Email:</label>
                    <input
                        type={'email'}
                        id={'email'}
                        name={'email'}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                </div>
                <div>
                    <label htmlFor={'username'}>Username:</label>
                    <input
                        type={'text'}
                        id={'username'}
                        name={'username'}
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor={'password'}>Password:</label>
                    <input
                        type={'password'}
                        id={'password'}
                        name={'password'}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type={'submit'}>S'inscrire</button>
            </form>
        </div>
    )
}

export default RegisterForm