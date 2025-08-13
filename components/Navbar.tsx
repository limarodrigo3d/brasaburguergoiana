// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Cardápio" },
  { href: "/promocoes", label: "Promoções" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
      <div className="mx-auto max-w-screen-sm px-4 py-3 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-white/5 grid place-items-center">
          {/* Coloque a logo em /public/logo.png (48–96 px) */}
          <Image src="/logo.png" alt="Brasa Burguer" width={48} height={48} className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-2xl md:text-3xl font-extrabold leading-tight truncate">Brasa Burguer</div>
          <div className="text-sm text-white/70 truncate">Peça pelo WhatsApp • Hoje: 18h–00h</div>
        </div>
      </div>

      <nav className="mx-auto max-w-screen-sm px-4 pb-3 flex gap-2 overflow-x-auto">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              data-active={active ? "true" : "false"}
              className="relative px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/5 transition
                         data-[active=true]:text-white data-[active=true]:bg-white/10"
            >
              {l.label}
              <span className="pointer-events-none absolute left-3 right-3 -bottom-[2px] h-[2px] bg-emerald-400
                               origin-left scale-x-0 data-[active=true]:scale-x-100 transition-transform" />
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
