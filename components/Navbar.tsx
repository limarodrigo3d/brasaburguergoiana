// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

const links = [
  { href: "/", label: "Cardápio" },
  { href: "/promocoes", label: "Promoções" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar(){
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-screen-sm px-4 py-4 flex items-center gap-5">
        {/* Logo bem maior */}
        <Link href="/" className="relative w-20 h-20 overflow-hidden rounded-xl border border-white/10 bg-black/50">
          <Image src="/logo.svg" alt="Logo" fill sizes="80px" className="object-contain p-2" />
        </Link>

        <div className="min-w-0">
          {/* Título maior */}
          <div className="font-extrabold tracking-tight truncate text-3xl md:text-4xl">
            {SITE.brand}
          </div>
          <div className="text-base md:text-lg text-white/70 truncate">
            Peça pelo WhatsApp • {SITE.hours}
          </div>
        </div>
      </div>

      <nav className="mx-auto max-w-screen-sm px-4 pb-4 flex gap-4 overflow-x-auto">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`chip text-lg md:text-xl ${pathname === l.href ? "chip--active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
