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
      {/* imagen */}
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

        {/* info — esquina inferior izquierda */}
        <button
          onClick={e => { e.preventDefault(); setShowDesc(v => !v); }}
          className={`absolute bottom-2.5 left-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
            showDesc
              ? 'bg-[#2c2c2c] text-white'
              : 'bg-white/80 backdrop-blur-sm text-[#888]'
          }`}
        >
          {showDesc ? <X size={12} strokeWidth={2} /> : <Info size={12} strokeWidth={1.8} />}
        </button>

        {/* carrito — esquina inferior derecha */}
        {cartItem ? (
          <div className="absolute bottom-2.5 right-2.5 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm gap-1">
            <button
              onClick={e => { e.preventDefault(); updateQty(product.id, cartItem.quantity - 1); }}
              className="w-5 h-5 flex items-center justify-center text-[#555] active:text-green transition-colors"
            >
              <Minus size={10} strokeWidth={2.5} />
            </button>
            <span className="text-[11px] font-semibold text-[#2c2c2c] min-w-[12px] text-center">
              {cartItem.quantity}
            </span>
            <button
              onClick={e => { e.preventDefault(); addItem(product); }}
              className="w-5 h-5 flex items-center justify-center text-green active:opacity-60 transition-opacity"
            >
              <Plus size={10} strokeWidth={2.5} />
            </button>
          </div>
        ) : (
          <button
            onClick={e => { e.preventDefault(); addItem(product); }}
            className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center bg-green text-white shadow-sm active:opacity-70 transition-opacity"
          >
            <Plus size={13} strokeWidth={2} />
          </button>
        )}
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

        <span className="text-[14px] text-green font-light mt-0.5">
          $ {product.price.toLocaleString('es-CO')}
        </span>
      </div>
    </div>
  );
}
