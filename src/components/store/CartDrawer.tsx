'use client';

import Image from 'next/image';
import { X, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, totalItems, totalPrice, removeItem, updateQty, isOpen, closeCart } = useCart();

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}>
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeCart}
      />

      {/* drawer */}
      <div className={`absolute bottom-0 left-0 right-0 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[380px] bg-white flex flex-col max-h-[88vh] sm:max-h-none rounded-t-3xl sm:rounded-none transition-transform duration-300 ease-out ${
        isOpen ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-x-full'
      }`}>

        {/* handle móvil */}
        <div className="sm:hidden flex justify-center pt-4 pb-1 flex-shrink-0">
          <div className="w-8 h-[3px] bg-gray-200 rounded-full" />
        </div>

        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 flex-shrink-0">
          <div>
            <h2 className="font-serif text-2xl font-light italic text-[#2c2c2c]">Mi carrito</h2>
            {totalItems > 0 && (
              <p className="text-[11px] uppercase tracking-widest text-[#8a8779] mt-0.5">{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</p>
            )}
          </div>
          <button onClick={closeCart} className="p-2 text-gray-400 hover:text-[#2c2c2c] transition-colors">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="h-px bg-cream-light mx-6 flex-shrink-0" />

        {/* items */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="font-serif text-2xl font-light italic text-[#8a8779] mb-2">Vacío</p>
              <p className="text-[11px] uppercase tracking-widest text-[#6e6e62]">Agrega productos para comenzar</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4">
                {/* imagen */}
                <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-cream-light flex-shrink-0">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-[#F0EBE2] to-[#E4D9CB]" />
                  )}
                </div>

                {/* info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#2c2c2c] leading-snug line-clamp-2">{item.name}</p>
                  <p className="text-[13px] text-green font-light mt-1">
                    $ {(item.price * item.quantity).toLocaleString('es-CO')}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-[11px] text-[#8a8779]">$ {item.price.toLocaleString('es-CO')} c/u</p>
                  )}

                  {/* controles */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-2 border border-cream rounded-full px-3 py-1">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="text-gray-400 active:text-green transition-colors">
                        <Minus size={11} />
                      </button>
                      <span className="text-[12px] font-medium text-[#2c2c2c] w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="text-green active:opacity-60 transition-opacity">
                        <Plus size={11} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-200 hover:text-red-400 transition-colors">
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* footer */}
        {items.length > 0 && (
          <div className="px-6 pb-8 sm:pb-6 pt-4 flex-shrink-0">
            <div className="h-px bg-cream-light mb-5" />
            <div className="flex items-baseline justify-between mb-5">
              <span className="text-[11px] uppercase tracking-widest text-[#6e6e62]">Total</span>
              <span className="font-serif text-2xl font-light text-[#2c2c2c]">
                $ {totalPrice.toLocaleString('es-CO')}
              </span>
            </div>
            <button className="w-full py-4 bg-green text-white text-[11px] uppercase tracking-[0.2em] font-medium rounded-full hover:bg-green/90 transition-colors active:opacity-80">
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
