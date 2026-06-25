'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, Info, X } from 'lucide-react';
import type { Product } from '@/types/product';
import { categoryIcons } from '@/lib/categoryIcons';
import { useCart } from '@/context/CartContext';

export default function StoreProductCard({ product }: { product: Product }) {
  const { items, addItem, updateQty } = useCart();
  const cartItem = items.find(i => i.id === product.id);
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className="flex flex-col">
      {/* imagen + overlay de descripción */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-cream-light mb-3">

        {/* imagen o placeholder */}
        <Link href={`/shop/${product.id}`} className="block w-full h-full">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#F0EBE2] to-[#E4D9CB]">
              <span className="font-serif text-[11px] italic tracking-widest text-[#BEB4A8]">Ana Holística</span>
            </div>
          )}
        </Link>

        {/* overlay descripción */}
        <div
          className={`absolute inset-0 bg-white/92 backdrop-blur-sm flex flex-col items-center justify-center px-5 transition-opacity duration-200 ${
            showDesc ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <p className="font-serif text-[15px] italic font-light text-[#2c2c2c] leading-relaxed text-center line-clamp-6">
            {product.description}
          </p>
        </div>

        {/* botón info */}
        <button
          onClick={e => { e.preventDefault(); setShowDesc(v => !v); }}
          className={`absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
            showDesc
              ? 'bg-[#2c2c2c] text-white'
              : 'bg-white/80 backdrop-blur-sm text-[#888] hover:text-[#2c2c2c]'
          }`}
        >
          {showDesc ? <X size={12} strokeWidth={2} /> : <Info size={12} strokeWidth={1.8} />}
        </button>
      </div>

      {/* info texto */}
      <div className="flex flex-col gap-0.5 px-0.5">
        {product.category && (() => {
          const Icon = categoryIcons[product.category!];
          return Icon ? <Icon size={13} strokeWidth={1.5} className="text-[#8a8779] mb-0.5" /> : null;
        })()}

        <Link href={`/shop/${product.id}`}>
          <h3 className="text-[14px] font-medium text-[#2c2c2c] leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <span className="text-[14px] text-green font-light mt-1">
          $ {product.price.toLocaleString('es-CO')}
        </span>

        {/* carrito */}
        {cartItem ? (
          <div className="flex items-center justify-between mt-2 border border-cream rounded-full px-3 py-1.5">
            <button
              onClick={() => updateQty(product.id, cartItem.quantity - 1)}
              className="text-gray-400 active:text-green transition-colors p-0.5"
            >
              <Minus size={12} />
            </button>
            <span className="text-[12px] font-medium text-[#2c2c2c] min-w-[16px] text-center">
              {cartItem.quantity}
            </span>
            <button
              onClick={() => addItem(product)}
              className="text-green active:opacity-60 transition-opacity p-0.5"
            >
              <Plus size={12} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addItem(product)}
            className="mt-2 w-full flex items-center justify-center gap-1.5 border border-cream-light rounded-full py-1.5 text-[11px] uppercase tracking-wider text-gray-400 hover:border-green hover:text-green transition-colors active:opacity-60"
          >
            <Plus size={10} strokeWidth={2} />
            Agregar
          </button>
        )}
      </div>
    </div>
  );
}
