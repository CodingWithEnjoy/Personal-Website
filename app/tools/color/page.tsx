"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Atmosphere from "@/components/Atmosphere";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type ColorFormat = "hex" | "rgb" | "hsl";

export default function ColorTools() {
  const [input, setInput] = useState("#9ef0ff");
  const [rgb, setRgb] = useState<[number, number, number]>([0, 0, 0]);
  const [hsl, setHsl] = useState<[number, number, number]>([0, 0, 0]);
  const [hex, setHex] = useState("#000000");
  const [copied, setCopied] = useState<ColorFormat | null>(null);

  // Helpers
  function clamp(n: number, min: number, max: number) {
    return Math.min(Math.max(n, min), max);
  }

  function hexToRgb(hex: string): [number, number, number] {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((h) => h + h)
        .join("");
    const int = parseInt(hex, 16);
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
  }

  function rgbToHex([r, g, b]: [number, number, number]) {
    return (
      "#" +
      [r, g, b]
        .map((x) => clamp(x, 0, 255).toString(16).padStart(2, "0"))
        .join("")
    );
  }

  function rgbToHsl([r, g, b]: [number, number, number]): [
    number,
    number,
    number,
  ] {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }

  function hslToRgb([h, s, l]: [number, number, number]): [
    number,
    number,
    number,
  ] {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;
    if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
    else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
    else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
    else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
    else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255),
    ];
  }

  // Update color formats when input changes
  useEffect(() => {
    try {
      let rgbVal: [number, number, number];
      if (input.startsWith("#")) {
        rgbVal = hexToRgb(input);
      } else if (input.startsWith("rgb")) {
        const nums = input.match(/\d+/g)?.map(Number) || [0, 0, 0];
        rgbVal = [nums[0], nums[1], nums[2]];
      } else if (input.startsWith("hsl")) {
        const nums = input.match(/\d+/g)?.map(Number) || [0, 0, 0];
        rgbVal = hslToRgb([nums[0], nums[1], nums[2]]);
      } else {
        rgbVal = [0, 0, 0];
      }
      setRgb(rgbVal);
      setHex(rgbToHex(rgbVal));
      setHsl(rgbToHsl(rgbVal));
    } catch {}
  }, [input]);

  // Copy
  function copy(format: ColorFormat) {
    let val = "";
    if (format === "hex") val = hex;
    if (format === "rgb") val = `rgb(${rgb.join(", ")})`;
    if (format === "hsl") val = `hsl(${hsl.join(", ")})`;
    navigator.clipboard.writeText(val);
    setCopied(format);
    setTimeout(() => setCopied(null), 1200);
  }

  function contrastColor([r, g, b]: [number, number, number]) {
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000" : "#fff";
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
        <h1 className={styles.title}>Color Tools</h1>
        <p className={styles.subtitle}>تبدیل رنگ، بررسی کنتراست و پیش‌نمایش</p>

        {/* Input */}
        <div className={styles.control}>
          <label>رنگ</label>
          <div className={styles.inputRow}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="#9ef0ff, rgb(...), hsl(...)"
            />
            <input
              type="color"
              value={hex}
              onChange={(e) => setInput(e.target.value)}
              title="انتخاب رنگ"
            />
          </div>
        </div>

        {/* Preview */}
        <div
          className={styles.preview}
          style={{ backgroundColor: hex, color: contrastColor(rgb) }}
        >
          پیش‌نمایش
        </div>

        {/* Outputs */}
        <div className={styles.outputs}>
          <div>
            <span>HEX</span>
            <code>{hex}</code>
            <button onClick={() => copy("hex")}>
              {copied === "hex" ? "کپی شد ✓" : "کپی"}
            </button>
          </div>
          <div>
            <span>RGB</span>
            <code>rgb({rgb.join(", ")})</code>
            <button onClick={() => copy("rgb")}>
              {copied === "rgb" ? "کپی شد ✓" : "کپی"}
            </button>
          </div>
          <div>
            <span>HSL</span>
            <code>hsl({hsl.join(", ")})</code>
            <button onClick={() => copy("hsl")}>
              {copied === "hsl" ? "کپی شد ✓" : "کپی"}
            </button>
          </div>
        </div>

        <p className={styles.note}>تمام پردازش‌ها داخل مرورگر انجام می‌شود</p>
      </motion.section>
    </main>
  );
}
