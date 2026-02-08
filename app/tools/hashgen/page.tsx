"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const algorithms = [
  { id: "SHA-1", label: "SHA-1" },
  { id: "SHA-256", label: "SHA-256" },
  { id: "SHA-384", label: "SHA-384" },
  { id: "SHA-512", label: "SHA-512" },
];

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  async function generateHash(text: string, algorithm: string) {
    if (!text) {
      setHash("");
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const digest = await crypto.subtle.digest(algorithm, data);

    const hashHex = Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    setHash(hashHex);
    setCopied(false);
  }

  useEffect(() => {
    generateHash(input, algo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, algo]);

  function copy() {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const bits = useMemo(() => {
    if (algo === "SHA-1") return 160;
    if (algo === "SHA-256") return 256;
    if (algo === "SHA-384") return 384;
    if (algo === "SHA-512") return 512;
    return 0;
  }, [algo]);

  return (
    <main className={styles.container} dir="rtl">
      <Atmosphere />

      <motion.section
        className={styles.card}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className={styles.title}>Hash Generator</h1>
        <p className={styles.subtitle}>
          تولید هش امن با الگوریتم‌های استاندارد — همه‌چیز داخل مرورگر شما
        </p>

        {/* Input */}
        <div className={styles.control}>
          <label>متن ورودی</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="متن مورد نظر را وارد کنید…"
          />
        </div>

        {/* Algorithm */}
        <div className={styles.algos}>
          {algorithms.map((a) => (
            <button
              key={a.id}
              className={a.id === algo ? styles.active : ""}
              onClick={() => setAlgo(a.id)}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Output */}
        <div className={styles.outputBox}>
          <code>{hash || "—"}</code>
          <button onClick={copy}>{copied ? "کپی شد ✓" : "کپی"}</button>
        </div>

        {/* Meta */}
        <div className={styles.meta}>
          <span>Output</span>
          <strong>{bits}-bit</strong>
        </div>

        <p className={styles.note}>
          هیچ داده‌ای ارسال یا ذخیره نمی‌شود — ۱۰۰٪ Local
        </p>
      </motion.section>
    </main>
  );
}
