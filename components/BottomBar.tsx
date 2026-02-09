"use client";

import { usePathname } from "next/navigation";
import styles from "./BottomBar.module.css";
import Link from "next/link";
import { Home, FileText, User, Bookmark } from "lucide-react";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const items: Item[] = [
  { href: "/", label: "خانه", icon: <Home size={18} /> },
  { href: "/projects", label: "پروژه‌ها", icon: <FileText size={18} /> },
  { href: "/about", label: "درباره من", icon: <User size={18} /> },
  { href: "/blog", label: "بلاگ", icon: <Bookmark size={18} /> },
];

export default function BottomBar() {
  const pathname = usePathname();

  return (
    <div className={styles.bar}>
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.item} ${isActive ? styles.active : ""}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
