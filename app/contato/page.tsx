// app/contato/page.tsx
import { SITE } from "@/lib/site";

export default function Page(){
  return (
    <main className="mx-auto max-w-screen-sm px-4 pb-28 pt-6">
      <h1 className="text-2xl font-bold mb-4">Contato & Localização</h1>

      <section className="grid gap-4">
        <article className="card">
          <p className="font-semibold">WhatsApp</p>
          <a
            className="mt-1 inline-block rounded-xl bg-emerald-500 px-4 py-2 font-extrabold text-emerald-950"
            href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Olá! Quero fazer um pedido.")}`}
          >
            Falar no WhatsApp
          </a>
        </article>

        <article className="card">
          <p className="font-semibold">Endereço</p>
          <p className="text-white/70">{SITE.address}</p>
          <a
            className="mt-2 inline-block rounded-xl border border-white/20 px-4 py-2"
            href={SITE.mapsUrl}
            target="_blank" rel="noreferrer"
          >
            Abrir no Google Maps
          </a>
        </article>
      </section>
    </main>
  );
}
