'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Flame, Star, ShoppingBag } from 'lucide-react';
import { CartProvider } from '@/context/CartContext';
import CartButton from '@/components/store/CartButton';
import CartDrawer from '@/components/store/CartDrawer';

const nav = [
  { href: '/sobre-mi', label: 'Sobre Mí', icon: User },
  { href: '/yoga', label: 'Yoga', icon: Flame },
  { href: '/coaching', label: 'Coaching', icon: Star },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
];

function StoreShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
              {nav.map(item => {
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
        <div className="flex">
          {nav.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-[10px] font-semibold transition-colors ${
                  active ? 'text-green' : 'text-gray-400'
                }`}
              >
                <item.icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                {item.label}
              </Link>
            );
          })}
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
