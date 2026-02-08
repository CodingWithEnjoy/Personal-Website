"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type JWTPart = {
  header: any;
  payload: any;
};

export default function JWTDecoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<JWTPart | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  function base64UrlDecode(str: string) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    const pad = str.length % 4;
    if (pad) str += "=".repeat(4 - pad);
    return decodeURIComponent(escape(window.atob(str)));
  }

  function decodeJWT(value: string) {
    setError(null);
    setDecoded(null);

    const parts = value.split(".");
    if (parts.length !== 3) {
      setError("فرمت JWT معتبر نیست");
      return;
    }

    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      setDecoded({ header, payload });
    } catch {
      setError("امکان Decode این توکن وجود ندارد");
    }
  }

  useEffect(() => {
    if (!token) {
      setDecoded(null);
      setError(null);
      return;
    }
    decodeJWT(token.trim());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function copy(obj: any, label: string) {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    setCopied(label);
    setTimeout(() => setCopied(null), 1200);
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
        <h1 className={styles.title}>JWT Decoder</h1>
        <p className={styles.subtitle}>
          بررسی Header و Payload توکن JWT — بدون اعتبارسنجی امضا
        </p>

        {/* Input */}
        <div className={styles.control}>
          <label>JWT Token</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {/* Output */}
        {decoded && (
          <div className={styles.sections}>
            <section>
              <header>
                <h3>Header</h3>
                <button onClick={() => copy(decoded.header, "header")}>
                  {copied === "header" ? "کپی شد ✓" : "کپی"}
                </button>
              </header>
              <pre>{JSON.stringify(decoded.header, null, 2)}</pre>
            </section>

            <section>
              <header>
                <h3>Payload</h3>
                <button onClick={() => copy(decoded.payload, "payload")}>
                  {copied === "payload" ? "کپی شد ✓" : "کپی"}
                </button>
              </header>
              <pre>{JSON.stringify(decoded.payload, null, 2)}</pre>
            </section>
          </div>
        )}

        <p className={styles.note}>
          این ابزار فقط Decode می‌کند — امضا بررسی نمی‌شود
        </p>
      </motion.section>
    </main>
  );
}
