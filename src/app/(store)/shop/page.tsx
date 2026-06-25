'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { mockProducts } from '@/lib/mockProducts';
import type { Product, ProductCategory } from '@/types/product';
import { CATEGORIES } from '@/types/product';
import StoreProductCard from '@/components/store/StoreProductCard';

const ALL = 'Todos';
type Filter = typeof ALL | ProductCategory;

const configured = !!(
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY
);

function toProduct(id: string, d: Record<string, unknown>): Product {
  return {
    id,
    name: d.name as string,
    price: d.price as number,
    description: d.description as string,
    imageUrl: (d.imageUrl as string) ?? '',
    category: d.category as ProductCategory | undefined,
    unitsSold: (d.unitsSold as number) ?? 0,
    status: (d.status as Product['status']) ?? 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export default function ShopPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>(ALL);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!configured) {
      setAllProducts(mockProducts);
      setLoading(false);
      return;
    }
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q,
      snap => {
        setAllProducts(snap.docs.map(d => toProduct(d.id, d.data() as Record<string, unknown>)).filter(p => p.status === 'active'));
        setLoading(false);
      },
      () => { setAllProducts(mockProducts); setLoading(false); }
    );
    return () => unsub();
  }, []);

  const filtered = useMemo(() => allProducts.filter(p => {
    const matchCat = activeFilter === ALL || p.category === activeFilter;
    const q = search.toLowerCase();
    return matchCat && (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }), [allProducts, search, activeFilter]);

  return (
    <div>
      {/* buscador minimal */}
      <div className="relative mb-6">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          type="search"
          placeholder="Buscar productos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-cream-light rounded-full pl-10 pr-10 py-2.5 text-sm text-[#1c1c1c] placeholder-gray-300 focus:outline-none focus:border-green/40 transition-colors"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
            <X size={14} />
          </button>
        )}
      </div>

      {/* categorías — estilo texto con indicador */}
      <div className="flex gap-0 overflow-x-auto no-scrollbar -mx-4 px-4 mb-7">
        {([ALL, ...CATEGORIES] as Filter[]).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`flex-shrink-0 px-3 py-2 text-[11px] uppercase tracking-wider font-medium transition-all border-b-2 ${
              activeFilter === cat
                ? 'text-green border-green'
                : 'text-[#6e6e62] border-transparent hover:text-[#3a3a3a]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* loading */}
      {loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <div className="bg-cream-light aspect-[3/4] animate-pulse rounded-2xl" />
              <div className="mt-3 space-y-2">
                <div className="h-3 w-1/2 bg-cream-light rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-cream-light rounded animate-pulse" />
                <div className="h-3 w-1/3 bg-cream-light rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* vacío */}
      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="font-serif text-2xl font-light text-[#8a8779] italic mb-2">Sin resultados</p>
          {search && (
            <button onClick={() => setSearch('')} className="text-xs uppercase tracking-widest text-green mt-3">
              Limpiar búsqueda
            </button>
          )}
        </div>
      )}

      {/* grid */}
      {!loading && filtered.length > 0 && (
        <>
          <p className="text-[11px] uppercase tracking-widest text-[#8a8779] mb-5">
            {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
            {filtered.map(p => (
              <StoreProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
