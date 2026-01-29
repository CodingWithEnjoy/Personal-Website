import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_PATH = path.join(process.cwd(), "content/blog");

export type BlogMeta = {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  cover?: string;
  readingTime?: number;
  slug: string;
};

export function getAllPosts(): BlogMeta[] {
  const files = fs.readdirSync(BLOG_PATH);

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const filePath = path.join(BLOG_PATH, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);

      return {
        ...(data as Omit<BlogMeta, "slug">),
        slug,
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string) {
  const mdxPath = path.join(BLOG_PATH, `${slug}.mdx`);
  const mdPath = path.join(BLOG_PATH, `${slug}.md`);

  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fullPath || !fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: data,
    content,
  };
}
