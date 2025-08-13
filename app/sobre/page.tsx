// app/sobre/page.tsx
import { SITE } from "@/lib/site";

export default function Page(){
  return (
    <main className="mx-auto max-w-screen-sm px-4 pb-28 pt-6">
      <h1 className="text-2xl font-bold mb-4">Sobre a {SITE.brand}</h1>
      <div className="card space-y-3">
        <p>
          Somos apaixonados por smash burgers e ingredientes de qualidade.
          Clássicos e Linha Premium com pão brioche e ponto perfeito.
        </p>
        <p className="text-white/70">
          Atendimento {SITE.hours}. Peça pelo WhatsApp e retire ou receba em casa.
        </p>
      </div>
    </main>
  );
}
