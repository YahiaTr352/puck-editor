import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "اختباري · Examy — منصة الذكاء الاصطناعي للاختبارات",
  description: "منصة ذكاء اصطناعي تُولّد الاختبارات وتُديرها وتُحلّل نتائجها — مرتبطة بنواتج التعلم ومستويات بلوم، تختصر ساعاتٍ من الإعداد إلى دقائق.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col" data-theme="dark" data-anims="on">
        {children}
      </body>
    </html>
  );
}
