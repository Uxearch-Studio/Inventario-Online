'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { mockProducts } from '@/lib/mockProducts';
import type { ProductCategory } from '@/types/product';
import { CATEGORIES } from '@/types/product';
import StoreProductCard from '@/components/store/StoreProductCard';

const ALL = 'Todos';
type Filter = typeof ALL | ProductCategory;

export default function ShopPage() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<Filter>(ALL);

  const filtered = useMemo(() => {
    return mockProducts.filter(p => {
      const matchCat = active === ALL || p.category === active;
      const q = query.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchCat && matchSearch && p.status === 'active';
    });
  }, [query, active]);

  return (
    <div>
      {/* buscador */}
      <div className="relative mb-4">
        <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          placeholder="Buscar productos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-white border border-cream rounded-2xl pl-10 pr-10 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <X size={16} />
          </button>
        )}
      </div>

      {/* categorias */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-none -mx-4 px-4">
        {([ALL, ...CATEGORIES] as Filter[]).map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-colors border ${
              active === cat
                ? 'bg-green text-white border-green'
                : 'bg-white text-gray-600 border-cream hover:border-green/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* resultados */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 font-medium">No encontramos productos</p>
          {query && (
            <button onClick={() => setQuery('')} className="mt-3 text-sm text-green font-medium">
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
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
