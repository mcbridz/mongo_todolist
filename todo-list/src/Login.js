import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Login(props) {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let setUsernameNow = props.setUsername
    const setToken = props.setToken
    let history = useHistory()
    let setCookie = props.setCookie
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
        }).then((res) => {
            // console.log(res.data.token)
            setToken(res.data.token)
            setCookie(res.data.token, 2)
            setUsernameNow(username)
            history.push('/todos')
        })
    }
    return (
        <div>
            <h1 id='title'>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleUsernameChange} required placeholder="username" />
                <input type="password" onChange={handlePasswordChange} required placeholder="***" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
