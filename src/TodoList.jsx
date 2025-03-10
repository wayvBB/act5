import { useState, useEffect } from "react";
import "./index.css";

export default function TodoList() {
  const [taskList, setTaskList] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (currentTask.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = [...taskList];
      updatedTasks[editIndex] = currentTask;
      setTaskList(updatedTasks);
      setEditIndex(null);
    } else {
      setTaskList([...taskList, currentTask]);
    }

    setCurrentTask("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const editTask = (index) => {
    setEditIndex(index);
    setCurrentTask(taskList[index]);
  };

  const toggleComplete = (index) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((i) => i !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  const filteredTasks = taskList.filter((task, index) => {
    if (filter === "completed") {
      return completedTasks.includes(index);
    } else if (filter === "pending") {
      return !completedTasks.includes(index);
    }
    return true;
  });

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="add-task-btn" onClick={addTask}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Filter buttons */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            <div className="task-content">
              <input
                type="checkbox"
                checked={completedTasks.includes(index)}
                onChange={() => toggleComplete(index)}
              />
              <span className={completedTasks.includes(index) ? "completed" : ""}>
                {task}
              </span>
            </div>
            <button className="edit-btn" onClick={() => editTask(index)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      {taskList.length > 2 && (
        <button className="clear-btn" onClick={() => setTaskList([])}>
          Clear All
        </button>
      )}
    </div>
  );
}
