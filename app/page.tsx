"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import FloatingTags from "@/components/FloatingTags";
import Atmosphere from "@/components/Atmosphere";

const subtitleText = "چیزهایی می‌سازم که کار می‌کنن. بعضی وقتا هم فقط عجیبن.";

export default function Home() {
  const [phase, setPhase] = useState<"boot" | "show">("boot");
  const [typedSubtitle, setTypedSubtitle] = useState("");

  // Boot screen timer
  useEffect(() => {
    const t = setTimeout(() => setPhase("show"), 2500);
    return () => clearTimeout(t);
  }, []);

  // Typing effect
  useEffect(() => {
    if (phase === "show") {
      let index = 0;
      const timer = setInterval(() => {
        setTypedSubtitle(subtitleText.slice(0, index + 1));
        index++;
        if (index >= subtitleText.length) clearInterval(timer);
      }, 40);

      return () => clearInterval(timer);
    }
  }, [phase]);

  return (
    <main className={styles.container}>
      {/* Shared background atmosphere */}
      <Atmosphere />

      <FloatingTags />

      {/* Boot screen */}
      {phase === "boot" && (
        <div className={styles.bootScreen}>
          <p className={styles.bootText}>در حال لود کردن ذهن امیرمسعود ...</p>
          <div className={styles.bar}>
            <span />
          </div>
        </div>
      )}

      {/* Main frame */}
      <div className={`${styles.frame} ${phase === "show" ? styles.show : ""}`}>
        <div className={styles.header}>
          <span />
          <span />
          <span />
        </div>

        <div className={styles.terminal}>
          <h1 className={styles.title}>
            من امیرمسعودم
            <span className={styles.caret}>_</span>
          </h1>

          <p className={styles.subtitle}>{typedSubtitle}</p>

          <div className={styles.actions}>
            <Link href="/projects" className={styles.button}>
              پروژه‌ها
            </Link>
            <Link href="/about" className={styles.ghost}>
              درباره من
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
