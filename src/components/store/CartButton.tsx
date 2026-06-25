'use client';

import { useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartButton() {
  const { totalItems, openCart } = useCart();
  const badgeRef = useRef<HTMLSpanElement>(null);
  const prevRef = useRef(totalItems);

  useEffect(() => {
    if (totalItems > prevRef.current && badgeRef.current) {
      const el = badgeRef.current;
      el.style.transition = 'none';
      el.style.transform = 'scale(1.6)';
      requestAnimationFrame(() => {
        el.style.transition = 'transform 0.25s cubic-bezier(.34,1.56,.64,1)';
        el.style.transform = 'scale(1)';
      });
    }
    prevRef.current = totalItems;
  }, [totalItems]);

  return (
    <button
      onClick={openCart}
      className="relative p-2 rounded-xl hover:bg-cream transition-colors"
      aria-label="Ver carrito"
    >
      <ShoppingBag size={22} className="text-green" />
      {totalItems > 0 && (
        <span
          ref={badgeRef}
          className="absolute -top-1 -right-1 bg-gold text-white text-[10px] font-bold min-w-[18px] h-[18px] px-0.5 rounded-full flex items-center justify-center leading-none"
        >
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
}
