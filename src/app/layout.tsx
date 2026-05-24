import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "ADVVVV11 | منصة مراجعات الحادي عشر متقدم الفصل الثالث",
  description: "أفضل منصة مراجعات للصف الحادي عشر ADV في الإمارات — هياكل، مراجعات، أسئلة وزارية، ملفات شرح، وفيديوهات منظمة حسب الدروس.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased">
        <AppProvider>
          <Header />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
