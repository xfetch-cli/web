import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@xscriptor/xcomponents/styles.css";
import "./globals.css";
import BgPaths from "@/components/BgPaths";
import SiteNav from "@/components/SiteNav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "resources/xfetch — Dev Xscriptor",
  description: "Xfetch — a fast system information fetcher tool by Xscriptor.",
  icons: { icon: "https://avatars.githubusercontent.com/u/306786737?s=400&u=4f7902a02522f061664da8d6c2e71b9e2c5eabee&v=4" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem("xfetch-theme");if(t==="light")document.documentElement.removeAttribute("data-theme")}catch(e){}})();`
        }} />
      </head>
      <body className="font-sans antialiased relative">
        <BgPaths />
        <SiteNav />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
