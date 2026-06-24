import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SpaceBackground from "@/components/SpaceBackground";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { DEFAULT_LANG, LANG_COOKIE, isLang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/translations";

const inter = Inter({ subsets: ["latin"] });

async function getLang() {
  const cookieStore = await cookies();
  const stored = cookieStore.get(LANG_COOKIE)?.value;
  return isLang(stored) ? stored : DEFAULT_LANG;
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const { meta } = getDictionary(lang);

  return {
    title: meta.title,
    description: meta.description,
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export const viewport: Viewport = {
  themeColor: "#010D1E",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <SpaceBackground />
        <LanguageProvider initialLang={lang}>
          <Navbar />
          {children}
          <Footer />
          <ScrollReveal />
        </LanguageProvider>
      </body>
    </html>
  );
}
