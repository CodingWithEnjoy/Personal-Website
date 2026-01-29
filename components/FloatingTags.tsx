"use client";

import { useEffect, useState } from "react";
import styles from "./FloatingTags.module.css";

const tagsList = [
  "React",
  "React",
  "Next.js",
  "Next.js",
  "TypeScript",
  "TypeScript",
  "Three.js",
  "Three.js",
  "Node.js",
  "Node.js",
  "HTML",
  "HTML",
  "CSS",
  "CSS",
  "PHP",
  "PHP",
  "Python",
  "Python",
  "WebGL",
  "WebGL",
  "AI",
  "AI",
  "Cool Stuff",
  "Cool Stuff",
];

type Tag = {
  text: string;
  x: number;
  y: number;
  speed: number;
  size: number;
  rotation: number;
  delay: number;
};

export default function FloatingTags() {
  const [tags] = useState<Tag[]>(
    tagsList.map((tag) => ({
      text: tag,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 5,
      speed: Math.random() * 20 + 20, // seconds
      size: Math.random() * 0.6 + 0.8,
      rotation: Math.random() * 360,
      delay: Math.random() * 10,
    }))
  );

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30; // max ±15px
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={styles.container}>
      {tags.map((tag, i) => (
        <span
          key={i}
          className={styles.tag}
          style={
            {
              left: `${tag.x}%`,
              top: `${tag.y}%`,
              animationDuration: `${tag.speed}s`,
              animationDelay: `-${tag.delay}s`,
              "--rotation": `${tag.rotation}deg`,
              "--scale": tag.size,
              "--mouse-x": `${mouse.x * 0.5}px`,
              "--mouse-y": `${mouse.y * 0.5}px`,
            } as React.CSSProperties
          }
        >
          {tag.text}
        </span>
      ))}
    </div>
  );
}
