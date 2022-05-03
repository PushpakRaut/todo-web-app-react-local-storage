import React, { useEffect, useState } from "react";
import "./App.css";


const getLocalStorage = () => {
  let list = localStorage.getItem('lists');
  
  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
  
}

const getCompleteList = () => {
  let completeList = localStorage.getItem('completeLists')
  if(completeList){
    return JSON.parse(localStorage.getItem('completeLists'))
  } else {
    return [];
  }
}

function App() {
  const [task, setTask] = useState({ task: "" });
  const [taskText, setTaskText] = useState(getLocalStorage());
  const [completeTask, setCompleteTask] = useState(getCompleteList());

  useEffect(()=>{
    localStorage.setItem('lists', JSON.stringify(taskText))
    localStorage.setItem('completeLists', JSON.stringify(completeTask))
  },[taskText, completeTask])

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.task) {
      alert("Enter Task");
    } else {
      const newTask = { ...task, id: new Date().getTime().toString() };
      setTaskText([...taskText, newTask]);
      setTask({ task: "" });
    }
  };

  const handleClick = (id) => {
    setTaskText(taskText.filter((task) => task.id !== id));
    const doneTask = taskText.filter((task) => task.id === id);
    setCompleteTask(completeTask.concat(doneTask));
  };
  
  const handleDeleteClick = (id) => {
    setCompleteTask(completeTask.filter((task) => task.id !== id));
  };

  return (
    <section className="center">
      <form>
        <label htmlFor="task">Task : </label>
        <input
          type="text"
          placeholder="Add Task"
          id="task"
          name="task"
          value={task.task}
          onChange={handleChange}
          className={"valid"}
        />
        <button className="add-btn" type="submit" onClick={handleSubmit}>
          Add Task
        </button>
      </form>
      <div className="tasks">
        <h2>Remaining Tasks</h2>
        <div className="remaining-tasks">
          {taskText.map((text) => {
            const { task, id } = text;
            return (
              <div className="task-tab" key={id}>
                <h4>{task}</h4>
                <button onClick={() => handleClick(id)}>Mark as Done</button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="tasks">
        <h2>Completed Tasks</h2>
        <div className="completed-tasks">
          {completeTask.map((text) => {
            const { task, id } = text;
            return (
              <div className="task-tab" key={id}>
                <h4>{task}</h4>
                <button onClick={() => handleDeleteClick(id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default App;
