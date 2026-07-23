import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
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
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
