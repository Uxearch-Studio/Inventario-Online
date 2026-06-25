'use client';

import Image from 'next/image';
import { X, Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, totalItems, totalPrice, removeItem, updateQty, isOpen, closeCart } = useCart();

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}>
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeCart}
      />

      {/* drawer — bottom sheet en móvil, panel derecho en desktop */}
      <div
        className={`absolute bottom-0 left-0 right-0 sm:inset-y-0 sm:left-auto sm:right-0 sm:w-96 bg-white rounded-t-3xl sm:rounded-none shadow-2xl flex flex-col max-h-[88vh] sm:max-h-none transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-x-full'
        }`}
      >
        {/* handle móvil */}
        <div className="sm:hidden flex justify-center pt-3 pb-0">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-green" />
            <h2 className="font-bold text-black text-base">Mi carrito</h2>
            {totalItems > 0 && (
              <span className="bg-green text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 rounded-xl hover:bg-surface transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* items */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-cream" />
              </div>
              <p className="text-gray-600 font-semibold">Tu carrito está vacío</p>
              <p className="text-sm text-gray-400 mt-1">Agrega productos para comenzar</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 items-start">
                {/* imagen */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-cream flex-shrink-0">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-cream to-[#e8dccc]" />
                  )}
                </div>

                {/* info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-black leading-tight line-clamp-2">{item.name}</p>
                  <p className="text-green font-bold text-sm mt-0.5">
                    $ {(item.price * item.quantity).toLocaleString('es-CO')}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-gray-400">$ {item.price.toLocaleString('es-CO')} c/u</p>
                  )}

                  {/* controles */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-cream transition-colors active:scale-95"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-bold w-6 text-center text-black">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-cream transition-colors active:scale-95"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* footer */}
        {items.length > 0 && (
          <div className="px-5 pt-4 pb-6 sm:pb-4 border-t border-cream flex-shrink-0 bg-white">
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-500 text-sm">Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
              <span className="font-bold text-black text-lg">$ {totalPrice.toLocaleString('es-CO')}</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Envío calculado al finalizar</p>
            <button className="w-full py-4 bg-green text-white font-bold rounded-2xl text-base active:opacity-80 transition-opacity">
              Ir al checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
