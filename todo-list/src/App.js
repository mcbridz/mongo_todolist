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
// const sendTodos = (todosArr) => {
//   axios.post(`http://localhost:8000/todos_data`, todosArr)
//     .then(res => {
//       console.log(res)
//     })
// }
const sendNewTodo = (todo, token) => {
  console.log('Sending New Todo')
  console.log(todo)
  axios.post(`http://localhost:8000/new_todo`, todo, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => {
      console.log(res)
    })
}
function App() {
  const [todos, setTodos] = useState([])
  const [token, setToken] = useState('')
  const [username, setUsername] = useState(null)

  const markDone = (id, token) => {
    return () => {
      // console.log(id)
      axios.post(`http://localhost:8000/mark_done`, { id: id }, { headers: { Authorization: `Bearer ${token}` } })
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
  }
  const processRedirect = (input) => {
    // console.log(token)
    if (!token) {
      input = <Redirect to='/login' setToken={setToken} setUsername={setUsername} />
    }
    return input
  }
  useEffect(() => {
    // console.log('token ' + token)
    if (token !== '') {
      axios.get(`http://localhost:8000/todos_data`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          const todo_data = res.data
          // console.log(todo_data)
          setTodos(todo_data)
        })
    }
  }, [token])
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/todos'>Todos</Link>
            </li>
            <li>
              <Link to='/done'>Done</Link>
            </li>
            <li>
              <Link to='/all'>All</Link>
            </li>
            <li>
              {(!token) ? <Link to='/login'>Login</Link> : <Link to='/logout' style={{ textDecoration: 'underline' }} onClick={logout}>Logout</Link>}
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </ul>
        </nav>
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
            <Login setToken={setToken} setUsername={setUsername} />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/logout'>
            <Redirect to='/login' />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
