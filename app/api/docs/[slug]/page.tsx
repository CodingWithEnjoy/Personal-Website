"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "../page.module.css";
import Atmosphere from "@/components/Atmosphere";
import { APIs, Language } from "@/lib/apis";

const languages: Language[] = ["js", "python", "php"];

export default function ApiPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const api = APIs.find((a) => a.slug === slug);
  const pathname = usePathname();

  const [activeLang, setActiveLang] = useState<Language>("js");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!api) return null;

  const copy = (id: string) => {
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
          <li className={styles.apiItem}>
            <Link
              href={`/api/docs`}
              className={pathname === `/api/docs` ? styles.active : ""}
            >
              شروع کار
            </Link>
          </li>
          {APIs.map((a) => (
            <li key={a.slug} className={styles.apiItem}>
              <Link
                href={`/api/docs/${a.slug}`}
                className={
                  pathname === `/api/docs/${a.slug}` ? styles.active : ""
                }
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </motion.aside>

      <section className={styles.content}>
        <h1 className={styles.endpoint}>{api.endpoint}</h1>
        <p className={styles.description}>{api.description}</p>

        <div className={styles.codeTabs}>
          <div className={styles.tabHeaders}>
            {languages.map((lang) => (
              <button
                key={lang}
                className={activeLang === lang ? styles.activeTab : ""}
                onClick={() => setActiveLang(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <div className={styles.codeBlock}>
            <CopyToClipboard
              text={api.examples[activeLang]}
              onCopy={() => copy("example")}
            >
              <button className={styles.copyBtn}>
                {copiedId === "example" ? "کپی شد !" : "کپی"}
              </button>
            </CopyToClipboard>
            <pre>{api.examples[activeLang]}</pre>
          </div>
        </div>

        <div className={styles.codeBlock}>
          <CopyToClipboard text={api.response} onCopy={() => copy("response")}>
            <button className={styles.copyBtn}>
              {copiedId === "response" ? "کپی شد !" : "کپی"}
            </button>
          </CopyToClipboard>
          <pre>{api.response}</pre>
        </div>
      </section>
    </main>
  );
}
