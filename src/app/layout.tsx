import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dive Into LLMs — Образовательная AI-платформа",
  description: "Интерактивная платформа для изучения Large Language Models, Prompt Engineering, RAG, MCP, AI Agents и современного AI-стека.",
  keywords: ["LLM", "AI", "Prompt Engineering", "RAG", "MCP", "AI Agents", "обучение"],
  authors: [{ name: "AZAR" }],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* ADMIN Panel Analytics Tracker */}
        <Script id="admin-panel-tracker" strategy="afterInteractive">
          {`window.AdminPanelTracker = {
            endpoint: 'https://my-project-black-iota.vercel.app/api/track',
            projectId: 'https-dive-into-llms-vercel-app',
            projectName: 'dive-into-llms'
          };`}
        </Script>
        <Script
          src="https://my-project-black-iota.vercel.app/tracker/tracker.js"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
