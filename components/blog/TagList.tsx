"use client";

import styles from "./TagList.module.css";

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={styles.tag}
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
          #{tag}
        </span>
      ))}
    </div>
  );
}
