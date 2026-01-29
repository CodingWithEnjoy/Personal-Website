"use client";

import Link from "next/link";
import { BlogMeta } from "@/lib/blog";
import styles from "./FeaturedPost.module.css";

export default function FeaturedPost({ post }: { post: BlogMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={styles.featured}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.removeProperty("--x");
        e.currentTarget.style.removeProperty("--y");
      }}
    >
      <div className={styles.glow} />

      <span className={styles.badge}>ویژه</span>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </Link>
  );
}
