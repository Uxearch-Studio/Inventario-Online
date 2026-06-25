'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-cream-light">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/shop">
            <Image src="/Logo.png" alt="Ana Holística" height={40} width={160} className="h-10 w-auto object-contain" priority />
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
