"use client";

import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

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

export default function ToolsLanding() {
  const toolsRef = useRef<HTMLElement | null>(null);

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
          ابزارهای هوشمند برای کارهای روزمره
          <span className={styles.titleLine} />
        </motion.h1>

        <motion.p variants={fadeUp} className={styles.subtitle}>
          مجموعه‌ای از ابزارهای سریع، امن و کاربردی — بدون ثبت‌نام، بدون تبلیغ،
          فقط ابزارهایی که واقعاً به درد می‌خورن.
        </motion.p>

        <motion.div variants={fadeUp} className={styles.actions}>
          <button
            className={styles.primaryBtn}
            onClick={() =>
              toolsRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            مشاهده ابزارها
          </button>
          <Link href="/" className={styles.secondaryBtn}>
            برگشت به خانه
          </Link>
        </motion.div>
      </motion.section>

      {/* ===== TOOLS ===== */}
      <motion.section
        ref={toolsRef}
        className={styles.tools}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className={styles.sectionTitle}>
          ابزارها
          <span className={styles.sectionLine} />
        </motion.h2>

        <motion.div className={styles.toolGrid} variants={stagger}>
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              className={styles.toolCard}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <Link href={`/tools/${tool.slug}`} className={styles.toolLink}>
                <h3>{tool.name}</h3>
                <p>{tool.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ===== VALUES ===== */}
      <motion.section
        className={styles.infra}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className={styles.stat}>
          <span>Privacy</span>
          <strong>Local</strong>
        </motion.div>
        <motion.div variants={fadeUp} className={styles.stat}>
          <span>Speed</span>
          <strong>Instant</strong>
        </motion.div>
        <motion.div variants={fadeUp} className={styles.stat}>
          <span>Cost</span>
          <strong>Free</strong>
        </motion.div>
      </motion.section>

      <motion.p
        className={styles.footerNote}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        ساخته‌شده توسط امیرمسعود — ابزار خوب یعنی ساده
      </motion.p>
    </main>
  );
}

const tools = [
  {
    name: "Password Generator",
    slug: "passgen",
    desc: "تولید رمز عبور امن با تنظیمات دلخواه",
  },
  {
    name: "Hash Generator",
    slug: "hashgen",
    desc: "تبدیل متن به MD5، SHA-1، SHA-256 و بیشتر",
  },
  {
    name: "Base64 Encoder",
    slug: "base64",
    desc: "Encode و Decode سریع متون و فایل‌ها",
  },
  {
    name: "JWT Decoder",
    slug: "jwt",
    desc: "بررسی و Decode توکن‌های JWT",
  },
  {
    name: "UUID Generator",
    slug: "uuid",
    desc: "ساخت UUID نسخه‌های مختلف",
  },
  {
    name: "Text Formatter",
    slug: "textfmt",
    desc: "فرمت، تمیزسازی و تبدیل متون",
  },
  {
    name: "Color Tools",
    slug: "color",
    desc: "تبدیل HEX، RGB، HSL و بررسی کنتراست",
  },
  {
    name: "JSON Formatter",
    slug: "json",
    desc: "فرمت و اعتبارسنجی JSON به صورت زنده",
  },
  {
    name: "Lorem Ipsum Generator",
    slug: "lorem",
    desc: "تولید متن نمونه انگلیسی و فارسی",
  },
];
