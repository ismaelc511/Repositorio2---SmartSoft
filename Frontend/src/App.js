import React, {useState, useEffect, useContext} from 'react';
import Register2 from "./components/Register2"
import Login from "./components/Login"
import Header from './components/Header';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './context/userContext';
import TaskManager from './components/TaskManager';


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

  return (
    <>
    <Header /*title={message}*/ />
    <div className='App list-group-item justify-content-center align-items-center mx-auto' style={{"width":"400px", "backgroundColor": "white", "marginTop":"15px"}}>
      {
        !token ? (
          <div className='columns'>
            <Register2 /> <Login />
          </div>
        ) : (
          <div>
            <TaskManager />
          </div>
        )
        }
    </div>
    </>
  );
}

export default App;
