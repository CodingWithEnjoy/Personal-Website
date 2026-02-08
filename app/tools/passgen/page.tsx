"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>/?",
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const charset = useMemo(() => {
    return Object.entries(options)
      .filter(([_, enabled]) => enabled)
      .map(([key]) => CHARSETS[key as keyof typeof CHARSETS])
      .join("");
  }, [options]);

  const strength = useMemo(() => {
    if (length >= 20 && charset.length >= 50) return "Very Strong";
    if (length >= 14 && charset.length >= 30) return "Strong";
    if (length >= 10) return "Medium";
    return "Weak";
  }, [length, charset]);

  function generate() {
    if (!charset) return;

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
    setCopied(false);
  }

  function copy() {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, options]);

  return (
    <main className={styles.container} dir="rtl">
      <Atmosphere />

      <motion.section
        className={styles.card}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className={styles.title}>Password Generator</h1>
        <p className={styles.subtitle}>
          رمز عبور کاملاً تصادفی، امن و فقط داخل مرورگر شما ساخته می‌شود
        </p>

        {/* Password Output */}
        <div className={styles.outputBox}>
          <code>{password || "—"}</code>
          <button onClick={copy}>{copied ? "کپی شد ✓" : "کپی"}</button>
        </div>

        {/* Strength */}
        <div className={styles.strength}>
          <span>قدرت رمز</span>
          <strong data-level={strength}>{strength}</strong>
        </div>

        {/* Length */}
        <div className={styles.control}>
          <label>طول رمز: {length}</label>
          <input
            type="range"
            min={6}
            max={32}
            value={length}
            onChange={(e) => setLength(+e.target.value)}
          />
        </div>

        {/* Options */}
        <div className={styles.options}>
          {Object.keys(options).map((key) => (
            <label key={key} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={options[key as keyof typeof options]}
                onChange={() =>
                  setOptions((prev) => ({
                    ...prev,
                    [key]: !prev[key as keyof typeof options],
                  }))
                }
              />
              <span />
              {key}
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.primary} onClick={generate}>
            ساخت رمز جدید
          </button>
        </div>

        <p className={styles.note}>
          هیچ داده‌ای ذخیره یا ارسال نمی‌شود — ۱۰۰٪ Local
        </p>
      </motion.section>
    </main>
  );
}
