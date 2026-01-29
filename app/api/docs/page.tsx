"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { usePathname } from "next/navigation";
import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";

const apis = [
  { slug: "getting-started", name: "شروع کار" },
  { slug: "weather", name: "آب و هوا" },
  { slug: "ip", name: "اطلاعات IP" },
  { slug: "currency", name: "نرخ ارز، طلا و سکه" },
  { slug: "gold", name: "قیمت شمش پامپ" },
  { slug: "aqi", name: "کیفیت هوا (AQI)" },
  { slug: "date", name: "تاریخ" },
  { slug: "encode", name: "رمزگذاری و رمزنگاری" },
];

export default function GettingStarted() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const pathname = usePathname();

  const handleCopy = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1000);
  };

  return (
    <main className={styles.container} dir="rtl">
      <Atmosphere />

      <motion.aside
        className={styles.sidebar}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className={styles.sidebarTitle}>مستندات</h2>
        <ul className={styles.apiList}>
          {apis.map((api) => {
            const active =
              pathname === `/api/docs/${api.slug}` ||
              (api.slug === "getting-started" && pathname === "/api/docs");
            return (
              <li key={api.slug} className={styles.apiItem}>
                <Link
                  href={
                    api.slug === "getting-started"
                      ? "/api/docs"
                      : `/api/docs/${api.slug}`
                  }
                  className={active ? styles.active : ""}
                >
                  {api.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.aside>

      <section className={styles.content}>
        <motion.h1
          className={styles.endpoint}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          شروع کار با API
        </motion.h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          APIهای ما کاملاً رایگان، سریع، عمومی و بدون نیاز به کلید هستند.
          می‌توانید مستقیماً با HTTP آن‌ها را فراخوانی کنید.
        </motion.p>

        <motion.div
          className={styles.features}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <h3>ویژگی‌ها</h3>
          <ul>
            <li>کاملاً رایگان و بدون نیاز به کلید API</li>
            <li>پاسخ سریع و سبک</li>
            <li>قابل استفاده در JS، Python و PHP و ...</li>
            <li>دسترسی عمومی به تمام اطلاعات</li>
          </ul>
        </motion.div>

        {/* JS Example */}
        <div className={styles.codeBlock}>
          <CopyToClipboard
            text={`fetch("/api/weather?city=Tehran")
  .then(res => res.json())
  .then(console.log);`}
            onCopy={() => handleCopy("js")}
          >
            <button className={styles.copyBtn}>
              {copiedId === "js" ? "کپی شد !" : "کپی"}
            </button>
          </CopyToClipboard>
          <pre>{`fetch("/api/weather?city=Tehran")
  .then(res => res.json())
  .then(console.log);`}</pre>
        </div>

        {/* Python Example */}
        <div className={styles.codeBlock}>
          <CopyToClipboard
            text={`import requests
res = requests.get("/api/weather?city=Tehran")
print(res.json())`}
            onCopy={() => handleCopy("python")}
          >
            <button className={styles.copyBtn}>
              {copiedId === "python" ? "کپی شد !" : "کپی"}
            </button>
          </CopyToClipboard>
          <pre>{`import requests

res = requests.get("/api/weather?city=Tehran")
print(res.json())`}</pre>
        </div>

        {/* PHP Example */}
        <div className={styles.codeBlock}>
          <CopyToClipboard
            text={`<?php
echo file_get_contents("/api/weather?city=Tehran");
?>`}
            onCopy={() => handleCopy("php")}
          >
            <button className={styles.copyBtn}>
              {copiedId === "php" ? "کپی شد !" : "کپی"}
            </button>
          </CopyToClipboard>
          <pre>{`<?php
  echo file_get_contents("/api/weather?city=Tehran");
?>`}</pre>
        </div>

        <motion.div
          className={styles.tips}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3>نکات سریع</h3>
          <ul>
            <li>نیازی به نصب هیچ کتابخانه‌ای ندارید.</li>
            <li>تمام APIها رایگان و بدون محدودیت هستند.</li>
          </ul>
        </motion.div>
      </section>
    </main>
  );
}
