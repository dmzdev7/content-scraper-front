import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/presentation/providers/SessionProvider";
import { Toaster } from "@/presentation/components/ui/sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ContentMint",
  description:
    "Transform raw product data into compelling marketing copy. The ultimate tool for high-volume e-commerce content generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <SessionProvider>
          {children}
          <Toaster
            richColors
            position="top-right"
            expand={false}
            duration={4000}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
