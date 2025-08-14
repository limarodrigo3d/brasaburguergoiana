// app/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { SITE } from "@/lib/site";

/** Tipos */
type Categoria =
  | "tradicionais"
  | "frango"
  | "artesanais"
  | "acompanhamentos"
  | "bebidas";

type Item = {
  id: string;
  name: string;
  desc?: string;
  price: number;
  category: Categoria;
  image?: string;
  /** quando o item exige escolha (p.ex.: Batata Completa / Acréscimos) */
  options?: string[];
};

type CartLine = {
  item: Item;
  qty: number;
  option?: string;
};

type PaymentMethod = "dinheiro" | "cartao" | "pix";

/** Constantes */
const PIX_KEY = "32999097894";
const PIX_NAME = "Gustavo Henrique Toledo Moreira";

/** Categorias (abas) */
const CATEGORIES: { id: Categoria; label: string }[] = [
  { id: "tradicionais", label: "Tradicionais" },
  { id: "frango", label: "Frango (Ki-Cocó)" },
  { id: "artesanais", label: "Artesanais" },
  { id: "acompanhamentos", label: "Acompanhamentos" },
  { id: "bebidas", label: "Bebidas" },
];

/** Itens do cardápio */
const ITEMS: Item[] = [
  // Tradicionais (+1 real)
  { id: "t01", name: "Hambúrguer", desc: "Pão, bife, alface, tomate, batata palha.", price: 10, category: "tradicionais" },
  { id: "t02", name: "X-Burguer", desc: "Pão, bife, mussarela, alface, tomate, batata palha.", price: 14, category: "tradicionais" },
  { id: "t03", name: "X-Presunto", desc: "Pão, bife, mussarela, presunto, alface, tomate, batata palha.", price: 17, category: "tradicionais" },
  { id: "t04", name: "X-Egg", desc: "Pão, bife, mussarela, ovo, alface, tomate, batata palha.", price: 17, category: "tradicionais" },
  { id: "t05", name: "X-Bacon", desc: "Pão, bife, mussarela, bacon, alface, tomate, batata palha.", price: 19, category: "tradicionais" },
  { id: "t06", name: "X-Egg Presunto", desc: "Pão, bife, mussarela, ovo, presunto, alface, tomate, batata palha.", price: 19, category: "tradicionais" },
  { id: "t07", name: "X-Egg Bacon", desc: "Pão, bife, mussarela, ovo, bacon, alface, tomate, batata palha.", price: 20, category: "tradicionais" },
  { id: "t08", name: "X-Tudo", desc: "Pão, bife, mussarela, presunto, ovo, bacon, frango desfiado, milho, alface, tomate, batata palha.", price: 25, category: "tradicionais" },
  { id: "t09", name: "Hamburgão", desc: "Pão, 2 bifes, alface, tomate, batata palha.", price: 15, category: "tradicionais" },
  { id: "t10", name: "X-Burgão", desc: "Pão, 2 bifes, mussarela, alface, tomate, batata palha.", price: 18, category: "tradicionais" },
  { id: "t11", name: "X-Calabresa", desc: "Pão, bife, mussarela, calabresa, alface, tomate, batata palha.", price: 19, category: "tradicionais" },
  { id: "t22", name: "X-Catupiry", desc: "Pão, bife, mussarela, catupiry, alface, tomate, batata palha.", price: 17, category: "tradicionais" },

  // Frango — Ki-Cocó (+1 real)
  { id: "f12", name: "Ki-Cocó", desc: "Pão, frango desfiado, milho, mussarela, alface, tomate, batata palha.", price: 17, category: "frango" },
  { id: "f13", name: "Ki-Cocó Presunto", desc: "Frango, milho, mussarela, presunto, alface, tomate, batata palha.", price: 19, category: "frango" },
  { id: "f14", name: "Ki-Cocó Egg", desc: "Frango, milho, mussarela, ovo, alface, tomate, batata palha.", price: 19, category: "frango" },
  { id: "f15", name: "Ki-Cocó Bacon", desc: "Frango, milho, mussarela, bacon, alface, tomate, batata palha.", price: 20, category: "frango" },
  { id: "f16", name: "Ki-Cocó Calabresa", desc: "Frango, milho, mussarela, calabresa, alface, tomate, batata palha.", price: 20, category: "frango" },
  { id: "f17", name: "Ki-Cocó Catupiry", desc: "Frango, milho, mussarela, catupiry, alface, tomate, batata palha.", price: 20, category: "frango" },
  { id: "f18", name: "Ki-Cocó Bacon Presunto", desc: "Frango, milho, mussarela, bacon, presunto, alface, tomate, batata palha.", price: 21, category: "frango" },
  { id: "f19", name: "Ki-Cocó Egg Presunto", desc: "Frango, milho, mussarela, ovo, presunto, alface, tomate, batata palha.", price: 21, category: "frango" },
  { id: "f20", name: "Ki-Cocó Egg Bacon", desc: "Frango, milho, mussarela, ovo, bacon, alface, tomate, batata palha.", price: 22, category: "frango" },
  { id: "f21", name: "Ki-Cocó Tudo", desc: "Frango, milho, mussarela, presunto, catupiry, ovo, bacon, alface, tomate, batata palha.", price: 25, category: "frango" },

  // Artesanais
  { id: "p01", name: "Especial 1", desc: "Brioche, blend 150g, queijo (cheddar ou prato), cebola caramelizada, alface, tomate.", price: 21, category: "artesanais" },
  { id: "p02", name: "Especial 2", desc: "Brioche, blend 150g, queijo, cebola caramelizada, bacon, onion rings, alface, tomate.", price: 25, category: "artesanais" },
  { id: "p03", name: "Especial 3", desc: "Pão brioche, blend 150g, provolone, queijo cheddar ou prato, cebola caramelizada, bacon, alface e tomate.", price: 25, category: "artesanais" },
  { id: "p04", name: "Especial 4", desc: "Brioche, frango empanado recheado com mussarela e presunto, cream cheese, alface, tomate, batata palha.", price: 21, category: "artesanais" },
  { id: "p05", name: "Especial 5", desc: "Brioche, frango empanado recheado com mussarela, presunto, bacon, cream cheese, alface, tomate, batata palha.", price: 25, category: "artesanais" },
  { id: "p06", name: "Especial 6", desc: "Brioche, blend 150g, queijo, bacon, cream cheese, alface, tomate, batata palha.", price: 25, category: "artesanais" },
  { id: "p07", name: "Duplo Cheddar", desc: "Brioche, 2×100g, cheddar, cebola caramelizada, alface, tomate.", price: 23, category: "artesanais" },
  { id: "p08", name: "Triplo Cheddar", desc: "Brioche, 3×100g, cheddar, cebola caramelizada, alface, tomate.", price: 27, category: "artesanais" },

  // Acompanhamentos
  { id: "a01", name: "Batata Frita — Simples", desc: "Porção crocante.", price: 15, category: "acompanhamentos" },
  {
    id: "a02",
    name: "Batata Frita — Completa",
    desc: "Escolha: bacon + cheddar, OU bacon + catupiry, OU bacon + cream cheese.",
    price: 20,
    category: "acompanhamentos",
    options: ["Bacon + Cheddar", "Bacon + Catupiry", "Bacon + Cream Cheese"],
  },
  { id: "a03", name: "Catupiry Empanado (unidade)", price: 7, category: "acompanhamentos" },
  {
    id: "a04",
    name: "Acréscimos",
    desc: "Escolha: Cheddar, Catupiry ou Cream Cheese.",
    price: 5,
    category: "acompanhamentos",
    options: ["Cheddar", "Catupiry", "Cream Cheese"],
  },

  // Bebidas
  { id: "b01", name: "Refrigerante — Mini", price: 3, category: "bebidas" },
  { id: "b02", name: "Refrigerante — Lata", price: 6, category: "bebidas" },
  { id: "b03", name: "Refrigerante — 600 ml", price: 7, category: "bebidas" },
  { id: "b04", name: "Refrigerante — 2 L", price: 13, category: "bebidas" },
  { id: "b05", name: "Suco Natural da Casa", price: 5, category: "bebidas" },
];

/** Helpers */
const currency = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** formata um número inteiro de centavos para "99,99" */
const centsToMask = (cents: number) => {
  const v = Math.max(0, cents | 0);
  const s = (v / 100).toFixed(2).replace(".", ",");
  return s;
};
/** extrai só dígitos e converte para centavos */
const inputToCents = (raw: string) => {
  const digits = (raw.match(/\d+/g) || []).join("");
  return digits ? parseInt(digits, 10) : 0;
};

/** chave única por linha (id:opção quando houver) */
const lineKeyOf = (item: Item, option?: string) =>
  item.options?.length && option ? `${item.id}:${option}` : item.id;

export default function Page() {
  const [active, setActive] = useState<Categoria>("tradicionais");
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  /** Pagamento */
  const [payMethod, setPayMethod] = useState<PaymentMethod | "">("");
  const [cashChangeCents, setCashChangeCents] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  /** verifica se há pelo menos um lanche (tradicionais/frango/artesanais) no carrinho */
  const hasAnySandwich = useMemo(
    () =>
      Object.values(cart).some((l) =>
        ["tradicionais", "frango", "artesanais"].includes(l.item.category)
      ),
    [cart]
  );

  function add(i: Item) {
    const chosen = i.options?.length ? selectedOptions[i.id] : undefined;
    if (i.options?.length && !chosen) {
      alert(`Escolha uma opção para "${i.name}" antes de adicionar.`);
      return;
    }
    // bloquear acréscimos sem lanche
    if (i.id === "a04" && !hasAnySandwich) {
      alert("Para adicionar Acréscimos, primeiro adicione um lanche ao carrinho.");
      return;
    }
    const key = lineKeyOf(i, chosen);
    setCart((c) => ({
      ...c,
      [key]: { item: i, qty: (c[key]?.qty || 0) + 1, option: chosen },
    }));
  }

  function sub(i: Item) {
    const chosen = i.options?.length ? selectedOptions[i.id] : undefined;
    const key = lineKeyOf(i, chosen);
    setCart((c) => {
      if (!c[key]) return c;
      const next = { ...c, [key]: { ...c[key], qty: c[key].qty - 1 } };
      if (next[key].qty <= 0) delete next[key];
      return next;
    });
  }

  function changeOption(itemId: string, value: string) {
    setSelectedOptions((s) => ({ ...s, [itemId]: value }));
  }

  const items = useMemo(() => Object.values(cart), [cart]);
  const total = useMemo(() => items.reduce((a, b) => a + b.item.price * b.qty, 0), [items]);

  /** resumo por grupo para itens com opções (exibe na barra e no WhatsApp) */
  const optionGroups = useMemo(() => {
    const groups: Record<string, Record<string, number>> = {};
    items.forEach(({ item, qty, option }) => {
      if (!option) return;
      const base = item.name;
      groups[base] ||= {};
      groups[base][option] = (groups[base][option] || 0) + qty;
    });
    return groups;
  }, [items]);

  async function copyPix() {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Não foi possível copiar. Copie manualmente: " + PIX_KEY);
    }
  }

  function sendWhats() {
    if (!items.length) return alert("Seu pedido está vazio.");
    if (!payMethod) return alert("Selecione um método de pagamento.");
    if (payMethod === "dinheiro" && cashChangeCents < 0) {
      return alert("Informe um valor válido para o troco.");
    }

    let text = "Olá! Gostaria de fazer o pedido:\n\n";
    items.forEach(({ item, qty, option }) => {
      text += `• ${item.name} × ${qty}`;
      if (option) text += ` (${option})`;
      text += ` — ${currency(item.price)}\n`;
    });

    // resumo por grupo
    const groupLines = Object.entries(optionGroups).map(([base, opts]) => {
      const parts = Object.entries(opts).map(([opt, q]) => `${q}× ${opt}`).join(", ");
      return `- ${base}: ${parts}`;
    });
    if (groupLines.length) {
      text += `\nResumo de opções:\n${groupLines.join("\n")}\n`;
    }

    // pagamento
    text += `\nPagamento: `;
    if (payMethod === "dinheiro") {
      const trocoInfo =
        cashChangeCents > 0
          ? ` (troco para ${currency(cashChangeCents / 100)})`
          : " (sem troco)";
      text += `Dinheiro${trocoInfo}\n`;
    } else if (payMethod === "cartao") {
      text += "Cartão\n";
    } else if (payMethod === "pix") {
      text += `PIX — chave ${PIX_KEY} (${PIX_NAME})\n`;
    }

    text += `\nTotal: ${currency(total)}\n`;
    window.location.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  return (
    <div className="min-h-screen">
      {/* CATEGORIAS */}
      <nav className="mx-auto max-w-screen-sm px-4 py-3 flex gap-2 overflow-x-auto bg-black/70 backdrop-blur rounded-xl border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
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

      {/* LISTA DE PRODUTOS */}
      <main className="mx-auto max-w-screen-sm px-4 pb-48">
        {CATEGORIES.map((cat) => (
          <section key={cat.id} className={active === cat.id ? "block" : "hidden"}>
            <h2 className="mt-5 mb-3 text-lg font-semibold">{cat.label}</h2>
            <div className="grid gap-4">
              {ITEMS.filter((i) => i.category === cat.id).map((i) => {
                const chosen = i.options?.length ? selectedOptions[i.id] : undefined;
                const key = lineKeyOf(i, chosen);
                const displayQty = cart[key]?.qty || 0;

                return (
                  <article key={i.id} className="card flex gap-3">
                    {/* thumb */}
                    <div className="w-20 h-20 rounded-lg border border-white/10 overflow-hidden bg-black/40">
                      {i.image ? (
                        <Image src={i.image} alt={i.name} width={84} height={84} className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid place-items-center w-full h-full text-white/60 text-xs">84×84</div>
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="m-0 font-semibold">{i.name}</p>
                      {i.desc && <p className="m-0 text-sm text-white/70">{i.desc}</p>}

                      {/* seletor para itens com options */}
                      {i.options && (
                        <select
                          value={selectedOptions[i.id] || ""}
                          onChange={(e) => changeOption(i.id, e.target.value)}
                          className="mt-2 w-full rounded-md border border-white/20 bg-black/40 text-sm p-2"
                          aria-label={`Opção para ${i.name}`}
                        >
                          <option value="">Selecione uma opção</option>
                          {i.options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      )}

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
                          <span className="w-6 text-center">{displayQty}</span>
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
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* CARRINHO + PAGAMENTO */}
      <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-screen-sm px-4 py-3 flex flex-col gap-3">
          {/* resumo topo */}
          <div className="flex items-center gap-3">
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

          {/* resumo por grupo (quando houver opções) */}
          {!!Object.keys(optionGroups).length && (
            <div className="text-xs text-white/70 leading-snug">
              {Object.entries(optionGroups).map(([base, opts]) => {
                const parts = Object.entries(opts)
                  .map(([opt, q]) => `${q}× ${opt}`)
                  .join(", ");
                return (
                  <div key={base}>
                    <span className="font-semibold text-white/80">{base}:</span> {parts}
                  </div>
                );
              })}
            </div>
          )}

          {/* pagamento */}
          <div className="grid gap-2 text-sm">
            <div className="font-semibold text-white/80">Pagamento na entrega</div>
            <div className="flex flex-wrap gap-3 items-center">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="pay"
                  value="dinheiro"
                  checked={payMethod === "dinheiro"}
                  onChange={() => setPayMethod("dinheiro")}
                />
                Dinheiro
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="pay"
                  value="cartao"
                  checked={payMethod === "cartao"}
                  onChange={() => setPayMethod("cartao")}
                />
                Cartão
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="pay"
                  value="pix"
                  checked={payMethod === "pix"}
                  onChange={() => setPayMethod("pix")}
                />
                PIX
              </label>
            </div>

            {payMethod === "dinheiro" && (
              <div className="flex items-center gap-2">
                <span>Troco para R$</span>
                <input
                  inputMode="numeric"
                  placeholder="0,00"
                  value={centsToMask(cashChangeCents)}
                  onChange={(e) => setCashChangeCents(inputToCents(e.target.value))}
                  className="w-28 rounded-md border border-white/20 bg-black/40 p-1 text-center"
                  aria-label="Troco para"
                />
                <span className="text-xs text-white/60">(deixe em branco para sem troco)</span>
              </div>
            )}

            {payMethod === "pix" && (
              <div className="flex flex-wrap items-center gap-2 text-white/80">
                <div>
                  Chave PIX: <span className="font-semibold">{PIX_KEY}</span> —{" "}
                  <span className="font-semibold">{PIX_NAME}</span>
                </div>
                <button
                  onClick={copyPix}
                  className="ml-auto rounded-md border border-white/20 bg-black/30 px-2 py-1 text-xs hover:bg-black/40"
                >
                  {copied ? "Copiado!" : "Copiar chave"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
