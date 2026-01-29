import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/blog/MDXComponents";
import TagList from "@/components/blog/TagList";
import Atmosphere from "@/components/Atmosphere";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  const { meta, content } = getPostBySlug(slug);

  return (
    <main className={styles.container}>
      <Atmosphere />

      <article className={styles.post}>
        <header className={styles.header}>
          <h1>{meta.title}</h1>
          <p>{meta.description}</p>
          {meta.tags?.length && <TagList tags={meta.tags} />}
        </header>

        <MDXRemote source={content} components={MDXComponents} />
      </article>
    </main>
  );
}
