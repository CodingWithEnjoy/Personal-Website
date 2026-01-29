"use client";

import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function ApiLanding() {
  return (
    <main className={styles.container} dir="rtl">
      <Atmosphere />

      {/* ===== HERO ===== */}
      <motion.section
        className={styles.hero}
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.h1 variants={fadeUp} className={styles.title}>
          API های عمومی برای پروژه‌های واقعی
          <span className={styles.titleLine} />
        </motion.h1>

        <motion.p variants={fadeUp} className={styles.subtitle}>
          مجموعه‌ای از API های سریع، ساده و قابل اعتماد — بدون ثبت‌نام، بدون
          پیچیدگی، آماده برای استفاده.
        </motion.p>

        <motion.div variants={fadeUp} className={styles.actions}>
          <Link href="/api/docs" className={styles.primaryBtn}>
            مستندات
          </Link>
          <Link href="/api/playground" className={styles.secondaryBtn}>
            تست API
          </Link>
        </motion.div>
      </motion.section>

      {/* ===== APIS ===== */}
      <motion.section
        className={styles.apis}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className={styles.sectionTitle}>
          API ها
          <span className={styles.sectionLine} />
        </motion.h2>

        <motion.div className={styles.apiGrid} variants={stagger}>
          {apis.map((api) => (
            <motion.div
              key={api.name}
              className={styles.apiCard}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <h3>{api.name}</h3>
              <p>{api.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ===== INFRA ===== */}
      <motion.section
        className={styles.infra}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className={styles.stat}>
          <span>Latency</span>
          <strong>&lt; 80ms</strong>
        </motion.div>
        <motion.div variants={fadeUp} className={styles.stat}>
          <span>Uptime</span>
          <strong>99.9%</strong>
        </motion.div>
        <motion.div variants={fadeUp} className={styles.stat}>
          <span>Access</span>
          <strong>Public</strong>
        </motion.div>
      </motion.section>

      <motion.p
        className={styles.footerNote}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        ساخته‌شده توسط امیرمسعود — API ها باید ساده باشن
      </motion.p>
    </main>
  );
}

const apis = [
  { name: "Weather API", desc: "وضعیت هوا و پیش‌بینی" },
  { name: "IP Info", desc: "اطلاعات IP و موقعیت" },
  { name: "Currency Prices", desc: "نرخ ارز و کریپتو" },
  { name: "Pamp Gold Bar Prices", desc: "قیمت شمش پامپ" },
  { name: "Air Quality (AQI)", desc: "شاخص کیفیت هوا" },
  { name: "Date", desc: "تاریخ شمسی، قمری، میلادی و چینی" },
  { name: "Encode & Decode", desc: "رمزگذاری و رمزنگاری متون" },
];
