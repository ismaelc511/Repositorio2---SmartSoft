import React, {useState} from 'react';
import axios from 'axios'

function TodoItem(props){

    const [desc, setDesc] = useState('')

    const deleteTodoHandler = (title) =>{
        axios.delete(`http://localhost:8000/api/todo${title}`).then(res => console.log(res.data))
    }


    return(
        <div>
            <p>
                <span style={{ fontWeight: 'bold, underline'}}>{props.todo.title} : </span>
                {props.todo.description}
                <button onClick={() => deleteTodoHandler(props.todo.title)} className="btn btn-outline-danger my-2 mx-2" style={{"borderRadious":"50px",}}>X</button>
                
            </p>
        </div>
    )
}

export default TodoItem;