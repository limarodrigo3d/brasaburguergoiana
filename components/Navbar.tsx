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
      <div className="mx-auto max-w-screen-sm px-4 py-3 flex items-center gap-3">
        <Link href="/" className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10 bg-black/50">
          <Image src="/logo.svg" alt="Logo" fill sizes="40px" className="object-contain p-1" />
        </Link>
        <div className="min-w-0">
          <div className="font-extrabold tracking-tight truncate">{SITE.brand}</div>
          <div className="text-sm text-white/70 truncate">Peça pelo WhatsApp • {SITE.hours}</div>
        </div>
      </div>
      <nav className="mx-auto max-w-screen-sm px-4 pb-3 flex gap-2 overflow-x-auto">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`chip ${pathname === l.href ? "chip--active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
