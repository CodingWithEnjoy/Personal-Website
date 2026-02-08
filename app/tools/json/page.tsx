"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function JSONTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function formatJSON() {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  }

  function copyOutput() {
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
        <h1 className={styles.title}>JSON Formatter & Validator</h1>
        <p className={styles.subtitle}>
          فرمت، اعتبارسنجی و بررسی JSON به صورت زنده
        </p>

        {/* Input */}
        <div className={styles.control}>
          <label>JSON ورودی</label>
          <textarea
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
          />
        </div>

        <div className={styles.actionsRow}>
          <button onClick={formatJSON}>فرمت JSON</button>
          <button onClick={copyOutput} disabled={!output}>
            {copied ? "کپی شد ✓" : "کپی خروجی"}
          </button>
        </div>

        {/* Output / Error */}
        {error && <p className={styles.error}>خطا: {error}</p>}
        {output && (
          <div className={styles.output}>
            <pre>{output}</pre>
          </div>
        )}
      </motion.section>
    </main>
  );
}
