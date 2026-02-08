"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type Mode = "encode" | "decode";

export default function Base64Tool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function encode(text: string) {
    return btoa(unescape(encodeURIComponent(text)));
  }

  function decode(text: string) {
    return decodeURIComponent(escape(atob(text)));
  }

  useEffect(() => {
    setCopied(false);
    setError(null);

    if (!input) {
      setOutput("");
      return;
    }

    try {
      const result = mode === "encode" ? encode(input) : decode(input);
      setOutput(result);
    } catch {
      setError("ورودی معتبر نیست");
      setOutput("");
    }
  }, [input, mode]);

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  function swap() {
    setInput(output);
    setMode((m) => (m === "encode" ? "decode" : "encode"));
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
        <h1 className={styles.title}>Base64 Encoder / Decoder</h1>
        <p className={styles.subtitle}>
          تبدیل متن به Base64 و برعکس — پشتیبانی کامل از UTF-8
        </p>

        {/* Mode */}
        <div className={styles.modes}>
          <button
            className={mode === "encode" ? styles.active : ""}
            onClick={() => setMode("encode")}
          >
            Encode
          </button>
          <button
            className={mode === "decode" ? styles.active : ""}
            onClick={() => setMode("decode")}
          >
            Decode
          </button>
        </div>

        {/* Input */}
        <div className={styles.control}>
          <label>ورودی</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "متن معمولی را وارد کنید…"
                : "Base64 را وارد کنید…"
            }
          />
        </div>

        {/* Swap */}
        <div className={styles.swap}>
          <button onClick={swap}>⇅ جابجا کن</button>
        </div>

        {/* Output */}
        <div className={styles.outputBox}>
          <code>{output || "—"}</code>
          <button onClick={copy} disabled={!output}>
            {copied ? "کپی شد ✓" : "کپی"}
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <p className={styles.note}>
          تمام پردازش‌ها داخل مرورگر انجام می‌شود — بدون ارسال داده
        </p>
      </motion.section>
    </main>
  );
}
