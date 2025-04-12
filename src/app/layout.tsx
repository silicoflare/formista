import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Formista",
  description: "One-stop spot for all your forms!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}>
        <div className="flex flex-col items-center w-screen h-screen gap-2">
          <ThemeProvider enableSystem={false} themes={["dark", "light"]}>
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
