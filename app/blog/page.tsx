import styles from "./page.module.css";
import { getAllPosts } from "@/lib/blog";
import BlogGrid from "@/components/blog/BlogGrid";
import FeaturedPost from "@/components/blog/FeaturedPost";
import Atmosphere from "@/components/Atmosphere";

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured);

  return (
    <main className={styles.container}>
      <Atmosphere />

      <div className={styles.content}>
        <header className={styles.header}>
          <h1>وبلاگ من</h1>
          <p>اینجا نوشته های خودم راجع به چیزای مختلف رو منتشر میکنم</p>
        </header>

        {featured && <FeaturedPost post={featured} />}

        <BlogGrid posts={posts} />
      </div>
    </main>
  );
}
