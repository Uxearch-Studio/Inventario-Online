'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Flame, Star, ShoppingBag } from 'lucide-react';
import { CartProvider, useCart } from '@/context/CartContext';
import CartButton from '@/components/store/CartButton';
import CartDrawer from '@/components/store/CartDrawer';

const navItems = [
  { href: '/sobre-mi', label: 'Sobre Mí', icon: User },
  { href: '/yoga', label: 'Yoga', icon: Flame },
  { href: '/coaching', label: 'Coaching', icon: Star },
];

function StoreShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

  const shopActive = pathname === '/shop' || pathname.startsWith('/shop/');

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-cream">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/shop" className="flex items-center gap-1.5">
            <span className="text-gold font-bold text-lg tracking-tight">Ana</span>
            <span className="text-green font-light text-lg tracking-tight">Holística</span>
          </Link>

          <div className="flex items-center gap-1">
            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-1 mr-2">
              {[...navItems, { href: '/shop', label: 'Shop', icon: ShoppingBag }].map(item => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active ? 'text-green bg-green/10' : 'text-gray-500 hover:text-green'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <CartButton />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-5 pb-28 sm:pb-8">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-cream z-20">
        <div className="flex h-16">
          {/* Sobre Mí, Yoga, Coaching */}
          {navItems.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors ${
                  active ? 'text-green' : 'text-gray-400'
                }`}
              >
                <item.icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                {item.label}
              </Link>
            );
          })}

          {/* Shop — abre carrito si hay items, navega al shop si no */}
          <button
            onClick={() => totalItems > 0 ? openCart() : undefined}
            className="flex-1 relative flex flex-col items-center justify-center gap-0.5"
          >
            <Link
              href="/shop"
              className={`flex flex-col items-center justify-center gap-0.5 w-full h-full text-[10px] font-semibold transition-colors ${
                shopActive ? 'text-green' : 'text-gray-400'
              }`}
            >
              <div className="relative">
                <ShoppingBag size={22} strokeWidth={shopActive ? 2.5 : 1.8} />
                <span className={`absolute -top-2 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[10px] font-bold leading-none ${
                  totalItems > 0 ? 'bg-gold text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {totalItems}
                </span>
              </div>
              Shop
            </Link>
          </button>
        </div>
      </nav>

      <CartDrawer />
    </div>
  );
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <StoreShell>{children}</StoreShell>
    </CartProvider>
  );
}
