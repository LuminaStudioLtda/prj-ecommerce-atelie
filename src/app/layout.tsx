import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-commerce Ateliê",
  description: "E-commerce do Ateliê.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
