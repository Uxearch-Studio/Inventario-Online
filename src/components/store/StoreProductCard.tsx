'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import type { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

export default function StoreProductCard({ product }: { product: Product }) {
  const { items, addItem, updateQty } = useCart();
  const cartItem = items.find(i => i.id === product.id);

  return (
    <div className="flex flex-col">
      {/* imagen */}
      <Link href={`/shop/${product.id}`} className="block relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-cream-light mb-3">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#F0EBE2] to-[#E4D9CB]">
            <span className="font-serif text-[11px] italic tracking-widest text-[#BEB4A8]">Ana Holística</span>
          </div>
        )}
      </Link>

      {/* info */}
      <div className="flex flex-col gap-0.5 px-0.5">
        {product.category && (
          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-300 font-medium">
            {product.category}
          </span>
        )}

        <Link href={`/shop/${product.id}`}>
          <h3 className="text-[13px] font-medium text-[#2c2c2c] leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[13px] text-green font-light">
            $ {product.price.toLocaleString('es-CO')}
          </span>
        </div>

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
