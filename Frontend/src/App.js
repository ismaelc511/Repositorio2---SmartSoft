import React, {useState, useEffect, useContext} from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login"
import Register2 from './components/Register2';
import TaskManager from './components/TaskManager';
import Header from './components/Header';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './context/userContext';


function App() {

  const [todoList, setTodoList] = useState([{}])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [token] = useContext(UserContext);

  // Read all todos
  useEffect(() =>{
    axios.get('http://localhost:8000/api/todo')
    .then(res => {
      setTodoList(res.data)
    })
  });

  //Read one todo
  const getOneHandler = () =>{
    axios.get(`http://localhost:8000/api/todo${title}`, {'title': title})
    .then(response => response)
  }

  // Post a todo
  const addTodoHandler = () => {
    axios.post('http://localhost:8000/api/todo', {'title': title, 'description': desc})
    .then(res2 => res2)
  };

  const listStyles = {
    listStyleType: "none",
    padding: 0,
  };

  return (
    <>
    <Header /*title={message}*/ />
    <div className='App list-group-item justify-content-center align-items-center mx-auto' style={{"width":"400px", "backgroundColor": "white", "marginTop":"15px"}}>
      {
        token ? (
        <BrowserRouter>
        <nav>
            <ul style={listStyles}>
              <li>
                <Link to="/taskManager">TaskManager</Link>
              </li>
            </ul>
          </nav>
        <Routes>
        <Route path="/taskManager" element={<TaskManager />}></Route>
        </Routes>
        </BrowserRouter>
        ) : (
          <BrowserRouter>
          <nav>
            <ul style={listStyles}>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register2/>}></Route>
          </Routes>
          </BrowserRouter>
        )
      /*
        !token ? (
          <div className='columns'>
            <Register2 /> <Login />
          </div>
        ) : (
          <div>
            <TaskManager />
          </div>
        )
        */
        
        }
    </div>
    </>
  );
}

export default App;
