"use client";

import { useState } from "react";
import styles from "./Atmosphere.module.css";

type SnowDot = {
  size: number;
  left: number;
  duration: number;
  delay: number;
};

export default function Atmosphere() {
  const [snowDots] = useState<SnowDot[]>(() =>
    Array.from({ length: 50 }).map(() => ({
      size: Math.random() * 6 + 2,
      left: Math.random() * 100,
      duration: Math.random() * 14 + 6,
      delay: Math.random() * 20,
    }))
  );

  return (
    <>
      {/* Grid background */}
      <div className={styles.grid} />

      {/* Snow particles */}
      <div className={styles.snow}>
        {snowDots.map((dot, i) => (
          <span
            key={i}
            className={styles.snowDot}
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              left: `${dot.left}%`,
              animationDuration: `${dot.duration}s`,
              animationDelay: `-${dot.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
