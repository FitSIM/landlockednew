import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { ApolloProvider } from "@/contexts/ApolloContext";
import MotionProvider from "@/components/motion/MotionProvider";
import ViewportZoom from "@/components/motion/ViewportZoom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import mnMessages from "@/../messages/mn.json";
import enMessages from "@/../messages/en.json";

const messagesByLocale: Record<string, Record<string, unknown>> = {
  mn: mnMessages,
  en: enMessages,
};

export const metadata: Metadata = {
  title: "Далайд гарцгүй хөгжиж буй орнуудын олон улсын судалгааны төв",
  description:
    "LLDC - Олон улсын судалгааны төв нь далайд гарцгүй хөгжиж буй орнуудын тогтвортой хөгжил, худалдаа, дэд бүтцийн холболтыг дэмжихэд чиглэгдсэн бодлогын судалгаа, мэдээллийн төв байна.",
};

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = messagesByLocale[locale] ?? messagesByLocale.en;

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ApolloProvider>
            <MotionProvider>
              <div className="flex min-h-screen flex-col">
                <Header locale={locale} />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </MotionProvider>
          </ApolloProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
