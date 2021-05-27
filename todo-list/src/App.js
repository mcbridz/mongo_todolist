import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import Todos from './Todos'
import Login from './Login'
import Register from './Register'
import './App.css'
import useCookie from './useCookie'
// const sendTodos = (todosArr) => {
//   axios.post(`http://localhost:8000/todos_data`, todosArr)
//     .then(res => {
//       console.log(res)
//     })
// }
const URL = `${window.location.protocol}//${window.location.hostname}`
const sendNewTodo = (todo, token) => {
  console.log('Sending New Todo')
  console.log(todo)
  axios.post(`${URL}/new_todo`, todo, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => {
      console.log(res)
    })
}
function App() {
  const [todos, setTodos] = useState([])
  const [cookie, setCookie] = useCookie('todoCookie', '')
  const [token, setToken] = useState((cookie) ? cookie : '')
  const [username, setUsername] = useState(null)

  console.log(cookie)

  const markDone = (id, token) => {
    return () => {
      // console.log(id)
      axios.post(`${URL}/mark_done`, { id: id }, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          console.log(res)
          todos[id].done = true
          let newTodos = [...todos]
          // console.log('//////////////////')
          // console.log(newTodos)
          setTodos(newTodos)
        })
    }
  }
  const logout = () => {
    setToken('')
    setTodos([])
    setCookie('')
  }
  const processRedirect = (input) => {
    // console.log(token)
    if (!token) {
      input = <Redirect to='/login' setToken={setToken} setUsername={setUsername} />
    }
    return input
  }
  useEffect(() => {
    if (token) {
      axios.get(`${URL}/todos_data`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          console.log('useEffect triggered')
          const todo_data = res.data
          // console.log(todo_data)
          setTodos(todo_data)
        })
    }
  }, [token])
  return (
    <Router>
      <div id="page">
        <nav>
          <div id="navList">
            <div>
              <Link to='/todos'>Todos</Link>
            </div>
            <div>
              <Link to='/done'>Done</Link>
            </div>
            <div>
              <Link to='/all'>All</Link>
            </div>
            <div>
              {(!token) ? <Link to='/login'>Login</Link> : <Link to='/logout' style={{ textDecoration: 'underline' }} onClick={logout}>Logout</Link>}
            </div>
            <div>
              <Link to='/register'>Register</Link>
            </div>
          </div>
        </nav>
        <div id="display">
          <Switch>
            <Route path='/todos'>
              {processRedirect(<Todos type='Not Done' token={token} sendNewTodo={sendNewTodo} todos={todos} setTodos={setTodos} markDone={markDone} username={username} />)}
            </Route>
            <Route path='/done'>
              {processRedirect(<Todos type='Done' token={token} sendNewTodo={sendNewTodo} todos={todos} setTodos={setTodos} markDone={markDone} username={username} />)}
            </Route>
            <Route path='/all'>
              {processRedirect(<Todos type='' token={token} sendNewTodo={sendNewTodo} todos={todos} setTodos={setTodos} markDone={markDone} username={username} />)}
            </Route>
            <Route path='/login'>
              <Login setToken={setToken} setUsername={setUsername} setCookie={setCookie} />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/logout'>
              <Redirect to='/login' />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default App;
