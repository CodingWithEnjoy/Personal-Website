"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type Version = "v4" | "v1";

export default function UUIDGenerator() {
  const [version, setVersion] = useState<Version>("v4");
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  function uuidV4() {
    return crypto.randomUUID();
  }

  function uuidV1Like() {
    const time = Date.now().toString(16).padStart(12, "0");
    const rand = crypto.getRandomValues(new Uint8Array(10));
    const r = Array.from(rand)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return `${time.slice(0, 8)}-${time.slice(
      8,
      12,
    )}-1${r.slice(0, 3)}-${r.slice(3, 7)}-${r.slice(7, 19)}`;
  }

  function generate() {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(version === "v4" ? uuidV4() : uuidV1Like());
    }
    setUuids(list);
    setCopied(false);
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, count]);

  return (
    <main className={styles.container} dir="rtl">
      <Atmosphere />

      <motion.section
        className={styles.card}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className={styles.title}>UUID Generator</h1>
        <p className={styles.subtitle}>ساخت UUID یکتا — سریع، آفلاین و امن</p>

        {/* Controls */}
        <div className={styles.controls}>
          <div>
            <label>نسخه</label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as Version)}
            >
              <option value="v4">UUID v4 (Random)</option>
              <option value="v1">UUID v1 (Time-based)</option>
            </select>
          </div>

          <div>
            <label>تعداد</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(+e.target.value || 1)}
            />
          </div>

          <button onClick={generate} className={styles.generate}>
            تولید
          </button>
        </div>

        {/* List */}
        <div className={styles.list}>
          {uuids.map((id, i) => (
            <motion.div
              key={id + i}
              className={styles.uuid}
              whileHover={{ x: -4 }}
            >
              <code>{id}</code>
              <button
                onClick={() => navigator.clipboard.writeText(id)}
                title="کپی"
              >
                ⧉
              </button>
            </motion.div>
          ))}
        </div>

        {uuids.length > 1 && (
          <button className={styles.copyAll} onClick={copyAll}>
            {copied ? "کپی شد ✓" : "کپی همه"}
          </button>
        )}

        <p className={styles.note}>همه UUIDها داخل مرورگر تولید می‌شوند</p>
      </motion.section>
    </main>
  );
}
