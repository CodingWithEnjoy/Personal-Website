"use client";

import { BlogMeta } from "@/lib/blog";
import BlogCard from "./BlogCard";
import styles from "./BlogGrid.module.css";
import { useEffect, useState } from "react";

type Props = {
  posts: BlogMeta[];
};

export default function BlogGrid({ posts }: Props) {
  // Control when cards should animate in
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150); // slight delay
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={styles.grid}>
      {posts.map((post, index) => (
        <div
          key={post.slug}
          className={`${styles.cardWrapper} ${loaded ? styles.show : ""}`}
          style={{ transitionDelay: `${index * 0.08}s` }}
        >
          <BlogCard post={post} />
        </div>
      ))}
    </section>
  );
}
