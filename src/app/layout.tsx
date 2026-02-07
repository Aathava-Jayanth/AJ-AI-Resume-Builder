import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AJ AI Resume Builder',
  description: 'Craft a professional, high-impact resume in minutes. Powered by Tambo AI to transform your raw experience into a polished career document.',
  icons: {
    icon: '/Octo-Icon.svg', // Reference the file in the /public directory
    apple: '/Octo-Icon.svg',
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
