import { useState, useEffect } from "react";
import "../todo.css";

export default function TodoList({ filterSection, filterCategory, filterPriority }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Normal");
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task) return;
    const newTask = { id: Date.now(), text: task, category, priority, completed: false };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const openEditModal = (t) => setEditTask(t);
  const saveEdit = () => {
    setTasks(tasks.map(t => t.id === editTask.id ? editTask : t));
    setEditTask(null);
  };

  const filteredTasks = tasks.filter(t => {
    let sectionCheck = true;
    if (filterSection === "completed") sectionCheck = t.completed;
    else if (filterSection === "pending") sectionCheck = !t.completed;

    let categoryCheck = filterCategory === "All" || t.category === filterCategory;
    let priorityCheck = filterPriority === "All" || t.priority === filterPriority;

    return sectionCheck && categoryCheck && priorityCheck;
  });

  return (
    <div className="todo-container">
      <h1>Tasks</h1>
      <div className="input-row">
        <input placeholder="Enter task" value={task} onChange={e => setTask(e.target.value)} />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>General</option>
          <option>Work</option>
          <option>Personal</option>
        </select>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(t => (
          <li key={t.id} className="task-item">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(t.id)} />
              <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                {t.text} [{t.category}] ({t.priority})
              </span>
            </div>
            <div>
              <button onClick={() => openEditModal(t)}>Edit</button>
              <button onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {editTask && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Edit Task</h2>
            <input value={editTask.text} onChange={e => setEditTask({ ...editTask, text: e.target.value })} />
            <select value={editTask.category} onChange={e => setEditTask({ ...editTask, category: e.target.value })}>
              <option>General</option>
              <option>Work</option>
              <option>Personal</option>
            </select>
            <select value={editTask.priority} onChange={e => setEditTask({ ...editTask, priority: e.target.value })}>
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setEditTask(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
