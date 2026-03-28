import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Aastha Education Consultancy — Shape Your Future",
  description: "Aastha Education Consultancy — specialists in career counseling and direct admission to India's top colleges. 20+ years of turning student dreams into reality. Explore careers in Engineering, Medical, Management, and more.",
  keywords: "education consultancy, career counseling, admissions, Jamshedpur, AEC, Aastha Education, college admission, Engineering, Medical, MBBS, MBA",
  authors: [{ name: "Aastha Education Consultancy" }],
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${jakarta.variable}`}>
        {children}
      </body>
    </html>
  );
}
