import {v4 as uuidv4} from "uuid";
import { useState } from "react";
export default function TodoList(){
    let [todos,setTodos] = useState([{task:"Sample-task",id:uuidv4(),isDone:false}]);
    let [newTodo,setNewTodo] = useState("");

    let addNewTask = ()=>{
        if(!newTodo.trim()){
            return;
        }
        setTodos((prevTodos)=>{
            return [...prevTodos,{task:newTodo,id:uuidv4(),isDone:false}];
        });
        setNewTodo("");
    };

    let updateTodoValue = (event)=>{
        setNewTodo(event.target.value);
    }
    let deleteTodo=(id)=>{
        setTodos((prevTodos)=>prevTodos.filter((todo)=>todo.id!=id));
        
    };
     
    let completeAll = ()=>{
        setTodos((prevTodos)=>(prevTodos.map((todo)=>{
            return{
                ...todo,isDone:true,
            };
        })
    ));
    };

    let completeOne = (id)=>{
        setTodos((prevTodos)=>(prevTodos.map((todo)=>{
           if(todo.id==id){
             return{
                ...todo,isDone:true,
            };
           }
           return todo;
        })
    ));
    };
    const allDone = todos.length > 0 && todos.every(todo => todo.isDone);
    return(
        <div>
            <h2>Basic React Todo</h2>
            <input type="text" placeholder="add a task" value={newTodo} onChange={updateTodoValue}></input>
            <br></br><br></br>
            <button onClick={addNewTask}>Add Task</button>
            <br></br><br></br><br></br>
            <hr></hr>
            <h4>tasks to do</h4>
            <ul>
                {
                    todos.map((el)=>{
                        let styles = el.isDone?{textDecoration: "line-through"}:null;
                       return <li key={el.id}>
                        <span>
                           <span style={styles}>{el.task}</span> 
                            &nbsp;&nbsp; &nbsp;&nbsp;
                            <button onClick={(()=> deleteTodo(el.id))}>Delete</button>
                            &nbsp;&nbsp;
                            {!el.isDone && <button onClick={(()=> completeOne(el.id))}>Mark Complete</button>}
                            </span>
                        </li>
                    })
                }
                    <br></br>
            </ul>
            <br></br>
            {todos.length > 0 && !allDone && <button onClick={completeAll}>Mark All Complete</button>}
        </div>
    );
}