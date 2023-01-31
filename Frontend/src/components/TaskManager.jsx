import React, {useState, useEffect, useContext} from 'react';
import Header from './Header';
import '.././App.css';
import TodoView from './TodoListView';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../context/userContext';

const TaskManager = () => {
    const [todoList, setTodoList] = useState([{}])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

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
    <div className='App list-group-item justify-content-center align-items-center mx-auto' style={{"width":"400px", "backgroundColor": "white", "marginTop":"15px"}}>
    <h1 className="card text-white bg-primary mb-1 color-task" styleName="max-width: 20rem;">Task Manager</h1>
    <div className='card-body'>
    <h5 className='card text-white bg-dark mb-3'>Add your Task</h5>  
      <span className='card-text'>
        <input className='mb-2 form-control titleIn' onChange={event => setTitle(event.target.value)} placeholder='Title'/>
        <input className='mb-2 form-control desIn' onChange={event => setDesc(event.target.value)} placeholder='Description'/>
        <button className='btn btn-outline-primary mx-2 mb-2 mb-3' style={{'borderRadious':'50px', 'font-weight':'bold'}} onClick={addTodoHandler}>Add Task</button>  
      
      </span>

      <h5 className='card text-white bg-dark mb-3'>Your Task</h5>  
      <div>
        {<TodoView todoList={todoList} />}
    </div>
    <h6 className='card text-dark bg-warning py-1 mb-0'>Copyright 2022, All rights reserved &copy;</h6>
    </div>
    </div>
    </>

  )
}

export default TaskManager;