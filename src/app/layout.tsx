import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TypeScript Academy | 타입스크립트를 제대로 이해하는 방법",
  description: "추상적인 타입 시스템을 시각화와 실습으로 완전히 정복하세요. React, Next.js 실무 패턴까지 한 번에 배우는 TypeScript 교육 사이트입니다.",
  keywords: ["TypeScript", "타입스크립트", "React", "Next.js", "프론트엔드", "개발 교육"],
  authors: [{ name: "TypeScript Academy" }],
  openGraph: {
    title: "TypeScript Academy",
    description: "추상적인 타입 시스템을 시각화와 실습으로 완전히 정복하세요",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
