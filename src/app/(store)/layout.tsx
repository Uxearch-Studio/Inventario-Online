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
  const { totalItems } = useCart();
  const shopActive = pathname === '/shop' || pathname.startsWith('/shop/');

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-cream-light">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/shop" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-light italic tracking-wide text-green">Ana</span>
            <span className="font-serif text-2xl font-[300] tracking-widest text-[#3a3a3a]">Holística</span>
          </Link>

          <div className="flex items-center gap-2">
            <nav className="hidden sm:flex items-center gap-6 mr-4">
              {[...navItems, { href: '/shop', label: 'Shop', icon: ShoppingBag }].map(item => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-xs uppercase tracking-widest transition-colors ${
                      active ? 'text-green' : 'text-gray-400 hover:text-green'
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
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pt-6 pb-28 sm:pb-10">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-cream-light z-20">
        <div className="flex h-16">
          {navItems.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                  active ? 'text-green' : 'text-[#6e6e62]'
                }`}
              >
                <item.icon size={19} strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-widest">{item.label}</span>
              </Link>
            );
          })}

          {/* Shop tab con badge */}
          <Link
            href="/shop"
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
              shopActive ? 'text-green' : 'text-[#6e6e62]'
            }`}
          >
            <div className="relative">
              <ShoppingBag size={19} strokeWidth={1.5} />
              <span className={`absolute -top-2 -right-2.5 min-w-[16px] h-4 px-0.5 rounded-full flex items-center justify-center text-[9px] font-semibold leading-none transition-colors ${
                totalItems > 0 ? 'bg-gold text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {totalItems}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest">Shop</span>
          </Link>
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
