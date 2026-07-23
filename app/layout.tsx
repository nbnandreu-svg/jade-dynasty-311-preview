import type { Metadata } from "next";
import "./globals.css";
import { siteBasePath } from "./sitePaths";

const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://jade-dynasty-311-preview.nbnandreu.chatgpt.site";
const imageUrl = `${siteOrigin}${siteBasePath}/og.png`;

export const metadata: Metadata = {
  title: "Jade Dynasty 3.1.1 — Навстречу небесам",
  description: "Jade Dynasty 3.1.1: восточная MMORPG, подтверждённые параметры сервера, 12 классов и короткий путь к началу игры.",
  openGraph: {
    title: "Jade Dynasty 3.1.1",
    description: "Восточная MMORPG о пути героя, развитии персонажа и приключениях вместе с другими игроками.",
    images: [{ url: imageUrl, width: 1200, height: 630, alt: "Jade Dynasty — Навстречу небесам" }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jade Dynasty 3.1.1",
    description: "Версия 3.1.1, 160 РБ, две расы и 12 классов.",
    images: [imageUrl],
  },
  icons: {
    icon: `${siteBasePath}/favicon.svg`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
