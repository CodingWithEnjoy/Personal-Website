import type { Metadata } from "next";
import "./globals.css";
import BottomBar from "../components/BottomBar"; // adjust path if needed

export const metadata: Metadata = {
  title: "امیرمسعود — وبسایت شخصی",
  description: "وبسایت پروژه‌ها و آثار امیرمسعود",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}

        <BottomBar />
      </body>
    </html>
  );
}
