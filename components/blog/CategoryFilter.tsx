"use client";

import { useState } from "react";
import styles from "./CategoryFilter.module.css";

type Props = {
  categories: string[];
  onSelect?: (category: string) => void; // optional callback
};

export default function CategoryFilter({ categories, onSelect }: Props) {
  const [active, setActive] = useState<string>("");

  const handleClick = (cat: string) => {
    setActive(cat);
    onSelect?.(cat);
  };

  return (
    <nav className={styles.categories}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.button} ${active === cat ? styles.active : ""}`}
          onClick={() => handleClick(cat)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty(
              "--x",
              `${e.clientX - rect.left}px`
            );
            e.currentTarget.style.setProperty(
              "--y",
              `${e.clientY - rect.top}px`
            );
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.removeProperty("--x");
            e.currentTarget.style.removeProperty("--y");
          }}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
