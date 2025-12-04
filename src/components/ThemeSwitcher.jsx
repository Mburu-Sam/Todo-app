import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [dark, setDark] = useState(() => localStorage.getItem("dark") === "true");

  useEffect(() => {
    if (dark) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    localStorage.setItem("dark", dark);
  }, [dark]);

  return (
    <button style={{
      position: "fixed", top: "20px", right: "20px", padding: "10px",
      borderRadius: "6px", border: "none", cursor: "pointer", zIndex: 2000
    }}
      onClick={() => setDark(!dark)}>
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
