"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type Action =
  | "uppercase"
  | "lowercase"
  | "title"
  | "trim"
  | "remove-empty"
  | "sort"
  | "reverse";

export default function TextFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [action, setAction] = useState<Action>("uppercase");

  function format(text: string, action: Action) {
    switch (action) {
      case "uppercase":
        return text.toUpperCase();

      case "lowercase":
        return text.toLowerCase();

      case "title":
        return text.replace(
          /\w\S*/g,
          (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
        );

      case "trim":
        return text
          .split("\n")
          .map((l) => l.trim())
          .join("\n");

      case "remove-empty":
        return text
          .split("\n")
          .filter((l) => l.trim() !== "")
          .join("\n");

      case "sort":
        return text
          .split("\n")
          .sort((a, b) => a.localeCompare(b))
          .join("\n");

      case "reverse":
        return text.split("").reverse().join("");

      default:
        return text;
    }
  }

  useEffect(() => {
    setOutput(input ? format(input, action) : "");
    setCopied(false);
  }, [input, action]);

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <main className={styles.container} dir="rtl">
      <Atmosphere />

      <motion.section
        className={styles.card}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className={styles.title}>Text Formatter</h1>
        <p className={styles.subtitle}>
          تمیز، مرتب و تبدیل متن — سریع و بدون دردسر
        </p>

        {/* Action */}
        <div className={styles.actions}>
          {ACTIONS.map((a) => (
            <button
              key={a.id}
              className={action === a.id ? styles.active : ""}
              onClick={() => setAction(a.id)}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className={styles.control}>
          <label>متن ورودی</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="متن خود را اینجا وارد کنید…"
          />
        </div>

        {/* Output */}
        <div className={styles.outputBox}>
          <code>{output || "—"}</code>
          <button onClick={copy} disabled={!output}>
            {copied ? "کپی شد ✓" : "کپی"}
          </button>
        </div>

        <p className={styles.note}>تمام پردازش‌ها داخل مرورگر انجام می‌شود</p>
      </motion.section>
    </main>
  );
}

const ACTIONS = [
  { id: "uppercase", label: "UPPERCASE" },
  { id: "lowercase", label: "lowercase" },
  { id: "title", label: "Title Case" },
  { id: "trim", label: "Trim Lines" },
  { id: "remove-empty", label: "Remove Empty Lines" },
  { id: "sort", label: "Sort Lines" },
  { id: "reverse", label: "Reverse Text" },
] as const;
