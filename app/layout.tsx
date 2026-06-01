import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "논문 가이드 | 대학원생을 위한 학술 논문 작성 가이드",
  description: "논문 작성법을 모르는 대학원생을 위한 단계별 가이드, 학술 표현, 템플릿, AI 피드백",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#f8f7f4] text-[#1a1a2e]">
        <NavBar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
