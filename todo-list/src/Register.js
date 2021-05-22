import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Register() {
    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [vpassword, setVPassword] = useState('')
    let [passwordsMatch, setPasswordsMatch] = useState(true)
    let history = useHistory()
    const checkPasswordsMatch = (p, vp) => {
        // console.log(`Checking ${p} against ${vp}`)
        setPasswordsMatch(p === vp)
    }
    const handleUsernameChange = (evt) => {
        let newUsername = evt.target.value
        setUsername(newUsername)
    }
    const handlePasswordChange = (evt) => {
        let newPassword = evt.target.value
        setPassword(newPassword)
        checkPasswordsMatch(newPassword, vpassword)
    }
    const handleVPasswordChange = (evt) => {
        let newVPassword = evt.target.value
        setVPassword(newVPassword)
        checkPasswordsMatch(password, newVPassword)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()
        axios.post('http://localhost:8000/register', {
            username: username,
            password: password
        }).then((res) => {
            // console.log(res)
            if (res.status === 201) {
                history.push('/login')
            }
        })
    }
    return (
        // minlength="8"
        <div>
            <h5>Register</h5>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleUsernameChange} placeholder="username" />
                <input type="password" onChange={handlePasswordChange} placeholder="password" />
                <input type="password" onChange={handleVPasswordChange} placeholder="re-type password" />
                <button type="submit" disabled={!passwordsMatch}>Register!</button>
            </form>

        </div>
    )
}

export default Register
