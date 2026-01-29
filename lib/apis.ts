export type Language = "js" | "python" | "php";

export interface API {
  slug: string;
  title: string;
  description: string;
  endpoint: string;
  examples: Record<Language, string>;
  response: string;
}

export const APIs: API[] = [
  {
    slug: "weather",
    title: "آب و هوا",
    description: "وضعیت هوا، دما، رطوبت و پیش‌بینی روز های آینده، قدرت گرفته از api دستیار (شهر های تهران، مشهد، شیراز، اصفهان و تبریز)",
    endpoint: "/api/v1/weather?city=Tehran",
    examples: {
      js: `fetch("/api/v1/weather?city=Tehran").then(r => r.json()).then(console.log);`,
      python: `import requests

print(requests.get("/api/v1/weather?city=Tehran").json())`,
      php: `<?php echo file_get_contents("/api/v1/weather?city=Tehran"); ?>`,
    },
    response: `{
  "meta": {
    "source": "dastyar.io",
    "city": "Tehran",
    "fetchedAt": "2026-01-29T10:55:52.411Z",
    "type": "api",
    "count": 6
  },
  "current": {
    "date": "2026-01-29",
    "dateTitle": "امروز",
    "temp": {
      "current": 11.4,
      "min": 8.65,
      "max": 11.58
    },
    "weather": {
      "id": 802,
      "main": "Clouds",
      "description": "scattered clouds",
      "icon": "03d"
    },
    "customDescription": {
      "text": "آفتاب دلنشینه",
      "emoji": "☀️"
    },
    "colors": {
      "background": "linear-gradient(10deg, #DADDE5 6.5%, #F3F3F5 70%)",
      "text": "#6C737F"
    }
  },
  "forecast": [
    {
      "date": "2026-01-30",
      "dateTitle": "جمعه ۱۰",
      "temp": {
        "min": 4.12,
        "max": 9.51,
        "current": null
      },
      "weather": {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      },
      "customDescription": null,
      "colors": {
        "background": null,
        "text": null
      }
    },
    ...`,
  },
  {
    slug: "ip",
    title: "اطلاعات IP",
    description: "موقعیت و اطلاعات IP، قدرت گرفته از CloudFlare",
    endpoint: "/api/v1/ip",
    examples: {
      js: `fetch("/api/v1/ip").then(r => r.json()).then(console.log);`,
      python: `import requests

print(requests.get("/api/v1/ip").json())`,
      php: `<?php echo file_get_contents("/api/v1/ip"); ?>`,
    },
    response: `{
  "ip": "8.8.8.8",
  "colo": "FRA",
  "loc": "IR",
  "tls": "TLSv1.3",
  "scheme": "https",
  "userAgent": "node",
  "http": "http/1.1",
  "warp": false,
  "sni": "plaintext",
  "gateway": false,
  "rbi": false,
  "kex": "X25519MLKEM768",
  "fl": "71f1428",
  "host": "www.cloudflare.com",
  "ts": 1769684438.624
}`,
  },
  {
    slug: "currency",
    title: "نرخ ارز، طلا و سکه",
    description: "نرخ ارز، طلا و سکه و از این قبیل چیز ها، قدرت گرفته از api دستیار - همچنین میتونید با استفاده از کوئری q={key} هر کدوم از قیمت هایی رو که نیاز دارید بصورت جداگونه نشون بدید، با استفاده از کاما (,) چندتا رو همزمان نشون بدید",
    endpoint: "/api/v1/currency",
    examples: {
      js: `fetch("/api/v1/currency").then(r => r.json()).then(console.log);`,
      python: `import requests

print(requests.get("/api/v1/currency").json())`,
      php: `<?php echo file_get_contents("/api/v1/currency"); ?>`,
    },
    response: `{
  "meta": {
    "source": "dastyar.io",
    "fetchedAt": "2026-01-29T11:02:10.364Z",
    "count": 14
  },
  "data": [
    {
      "key": "usd_btc",
      "price": "87900",
      "priceFloat": 87900,
      "change": "0",
      "title": "بیت کوین",
      "enTitle": "Bitcoin",
      "category": "crypto",
      "currency": "$",
      "image": "btc.svg",
      "link": "https://link.dastyar.io/widget-wallex-btc",
      "icon": "https://liara-s3.dastyar.io/Img/icons/finance/btc.svg",
      "sortOrder": 1
    },
    {
      "key": "usd_eth",
      "price": "2943",
      "priceFloat": 2943,
      "change": "0",
      "title": "اتریوم",
      "enTitle": "Ethereum",
      "category": "crypto",
      "currency": "$",
      "image": "eth.svg",
      "link": "https://link.dastyar.io/widget-wallex-eth",
      "icon": "https://liara-s3.dastyar.io/Img/icons/finance/eth.svg",
      "sortOrder": 2
    },
    ...`,
  },
  {
    slug: "gold",
    title: "قیمت شمش پامپ",
    description: "قیمت انواع شمش پامپ سوئیس، قدرت گرفته از فروشگاه zcoinn",
    endpoint: "/api/v1/pamp",
    examples: {
      js: `fetch("/api/v1/pamp").then(r => r.json()).then(console.log);`,
      python: `import requests

print(requests.get("/api/v1/pamp").json())`,
      php: `<?php echo file_get_contents("/api/v1/pamp"); ?>`,
    },
    response: `{
  "meta": {
    "source": "zcoinn.com",
    "category": "gold-bar",
    "brand": "PAMP",
    "fetchedAt": "2026-01-29T11:05:59.498Z",
    "count": 9,
    "type": "scraped"
  },
  "items": [
    {
      "name": "شمش طلا 1 گرمی سوئیسی پمپ",
      "weightGram": 1,
      "price": 33100000,
      "currency": "IRR_TOMAN",
      "priceText": "33,100,000 تومان",
      "link": "https://zcoinn.com/bullion_order/",
      "image": "https://zcoinn.com/wp-content/uploads/2022/08/1g-blue-copy.webp"
    },
    {
      "name": "شمش طلا 2.5 گرمی سوئیسی پمپ",
      "weightGram": 2.5,
      "price": 78640000,
      "currency": "IRR_TOMAN",
      "priceText": "78,640,000 تومان",
      "link": "https://zcoinn.com/bullion_order/",
      "image": "https://zcoinn.com/wp-content/uploads/2022/08/2.5-blue-copy.webp"
    },
    {
      "name": "شمش طلا 5 گرمی سوئیسی پمپ",
      "weightGram": 5,
      "price": 150390000,
      "currency": "IRR_TOMAN",
      "priceText": "150,390,000 تومان",
      "link": "https://zcoinn.com/bullion_order/",
      "image": "https://zcoinn.com/wp-content/uploads/2022/08/5g-blue-copy.webp"
    },
    ...`,
  },
  {
    slug: "aqi",
    title: "کیفیت هوا (AQI)",
    description: "شاخص کیفیت هوا، قدرت گرفته از IQAir (شهر های تهران، مشهد، شیراز، اصفهان و تبریز)",
    endpoint: "/api/v1/aqi?city=Tehran",
    examples: {
      js: `fetch("/api/v1/aqi?city=Tehran").then(r => r.json()).then(console.log);`,
      python: `import requests
      
print(requests.get("/api/v1/aqi?city=Tehran").json())`,
      php: `<?php echo file_get_contents("/api/v1/aqi?city=Tehran"); ?>`,
    },
    response: `{
  "meta": {
    "source": "iqair.com",
    "city": "Tehran",
    "country": "IR",
    "fetchedAt": "2026-01-29T11:10:24.709Z",
    "type": "scraped"
  },
  "aqi": 98,
  "level": "Moderate",
  "status": "Moderate",
  "mainPollutant": "PM2.5",
  "pollutantValue": "34.5 µg/m³",
  "weather": {
    "temperature": "10°",
    "wind": "11.1 km/h",
    "humidity": "32 %"
  }
}`,
  },
  {
    slug: "date",
    title: "تاریخ",
    description: "تاریخ شمسی، قمری، میلادی و چینی",
    endpoint: "/api/v1/date",
    examples: {
      js: `fetch("/api/v1/date").then(r => r.json()).then(console.log);`,
      python: `import requests

print(requests.get("/api/v1/date").json())`,
      php: `<?php echo file_get_contents("/api/v1/date"); ?>`,
    },
    response: `{
  "meta": {
    "source": "pure-algorithm",
    "advanced": true,
    "accuracy": {
      "gregorian": "exact",
      "shamsi": "exact",
      "hijri": "approximate (civil)",
      "chinese": "approximate"
    }
  },
  "timestamp": 1769685047547,
  "gregorian": {
    "year": 2026,
    "month": 1,
    "day": 29,
    "monthName": {
      "en": "January",
      "fa": "ژانویه"
    },
    "weekday": {
      "en": "Thursday"
    }
  },
  "shamsi": {
    "year": 1404,
    "month": 11,
    "day": 9,
    "monthName": {
      "fa": "بهمن",
      "en": "Bahman"
    },
    "weekday": {
      "fa": "پنجشنبه",
      "en": "Thursday"
    }
  },
  ...`,
  },
  {
    slug: "encode",
    title: "رمزگذاری و رمزنگاری",
    description: "رمزگذاری و رمزنگاری (تایپ های مجاز => base64-encode - base64-decode - hex-encode - hex-decode - sha256 - url-encode - url-decode)",
    endpoint: "/api/v1/encode?type={type}&text={text}",
    examples: {
      js: `fetch("/api/v1/encode?type=base64-encode&text=Hello").then(r => r.json()).then(console.log);

fetch("/api/v1/encode?type=base64-decode&text=SGVsbG8=").then(r => r.json()).then(console.log);`,
      python: `import requests
      
print(requests.get("/api/v1/encode?type=base64-encode&text=Hello").json())
print(requests.get("/api/v1/encode?type=base64-decode&text=SGVsbG8=").json())`,
      php: `<?php echo file_get_contents("/api/v1/encode?type=base64-encode&text=Hello"); ?>

<?php echo file_get_contents("/api/v1/encode?type=base64-decode&text=SGVsbG8="); ?>`,
    },
    response: `{
  "type": "base64-encode",
  "input": "Hello",
  "result": "SGVsbG8="
}

--------------------

{
  "type": "base64-decode",
  "input": "SGVsbG8=",
  "result": "Hello"
}`,
  },
];
