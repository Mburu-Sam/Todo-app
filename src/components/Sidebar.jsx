import { useState } from "react";
import "../sidebar.css";

export default function Sidebar({ onSelect, categories, priorities }) {
  const [active, setActive] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [collapsed, setCollapsed] = useState(false);

  const handleSectionClick = (section) => {
    setActive(section);
    onSelect(section, selectedCategory, selectedPriority);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onSelect(active, e.target.value, selectedPriority);
  };

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
    onSelect(active, selectedCategory, e.target.value);
  };

  return (
    <>
      <button className="hamburger" onClick={() => setCollapsed(!collapsed)}>☰</button>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <h2 className="brand">Todo App</h2>
        <ul>
          <li className={active === "all" ? "item active" : "item"} onClick={() => handleSectionClick("all")}>All Tasks</li>
          <li className={active === "completed" ? "item active" : "item"} onClick={() => handleSectionClick("completed")}>Completed</li>
          <li className={active === "pending" ? "item active" : "item"} onClick={() => handleSectionClick("pending")}>Pending</li>
          <li className={active === "settings" ? "item active" : "item"} onClick={() => handleSectionClick("settings")}>Settings</li>
        </ul>
        <h3>Filter by Category</h3>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option>All</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <h3>Filter by Priority</h3>
        <select value={selectedPriority} onChange={handlePriorityChange}>
          <option>All</option>
          {priorities.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>
    </>
  );
}
