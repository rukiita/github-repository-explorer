"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ToggleTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const root = window.document.documentElement;

    if (savedTheme === "dark") {
      root.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;

    if (theme === "light") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      className="px-3 py-1 border rounded ml-3"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </Button>
  );
}
