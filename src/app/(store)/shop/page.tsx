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
    const unsub = onSnapshot(
      q,
      snap => {
        const docs = snap.docs.map(d => toProduct(d.id, d.data() as Record<string, unknown>));
        setAllProducts(docs.filter(p => p.status === 'active'));
        setLoading(false);
      },
      () => {
        setAllProducts(mockProducts);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    return allProducts.filter(p => {
      const matchCat = activeFilter === ALL || p.category === activeFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [allProducts, search, activeFilter]);

  return (
    <div>
      {/* buscador */}
      <div className="relative mb-4">
        <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Buscar productos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-cream rounded-2xl pl-10 pr-10 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <X size={16} />
          </button>
        )}
      </div>

      {/* categorias */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
        {([ALL, ...CATEGORIES] as Filter[]).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-colors border ${
              activeFilter === cat
                ? 'bg-green text-white border-green'
                : 'bg-white text-gray-600 border-cream hover:border-green/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* loading */}
      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-cream rounded-2xl aspect-[3/4] animate-pulse" />
          ))}
        </div>
      )}

      {/* sin resultados */}
      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 font-medium">No encontramos productos</p>
          {search && (
            <button onClick={() => setSearch('')} className="mt-3 text-sm text-green font-medium">
              Limpiar búsqueda
            </button>
          )}
        </div>
      )}

      {/* grid */}
      {!loading && filtered.length > 0 && (
        <>
          <p className="text-xs text-gray-400 mb-3">{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filtered.map(p => (
              <StoreProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
