// app/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { SITE } from "@/lib/site";

/** Tipos */
type Categoria = "tradicionais" | "frango" | "premium" | "acompanhamentos" | "bebidas";
type Item = { id: string; name: string; desc?: string; price: number; category: Categoria };

/** Categorias */
const CATEGORIES: { id: Categoria; label: string }[] = [
  { id: "tradicionais", label: "Tradicionais" },
  { id: "frango", label: "Frango (Ki-Cocó)" },
  { id: "premium", label: "Linha Premium" },
  { id: "acompanhamentos", label: "Acompanhamentos" },
  { id: "bebidas", label: "Bebidas" },
];

/** Itens do cardápio (baseados no PDF) */
const ITEMS: Item[] = [
  // Tradicionais
  { id: "t01", name: "Hambúrguer", desc: "Pão, bife, alface, tomate, batata palha.", price: 9, category: "tradicionais" },
  { id: "t02", name: "X-Burguer", desc: "Pão, bife, mussarela, alface, tomate, batata palha.", price: 13, category: "tradicionais" },
  { id: "t03", name: "X-Presunto", desc: "Pão, bife, mussarela, presunto, alface, tomate, batata palha.", price: 16, category: "tradicionais" },
  { id: "t04", name: "X-Egg", desc: "Pão, bife, mussarela, ovo, alface, tomate, batata palha.", price: 16, category: "tradicionais" },
  { id: "t05", name: "X-Bacon", desc: "Pão, bife, mussarela, bacon, alface, tomate, batata palha.", price: 18, category: "tradicionais" },
  { id: "t06", name: "X-Egg Presunto", desc: "Pão, bife, mussarela, ovo, presunto, alface, tomate, batata palha.", price: 18, category: "tradicionais" },
  { id: "t07", name: "X-Egg Bacon", desc: "Pão, bife, mussarela, ovo, bacon, alface, tomate, batata palha.", price: 19, category: "tradicionais" },
  { id: "t08", name: "X-Tudo", desc: "Pão, bife, mussarela, presunto, ovo, bacon, frango desfiado, milho, alface, tomate, batata palha.", price: 24, category: "tradicionais" },
  { id: "t09", name: "Hamburgão", desc: "Pão, 2 bifes, alface, tomate, batata palha.", price: 14, category: "tradicionais" },
  { id: "t10", name: "X-Burgão", desc: "Pão, 2 bifes, mussarela, alface, tomate, batata palha.", price: 17, category: "tradicionais" },
  { id: "t11", name: "X-Calabresa", desc: "Pão, bife, mussarela, calabresa, alface, tomate, batata palha.", price: 18, category: "tradicionais" },
  { id: "t22", name: "X-Catupiry", desc: "Pão, bife, mussarela, catupiry, alface, tomate, batata palha.", price: 16, category: "tradicionais" },

  // Frango — Ki-Cocó
  { id: "f12", name: "Ki-Cocó", desc: "Pão, frango desfiado, milho, mussarela, alface, tomate, batata palha.", price: 16, category: "frango" },
  { id: "f13", name: "Ki-Cocó Presunto", desc: "Frango, milho, mussarela, presunto, alface, tomate, batata palha.", price: 18, category: "frango" },
  { id: "f14", name: "Ki-Cocó Egg", desc: "Frango, milho, mussarela, ovo, alface, tomate, batata palha.", price: 18, category: "frango" },
  { id: "f15", name: "Ki-Cocó Bacon", desc: "Frango, milho, mussarela, bacon, alface, tomate, batata palha.", price: 19, category: "frango" },
  { id: "f16", name: "Ki-Cocó Calabresa", desc: "Frango, milho, mussarela, calabresa, alface, tomate, batata palha.", price: 19, category: "frango" },
  { id: "f17", name: "Ki-Cocó Catupiry", desc: "Frango, milho, mussarela, catupiry, alface, tomate, batata palha.", price: 19, category: "frango" },
  { id: "f18", name: "Ki-Cocó Bacon Presunto", desc: "Frango, milho, mussarela, bacon, presunto, alface, tomate, batata palha.", price: 20, category: "frango" },
  { id: "f19", name: "Ki-Cocó Egg Presunto", desc: "Frango, milho, mussarela, ovo, presunto, alface, tomate, batata palha.", price: 20, category: "frango" },
  { id: "f20", name: "Ki-Cocó Egg Bacon", desc: "Frango, milho, mussarela, ovo, bacon, alface, tomate, batata palha.", price: 21, category: "frango" },
  { id: "f21", name: "Ki-Cocó Tudo", desc: "Frango, milho, mussarela, presunto, catupiry, ovo, bacon, alface, tomate, batata palha.", price: 24, category: "frango" },

  // Linha Premium
  { id: "p01", name: "Especial 1", desc: "Brioche, blend 150g, queijo (cheddar ou prato), cebola caramelizada, alface, tomate.", price: 21, category: "premium" },
  { id: "p02", name: "Especial 2", desc: "Brioche, blend 150g, queijo, cebola caramelizada, bacon, onion rings, alface, tomate.", price: 25, category: "premium" },
  { id: "p03", name: "Especial 3", desc: "Brioche, hambúrguer recheado (provolone ou prato), cebola caramelizada, bacon, alface, tomate.", price: 25, category: "premium" },
  { id: "p04", name: "Especial 4", desc: "Brioche, frango empanado recheado com mussarela e presunto, cream cheese, alface, tomate, batata palha.", price: 21, category: "premium" },
  { id: "p05", name: "Especial 5", desc: "Brioche, frango empanado recheado com mussarela, presunto, bacon, cream cheese, alface, tomate, batata palha.", price: 25, category: "premium" },
  { id: "p06", name: "Especial 6", desc: "Brioche, blend 150g, queijo, bacon, cream cheese, alface, tomate, batata palha.", price: 25, category: "premium" },
  { id: "p07", name: "Duplo Cheddar", desc: "Brioche, 2×100g, cheddar, cebola caramelizada, alface, tomate.", price: 23, category: "premium" },
  { id: "p08", name: "Triplo Cheddar", desc: "Brioche, 3×100g, cheddar, cebola caramelizada, alface, tomate.", price: 27, category: "premium" },
  { id: "p09", name: "Especial Mineiro", desc: "Brioche, blend 150g, queijo minas empanado, queijo (cheddar ou prato), cebola caramelizada, alface, tomate.", price: 26, category: "premium" },

  // Acompanhamentos
  { id: "a01", name: "Batata Frita — Simples", desc: "Porção crocante.", price: 15, category: "acompanhamentos" },
  { id: "a02", name: "Batata Frita — Completa", desc: "Porção com adicionais.", price: 20, category: "acompanhamentos" },
  { id: "a03", name: "Catupiry Empanado (unidade)", price: 6, category: "acompanhamentos" },

  // Bebidas
  { id: "b01", name: "Refrigerante — Mini", price: 3, category: "bebidas" },
  { id: "b02", name: "Refrigerante — Lata", price: 6, category: "bebidas" },
  { id: "b03", name: "Refrigerante — 600 ml", price: 7, category: "bebidas" },
  { id: "b04", name: "Refrigerante — 2 L", price: 13, category: "bebidas" },
  { id: "b05", name: "Suco Natural da Casa", price: 5, category: "bebidas" },
];

/** Utils */
const currency = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Page() {
  const [active, setActive] = useState<Categoria>("tradicionais");
  const [cart, setCart] = useState<Record<string, { item: Item; qty: number }>>({});

  function add(i: Item) {
    setCart((c) => ({ ...c, [i.id]: { item: i, qty: (c[i.id]?.qty || 0) + 1 } }));
  }
  function sub(i: Item) {
    setCart((c) => {
      const n = { ...c };
      if (!n[i.id]) return n;
      n[i.id].qty -= 1;
      if (n[i.id].qty <= 0) delete n[i.id];
      return n;
    });
  }

  const items = useMemo(() => Object.values(cart), [cart]);
  const total = useMemo(() => items.reduce((a, b) => a + b.item.price * b.qty, 0), [items]);

  function sendWhats() {
    if (!items.length) return alert("Seu pedido está vazio.");
    let text = "Olá! Gostaria de fazer o pedido:\n\n";
    items.forEach(({ item, qty }) => (text += `• ${item.name} × ${qty} — ${currency(item.price)}\n`));
    text += `\nTotal: ${currency(total)}\n`;
    window.location.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  return (
    <div className="min-h-screen">
      {/* Abas de categorias (Navbar já está no layout) */}
      <nav className="mx-auto max-w-screen-sm px-4 pt-3 pb-3 flex gap-2 overflow-x-auto">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`chip ${active === c.id ? "chip--active" : ""}`}
            aria-pressed={active === c.id}
          >
            {c.label}
          </button>
        ))}
      </nav>

      {/* Lista de produtos */}
      <main className="mx-auto max-w-screen-sm px-4 pb-28">
        {CATEGORIES.map((cat) => (
          <section key={cat.id} className={active === cat.id ? "block" : "hidden"}>
            <h2 className="mt-5 mb-3 text-lg font-semibold">{cat.label}</h2>
            <div className="grid gap-4">
              {ITEMS.filter((i) => i.category === cat.id).map((i) => (
                <article key={i.id} className="card flex gap-3">
                  <div className="w-20 h-20 rounded-lg bg-black/40 border border-white/10 grid place-items-center text-white/60 text-xs">
                    84×84
                  </div>
                  <div className="flex-1">
                    <p className="m-0 font-semibold">{i.name}</p>
                    {i.desc && <p className="m-0 text-sm text-white/70">{i.desc}</p>}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-extrabold">{currency(i.price)}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => sub(i)}
                          className="w-8 h-8 rounded-md bg-black/50 border border-white/10"
                          aria-label={`Remover ${i.name}`}
                        >
                          –
                        </button>
                        <span className="w-6 text-center">{cart[i.id]?.qty || 0}</span>
                        <button
                          onClick={() => add(i)}
                          className="w-8 h-8 rounded-md bg-emerald-500 text-emerald-950 font-bold"
                          aria-label={`Adicionar ${i.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Barra do carrinho */}
      <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-black/50 backdrop-blur">
        <div className="mx-auto max-w-screen-sm px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-sm text-white/70">Seu pedido</div>
            <div className="text-lg font-extrabold" aria-live="polite">
              {items.length ? `${items.length} item(ns) • ${currency(total)}` : "Vazio"}
            </div>
          </div>
          <button
            onClick={sendWhats}
            className="rounded-xl bg-emerald-500 px-4 py-3 font-extrabold text-emerald-950 disabled:opacity-60"
            disabled={!items.length}
            aria-disabled={!items.length}
          >
            Pedir no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
