import { NextResponse } from "next/server";

/* ----------------------------------
   Utilities
---------------------------------- */

const div = (a: number, b: number) => Math.floor(a / b);

const WEEKDAYS_EN = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WEEKDAYS_FA = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

const WEEKDAYS_AR = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

/* ----------------------------------
   Gregorian
---------------------------------- */

const GREGORIAN_MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const GREGORIAN_MONTHS_FA = [
  "ژانویه",
  "فوریه",
  "مارس",
  "آوریل",
  "مه",
  "ژوئن",
  "ژوئیه",
  "اوت",
  "سپتامبر",
  "اکتبر",
  "نوامبر",
  "دسامبر",
];

function getGregorian(date: Date) {
  const dayIndex = date.getUTCDay();
  const monthIndex = date.getUTCMonth();

  return {
    year: date.getUTCFullYear(),
    month: monthIndex + 1,
    day: date.getUTCDate(),
    monthName: {
      en: GREGORIAN_MONTHS_EN[monthIndex],
      fa: GREGORIAN_MONTHS_FA[monthIndex],
    },
    weekday: {
      en: WEEKDAYS_EN[dayIndex],
    },
  };
}

/* ----------------------------------
   Jalali (Shamsi) – Accurate
---------------------------------- */

const SHAMSI_MONTHS_FA = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const SHAMSI_MONTHS_EN = [
  "Farvardin",
  "Ordibehesht",
  "Khordad",
  "Tir",
  "Mordad",
  "Shahrivar",
  "Mehr",
  "Aban",
  "Azar",
  "Dey",
  "Bahman",
  "Esfand",
];

function gregorianToJalali(gy: number, gm: number, gd: number) {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy = gy <= 1600 ? 0 : 979;
  gy -= gy <= 1600 ? 621 : 1600;

  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    365 * gy +
    div(gy2 + 3, 4) -
    div(gy2 + 99, 100) +
    div(gy2 + 399, 400) -
    80 +
    gd +
    g_d_m[gm - 1];

  jy += 33 * div(days, 12053);
  days %= 12053;
  jy += 4 * div(days, 1461);
  days %= 1461;

  if (days > 365) {
    jy += div(days - 1, 365);
    days = (days - 1) % 365;
  }

  const jm = days < 186 ? 1 + div(days, 31) : 7 + div(days - 186, 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);

  return { year: jy, month: jm, day: jd };
}

/* ----------------------------------
   Hijri (Civil / Tabular) – Approx
---------------------------------- */

const HIJRI_MONTHS_AR = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

const HIJRI_MONTHS_EN = [
  "Muharram",
  "Safar",
  "Rabi al-Awwal",
  "Rabi al-Thani",
  "Jumada al-Ula",
  "Jumada al-Thaniyah",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qadah",
  "Dhu al-Hijjah",
];

function gregorianToHijri(gy: number, gm: number, gd: number) {
  const jd =
    div(1461 * (gy + 4800 + div(gm - 14, 12)), 4) +
    div(367 * (gm - 2 - 12 * div(gm - 14, 12)), 12) -
    div(3 * div(gy + 4900 + div(gm - 14, 12), 100), 4) +
    gd -
    32075;

  const l = jd - 1948440 + 10632;
  const n = div(l - 1, 10631);
  const l2 = l - 10631 * n + 354;
  const j =
    div(10985 - l2, 5316) * div(50 * l2, 17719) +
    div(l2, 5670) * div(43 * l2, 15238);
  const l3 =
    l2 -
    div(30 - j, 15) * div(17719 * j, 50) -
    div(j, 16) * div(15238 * j, 43) +
    29;

  const hm = div(24 * l3, 709);
  const hd = l3 - div(709 * hm, 24);
  const hy = 30 * n + j - 30;

  return { year: hy, month: hm, day: hd };
}

/* ----------------------------------
   Chinese Lunar – Approx
---------------------------------- */

function chineseZodiac(year: number) {
  const animals = [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
  ];
  return animals[(year - 4) % 12];
}

/* ----------------------------------
   API Route
---------------------------------- */

export async function GET() {
  const now = new Date();
  const weekdayIndex = now.getUTCDay();

  const gregorian = getGregorian(now);

  const shamsiRaw = gregorianToJalali(
    gregorian.year,
    gregorian.month,
    gregorian.day,
  );

  const hijriRaw = gregorianToHijri(
    gregorian.year,
    gregorian.month,
    gregorian.day,
  );

  return NextResponse.json({
    meta: {
      source: "pure-algorithm",
      advanced: true,
      accuracy: {
        gregorian: "exact",
        shamsi: "exact",
        hijri: "approximate (civil)",
        chinese: "approximate",
      },
    },
    timestamp: now.getTime(),

    gregorian,

    shamsi: {
      ...shamsiRaw,
      monthName: {
        fa: SHAMSI_MONTHS_FA[shamsiRaw.month - 1],
        en: SHAMSI_MONTHS_EN[shamsiRaw.month - 1],
      },
      weekday: {
        fa: WEEKDAYS_FA[weekdayIndex],
        en: WEEKDAYS_EN[weekdayIndex],
      },
    },

    hijri: {
      ...hijriRaw,
      monthName: {
        ar: HIJRI_MONTHS_AR[hijriRaw.month - 1],
        en: HIJRI_MONTHS_EN[hijriRaw.month - 1],
      },
      weekday: {
        ar: WEEKDAYS_AR[weekdayIndex],
        en: WEEKDAYS_EN[weekdayIndex],
      },
    },

    chinese: {
      lunarYear: gregorian.year - 2697,
      zodiac: chineseZodiac(gregorian.year),
    },
  });
}
