import React, { useState } from 'react'
import axios from 'axios'

function Login(props) {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    const handleUsernameChange = (evt) => {
        let newUsername = evt.target.value
        setUsername(newUsername)
    }
    const handlePasswordChange = (evt) => {
        let newPassword = evt.target.value
        setPassword(newPassword)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()
        axios.post('http://localhost:8000/login', {
            username: username,
            password: password
        })
    }
    return (
        <div>
            <h5>Login</h5>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleUsernameChange} required placeholder="username" />
                <input type="password" onChange={handlePasswordChange} required placeholder="***" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
