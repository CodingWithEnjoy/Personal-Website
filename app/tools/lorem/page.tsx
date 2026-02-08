"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Sample Persian lorem
const persianLorem = `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`;

export default function LoremIpsumTool() {
  const [count, setCount] = useState(3);
  const [language, setLanguage] = useState<"en" | "fa">("en");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const englishLorem = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.`;

  function generateLorem() {
    const base = language === "en" ? englishLorem : persianLorem;
    setOutput(Array(count).fill(base).join("\n\n"));
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
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
        <h1 className={styles.title}>Lorem Ipsum Generator</h1>
        <p className={styles.subtitle}>تولید متن نمونه به انگلیسی یا فارسی</p>

        {/* Settings */}
        <div className={styles.control}>
          <label>تعداد پاراگراف‌ها</label>
          <input
            type="number"
            value={count}
            min={1}
            max={20}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>

        <div className={styles.control}>
          <label>زبان</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "fa")}
          >
            <option value="en">انگلیسی</option>
            <option value="fa">فارسی</option>
          </select>
        </div>

        <div className={styles.actionsRow}>
          <button onClick={generateLorem}>تولید متن</button>
          <button onClick={copyOutput} disabled={!output}>
            {copied ? "کپی شد ✓" : "کپی خروجی"}
          </button>
        </div>

        {output && (
          <div className={styles.output}>
            <pre>{output}</pre>
          </div>
        )}
      </motion.section>
    </main>
  );
}
