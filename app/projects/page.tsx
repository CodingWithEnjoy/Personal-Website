"use client";

import styles from "./page.module.css";
import ProjectCard from "@/components/ProjectCard";
import Atmosphere from "@/components/Atmosphere";

const projects = [
  {
    title: "افزونه نوا",
    description:
      "یه افزونه نیو تب مینیمال و کاربردی با کلی فیچر جذاب، الهام گرفته شده از پنجه",
    github: "https://github.com/codingwithenjoy/Minimal-NewTab-Extension",
    image: "/projects/nava.png",
    tech: ["HTML", "CSS", "JS"],
  },
  {
    title: "تحلیل قیمت ارز ها",
    description:
      "ثبت لحظه ای قیمت دلار، سکه، طلا و ... و نمایش بصورت نمودار بصورت روزانه",
    github: "https://github.com/codingwithenjoy/financial-item",
    website: "https://financial-item.netlify.app/",
    image: "/projects/currencies.png",
    tech: ["HTML", "CSS", "JS", "Chart.JS"],
  },
  {
    title: "خبر سه راه",
    description:
      "اولین موتور جستجوی هوشمند اخبار لوازم خانگی همراه با هوش مصنوعی",
    website: "https://3rah.ir/",
    image: "/projects/3rah.png",
    tech: ["PHP", "JS", "Chart.JS"],
  },
];

export default function ProjectsPage() {
  return (
    <main className={styles.container}>
      <Atmosphere />

      <h1 className={styles.title}>پروژه‌ها</h1>
      <div className={styles.grid}>
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </main>
  );
}
