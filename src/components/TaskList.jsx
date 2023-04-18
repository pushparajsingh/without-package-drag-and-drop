import React, { useEffect, useState } from "react";

const TaskList =(props)=> {
  const [tasks,setTasks] = useState([]);

  useEffect(()=>{
    if(props.tasks)
    setTasks(props.tasks);
  },[props.tasks]);
  
 const onDragStart = evt => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };
  const onDragEnd = evt => {
    evt.currentTarget.classList.remove("dragged");
  };
  const onDragEnter = evt => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };
  const onDragLeave = evt => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };
  const onDragOver = evt => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };
  const onDrop = (evt, value) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");

    let updated = tasks.map(task => {
      if (task.id == data) task.done = value;
      return task;
    });
    setTasks(updated);
  };
    let pending = tasks.filter(t => !t.done);
    let done = tasks.filter(t => t.done);
    return (
      <div className="App">
        <div className="container">
          <div
            className="pending small-box"
            onDragLeave={e => onDragLeave(e)}
            onDragEnter={e => onDragEnter(e)}
            onDragEnd={e => onDragEnd(e)}
            onDragOver={e => onDragOver(e)}
            onDrop={e => onDrop(e, false)}
          >
            <h3>pending</h3>
            {pending.map(task => (
              <div
                className="task"
                key={task.name}
                id={task.id}
                draggable
                onDragStart={e => onDragStart(e)}
                onDragEnd={e => onDragEnd(e)}
              >
                {task.name}
              </div>
            ))}
          </div>
          <div
            className="done small-box"
            onDragLeave={e => onDragLeave(e)}
            onDragEnter={e => onDragEnter(e)}
            onDragEnd={e => onDragEnd(e)}
            onDragOver={e => onDragOver(e)}
            onDrop={e => onDrop(e, true)}
          >
            <h3>Done</h3>
            {done.map(task => (
              <div
                className="task"
                key={task.name}
                id={task.id}
                draggable
                onDragStart={e => onDragStart(e)}
                onDragEnd={e => onDragEnd(e)}
              >
                {task.name}
              </div>
            ))}
          </div>
        </div>
        </div>  
    );
  }


export default TaskList;




