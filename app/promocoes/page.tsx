// app/promocoes/page.tsx
import { SITE } from "@/lib/site";

const promos = [
  { title: "Combo Clássico", desc: "X-Burguer + Batata Simples + Refri Lata", price: 25 },
  { title: "Noite do Bacon", desc: "X-Bacon + Batata Completa", price: 30 },
  { title: "Premium Duo", desc: "Especial 1 + Especial 2", price: 44 },
];

function currency(n:number){ return n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}); }

export default function Page(){
  return (
    <main className="mx-auto max-w-screen-sm px-4 pb-28 pt-6">
      <h1 className="text-2xl font-bold mb-4">Promoções</h1>
      <div className="grid gap-4">
        {promos.map((p,i)=>(
          <article key={i} className="card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-white/70">{p.desc}</p>
              </div>
              <span className="font-extrabold">{currency(p.price)}</span>
            </div>
            <a
              className="mt-3 inline-block rounded-xl bg-emerald-500 px-4 py-2 font-extrabold text-emerald-950"
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Olá! Quero a promoção: ${p.title} — ${currency(p.price)}`)}`}
            >
              Pedir no WhatsApp
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
