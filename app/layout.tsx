// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  // URL canônica/base para gerar <link rel="canonical"> e OG URLs
  metadataBase: new URL("https://sitesclientesrevolux.com.br"),

  title: "Brasa Burguer Hamburgueria — Cardápio",
  description: "Peça seu lanche pelo WhatsApp",
  themeColor: "#0a0a0b",
  icons: { icon: "/favicon.ico" }, // garanta que existe public/favicon.ico

  // canônico explícito (opcional, mas ajuda)
  alternates: { canonical: "/" },

  // (opcionais) meta OG/Twitter bonitinhos
  openGraph: {
    title: "Brasa Burguer Hamburgueria — Cardápio",
    description: "Peça seu lanche pelo WhatsApp",
    url: "https://sitesclientesrevolux.com.br",
    siteName: "Brasa Burguer",
    type: "website",
    images: [{ url: "/logo.png" }] // coloque public/logo.png se quiser prévia
  },
  twitter: {
    card: "summary_large_image",
    title: "Brasa Burguer Hamburgueria — Cardápio",
    description: "Peça seu lanche pelo WhatsApp",
    images: ["/logo.png"]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0a0a0b] text-white antialiased">
        <Navbar />
        {/* espaço para a navbar fixa */}
        <main className="pt-20 md:pt-[88px]">{children}</main>
      </body>
    </html>
  );
}
