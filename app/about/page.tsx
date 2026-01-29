"use client";

import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";
import Image from "next/image";

export default function About() {
  return (
    <main className={styles.container}>
      <Atmosphere />

      <section className={styles.card}>
        {/* ===== LEFT ===== */}
        <div className={styles.left}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/me.jpg"
              alt="Amirmasoud"
              fill
              className={styles.image}
              priority
            />
          </div>
        </div>

        {/* ===== RIGHT ===== */}
        <div className={styles.right}>
          <h1 className={styles.title}>امیرمسعود عابدی</h1>
          <p className={styles.tagline}>
            برنامه‌نویس • طراح سیستم • سازنده تجربه‌های دیجیتال
          </p>

          {/* BIO */}
          <p className={styles.bio}>
            من امیرمسعودم. برنامه‌نویسی برای من فقط نوشتن کد نیست؛ راهیه برای
            ساختن سیستم‌هایی که تمیز، قابل اعتماد و گاهی هم کمی عجیبن.
          </p>

          {/* EDUCATION */}
          <div className={styles.section}>
            <h3>تحصیلات</h3>
            <p>
              دانش آموز رشته ریاضی - فیزیک 🎓
              <br />
              دبیرستان علامه حلی 4 - کلاس یازدهم
            </p>
          </div>

          {/* TECH STACK */}
          <div className={styles.section}>
            <h3>تکنولوژی‌ها</h3>
            <div className={styles.techs}>
              <span>JavaScript</span>
              <span>TypeScript</span>
              <span>React</span>
              <span>Next.js</span>
              <span>Node.js</span>
              <span>HTML / CSS</span>
              <span>Tailwind</span>
              <span>Git</span>
              <span>REST APIs</span>
            </div>
          </div>

          {/* WHAT I DO */}
          <div className={styles.section}>
            <h3>کاری که انجام می‌دم</h3>
            <ul className={styles.list}>
              <li>طراحی و پیاده‌سازی وب‌اپلیکیشن‌های مدرن</li>
              <li>ساخت UI/UX تمیز و مینیمال</li>
              <li>طراحی ساختار پروژه و معماری فرانت‌اند</li>
              <li>ساخت پروژه‌های خاص و شخصی</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
