'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import type { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

const categoryColors: Record<string, string> = {
  'Mundo Mente': 'bg-blue-50 text-blue-600',
  'Mundo Cuerpo': 'bg-green/10 text-green',
  'Mundo Energía': 'bg-gold-light text-yellow-700',
  'Mundo Naturaleza': 'bg-emerald-50 text-emerald-600',
  'Mundo Alma': 'bg-purple-50 text-purple-600',
};

export default function StoreProductCard({ product }: { product: Product }) {
  const { items, addItem, updateQty } = useCart();
  const cartItem = items.find(i => i.id === product.id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream flex flex-col">
      {/* imagen — link al detalle */}
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative w-full aspect-[3/4] bg-cream overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-cream to-[#e8dccc]">
              <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#525C44" strokeWidth="1.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-xs text-green/50 font-medium">Ana Holística</span>
            </div>
          )}
        </div>
      </Link>

      {/* info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        {product.category && (
          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${categoryColors[product.category] ?? 'bg-gray-100 text-gray-500'}`}>
            {product.category}
          </span>
        )}

        <Link href={`/shop/${product.id}`}>
          <h3 className="text-sm font-semibold text-black leading-tight line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-green font-bold text-sm">
          $ {product.price.toLocaleString('es-CO')}
        </p>

        {/* controles de carrito */}
        {cartItem ? (
          <div className="flex items-center justify-between mt-1 bg-surface rounded-xl px-3 py-2">
            <button
              onClick={() => updateQty(product.id, cartItem.quantity - 1)}
              className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 active:scale-90 transition-transform shadow-sm"
            >
              <Minus size={13} />
            </button>
            <span className="text-sm font-bold text-black">{cartItem.quantity}</span>
            <button
              onClick={() => addItem(product)}
              className="w-7 h-7 rounded-full bg-green flex items-center justify-center text-white active:scale-90 transition-transform shadow-sm"
            >
              <Plus size={13} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addItem(product)}
            className="mt-1 w-full py-2 rounded-xl bg-gold text-white text-xs font-bold flex items-center justify-center gap-1.5 active:opacity-80 transition-opacity"
          >
            <Plus size={13} />
            Agregar
          </button>
        )}
      </div>
    </div>
  );
}
