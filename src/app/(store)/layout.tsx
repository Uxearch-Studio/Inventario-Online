'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Feather, Flower2, Sparkles, Store, ShoppingBag } from 'lucide-react';
import { CartProvider, useCart } from '@/context/CartContext';
import CartButton from '@/components/store/CartButton';
import CartDrawer from '@/components/store/CartDrawer';

const navItems = [
  { href: '/sobre-mi', label: 'Sobre Mí', icon: Feather },
  { href: '/yoga', label: 'Yoga', icon: Flower2 },
  { href: '/coaching', label: 'Coaching', icon: Sparkles },
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
          <Link href="/shop" className="flex items-center gap-2.5">
            {/* pluma SVG reconstruida del logo */}
            <svg viewBox="0 0 50 62" className="h-10 w-auto flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 5 C16 3 30 6 38 14 C44 20 46 30 42 42 C40 50 38 56 40 58 C36 52 26 40 18 30 C12 22 8 14 10 5 Z" fill="#3d4a2f"/>
              <path d="M10 5 C16 18 26 38 40 58" stroke="#607050" strokeWidth="1.1" fill="none"/>
              <path d="M12 11 C17 9 24 9 29 11" stroke="#607050" strokeWidth="0.55" fill="none"/>
              <path d="M14 18 C20 15 28 14 33 16" stroke="#607050" strokeWidth="0.55" fill="none"/>
              <path d="M17 24 C23 21 31 20 36 22" stroke="#607050" strokeWidth="0.55" fill="none"/>
              <path d="M20 31 C25 28 32 27 37 30" stroke="#607050" strokeWidth="0.55" fill="none"/>
              <path d="M23 38 C27 35 33 35 37 38" stroke="#607050" strokeWidth="0.55" fill="none"/>
              <path d="M27 44 C30 43 34 42 37 45" stroke="#607050" strokeWidth="0.55" fill="none"/>
              <path d="M12 11 C11 14 10 16 9 18" stroke="#607050" strokeWidth="0.45" fill="none"/>
              <path d="M14 18 C13 21 12 23 11 25" stroke="#607050" strokeWidth="0.45" fill="none"/>
              <path d="M17 24 C16 27 15 29 14 31" stroke="#607050" strokeWidth="0.45" fill="none"/>
              <path d="M20 31 C19 34 18 36 18 38" stroke="#607050" strokeWidth="0.45" fill="none"/>
              <path d="M23 38 C22 41 22 43 22 45" stroke="#607050" strokeWidth="0.45" fill="none"/>
            </svg>
            <div className="flex flex-col">
              <span className="font-serif text-[22px] font-[500] leading-none text-[#3d4a2f]">ana</span>
              <span className="text-[8px] tracking-[0.22em] text-[#3d4a2f]/60 font-light mt-0.5">Awaken your magic</span>
            </div>
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
                className={`flex-1 relative flex flex-col items-center justify-center gap-1 transition-colors ${
                  active ? 'text-green' : 'text-[#6e6e62]'
                }`}
              >
                {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-green rounded-full" />}
                <item.icon size={19} strokeWidth={active ? 2 : 1.5} />
                <span className={`text-[10px] uppercase tracking-widest ${active ? 'font-medium' : ''}`}>{item.label}</span>
              </Link>
            );
          })}

          {/* Shop tab */}
          <Link
            href="/shop"
            className={`flex-1 relative flex flex-col items-center justify-center gap-1 transition-colors ${
              shopActive ? 'text-green' : 'text-[#6e6e62]'
            }`}
          >
            {shopActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-green rounded-full" />}
            <Store size={19} strokeWidth={shopActive ? 2 : 1.5} />
            <span className={`text-[10px] uppercase tracking-widest ${shopActive ? 'font-medium' : ''}`}>Shop</span>
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
