import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TodoList from "./components/TodoList";
import ThemeSwitcher from "./components/ThemeSwitcher";

export default function App() {
  const categories = ["General", "Work", "Personal"];
  const priorities = ["Low", "Normal", "High"];
  const [section, setSection] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const handleSelect = (sec, cat, pri) => {
    setSection(sec);
    setCategoryFilter(cat);
    setPriorityFilter(pri);
  };

  return (
    <>
      <ThemeSwitcher />
      <div style={{ display: "flex" }}>
        <Sidebar
          onSelect={handleSelect}
          categories={categories}
          priorities={priorities}
        />
        <div style={{ flex: 1, padding: "20px" }}>
          {section === "settings" && <h1>Settings</h1>}
          <TodoList
            filterSection={section}
            filterCategory={categoryFilter}
            filterPriority={priorityFilter}
          />
        </div>
      </div>
    </>
  );
}
