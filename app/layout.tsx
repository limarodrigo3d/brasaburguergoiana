// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://sitesclientesrevolux.com.br"),
  title: "Brasa Burguer Hamburgueria — Cardápio",
  description: "Peça seu lanche pelo WhatsApp",
  themeColor: "#0a0a0b",
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Brasa Burguer Hamburgueria — Cardápio",
    description: "Peça seu lanche pelo WhatsApp",
    url: "https://sitesclientesrevolux.com.br",
    siteName: "Brasa Burguer",
    type: "website",
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brasa Burguer Hamburgueria — Cardápio",
    description: "Peça seu lanche pelo WhatsApp",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      {/* body relativo para ancorar camadas; texto branco e suavizado */}
      <body className="relative min-h-screen text-white antialiased">
        {/* CAMADA: imagem de fundo em toda a viewport */}
        <div className="fixed inset-0 -z-10">
          <Image
            src="/bg-brasa.jpg"   // coloquei sua imagem da pasta /public
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          {/* overlay para contraste */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* conteúdo acima do fundo */}
        <div className="relative z-10">
          <Navbar />
          {/* espaço para a navbar fixa */}
          <main className="pt-20 md:pt-[88px]">{children}</main>
        </div>
      </body>
    </html>
  );
}
