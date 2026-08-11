import type { Metadata } from "next";
import { Cairo, Amiri } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "تطبيق يُسْر (Yusr) | رفيقك اليومي في القرآن والأذكار ومواقيت الصلاة",
  description: "الموقع الرسمي لتطبيق يُسْر (Yusr) - رفيقك اليومي في القرآن والأذكار ومواقيت الصلاة. مصحف إلكتروني كامل، تلاوات نادرة، تفسير، أوقات الصلاة، حاسبة الزكاة، وحصن المسلم.",
  keywords: ["تطبيق يُسْر", "Yusr App", "يُسْر", "تطبيق إسلامي", "القرآن الكريم", "مواقيت الصلاة", "حاسبة الزكاة", "حصن المسلم"],
  icons: {
    icon: "./icon.png",
    apple: "./icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body
        className={`${cairo.variable} ${amiri.variable} antialiased min-h-screen selection:bg-emerald-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
