import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreightFlow | Freight Cost Calculator",
  description:
    "Instantly estimate Guangzhou to Jebel Ali freight costs with chargeable CBM, documentation fees, and currency views.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="freightflow-theme" strategy="beforeInteractive">
          {`
            try {
              var savedTheme = window.localStorage.getItem("freightflow-theme");
              var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              var shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;
              document.documentElement.classList.toggle("dark", shouldUseDark);
            } catch (error) {}
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
