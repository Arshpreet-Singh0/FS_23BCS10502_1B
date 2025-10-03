import React, { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([
    {
      task: "read",
      isCompleted: false,
    },
  ]);
  const [task, setTask] = useState("");

  const addTodo = () => {
    console.log(task);
    
    if(!task) return;

    setTodos((t)=>[...t, {task, isCompleted : false}])
    setTask("");
  };

  const markComplete = (idx)=>{
    todos[idx].isCompleted = true;

    setTodos([...todos]);
  }
  const deleteTask = (i)=>{
    
    let filterdTodos = todos.filter((t, idx)=>idx!=i);

    setTodos([...filterdTodos]);
  }
  return (
    <div className="mt-10">
      <h1>TODO APP</h1>

      <div className="w-64 p-5 border border-black rounded-lg">
        <label>Task : </label>

        <input
          type="text"
          onChange={(e) => setTask(e.target.value)}
          className="border border-black rounded w-full p-1"
          value={task}
        />

        <button
          onClick={addTodo}
          className="bg-blue-800 w-full rounded py-1 text-white mt-5"
        >
          Add Task
        </button>
      </div>

      <div className="mt-10">
        <h1 className="text-xl">Todo Tasks</h1>

        {todos.map((t, idx) => (
          <div key={idx} className="mt-5">
            <p>Task : {t?.task}</p>
            <p>isCompleted : {t?.isCompleted ? "yes" : "no"}</p>

           <div className="flex gap-4 flex-col">
             <button
          onClick={()=>markComplete(idx)}
          className="bg-blue-800 rounded py-1 px-2 text-white "
        >
          Mark Task Completed
        </button>
            <button
          onClick={()=>deleteTask(idx)}
          className="bg-red-600 rounded py-1 px-2 text-white "
        >
          Delete Task
        </button>
           </div>
        
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
