import React, { useState } from "react";
import Task from "./Task/Task.jsx";
import "./TodoApp.css";

function TodoApp() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  const onInputTaskChange = (event) => {
    setTaskName(event.target.value);
  };

  const addTask = () => {
    if(taskName.trim()===''){
      alert("Task name cannot be empty");
      return;
    }
    const newTask = {
      name: taskName,
      id: tasks.length == 0 ? 0 : tasks[tasks.length - 1].id + 1,
      checked: false,
    };
    setTasks((prev) => {
      return [...prev, newTask];
    });
    setTaskName("");
  };

  const deleteTask = (taskId) => {
    setTasks([...tasks.filter((task) => task.id != taskId)]);
  };

  const updateTask = (newTask) => {
    const task = tasks.find((task) => task.id == newTask.id);
    task.name = newTask.name;
    task.checked = newTask.checked;
    setTasks([...tasks]);
  };
  const filterTasks = (task, status) => {
    switch(status){
      case 'active' :
        return tasks.filter((task)=>!task.checked);
        case 'completed' :
          return task.filter((task)=>task.checked);
          default:
            return task;
    }
  };
  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };
  return (
    <div className="App">
      <h1>#todo</h1>
      <div className="todo-wrapper">
        <div className="status-toggle">
          <button onClick={()=>handleFilterChange('all')}>All</button>
          <button onClick={()=>handleFilterChange('active')}>Active</button>
          <button onClick={()=>handleFilterChange('completed')}>Completed</button>
        </div>
        <div className="input-wrapper">
          <input className="input-task"
            onChange={onInputTaskChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
            type="text"
            placeholder="Add details"
            value={taskName}
          ></input>
          <button className="button-task" onClick={addTask}> Add</button>
          {filterTasks(tasks, filterStatus).map((task) => {
            return (
              <Task
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
