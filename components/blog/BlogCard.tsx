"use client";

import Link from "next/link";
import { BlogMeta } from "@/lib/blog";
import TagList from "./TagList";
import styles from "./BlogCard.module.css";

export default function BlogCard({ post }: { post: BlogMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={styles.card}
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

      <div className={styles.content}>
        <div className={styles.topMeta}>
          <span className={styles.category}>{post.category}</span>
          {post.readingTime && (
            <span className={styles.readingTime}>{post.readingTime} دقیقه</span>
          )}
        </div>

        <h3 className={styles.title}>{post.title}</h3>

        <p className={styles.description}>{post.description}</p>

        <TagList tags={post.tags} />
      </div>
    </Link>
  );
}
