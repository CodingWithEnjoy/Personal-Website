"use client";

import Link from "next/link";
import styles from "./not-found.module.css";
import Atmosphere from "@/components/Atmosphere";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <Atmosphere />

      <div className={styles.card}>
        <div className={styles.code}>404</div>

        <p className={styles.text}>
          به نظر میاد وارد یه جای اشتباه شدی.
          <br />
          این صفحه یا وجود نداره، یا تصمیم گرفته ناپدید بشه.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            برگردیم خونه
          </Link>

          <Link href="/projects" className={styles.ghost}>
            پروژه‌ها رو ببین
          </Link>
        </div>

        <p className={styles.small}>
          اگه مطمئنی این صفحه باید وجود داشته باشه، احتمالاً باگ نیست — فقط
          واقعیت یه کم بهم ریخته.
        </p>
      </div>
    </main>
  );
}
