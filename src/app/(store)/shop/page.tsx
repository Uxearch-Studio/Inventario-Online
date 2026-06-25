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
        <div className="flex flex-col items-center justify-center py-14 text-center">
          {/* ilustración loto */}
          <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-44 h-44 mb-7">
            {/* pétalos exteriores — de atrás hacia adelante */}
            <path d="M 0 0 C -13 -16 -11 -40 0 -52 C 11 -40 13 -16 0 0"
              transform="translate(80 90) rotate(-72)" fill="#EDE5D8" stroke="#525C44" strokeWidth="0.65"/>
            <path d="M 0 0 C -13 -16 -11 -40 0 -52 C 11 -40 13 -16 0 0"
              transform="translate(80 90) rotate(72)" fill="#EDE5D8" stroke="#525C44" strokeWidth="0.65"/>
            <path d="M 0 0 C -13 -16 -11 -40 0 -52 C 11 -40 13 -16 0 0"
              transform="translate(80 90) rotate(-36)" fill="#E8DFD0" stroke="#525C44" strokeWidth="0.65"/>
            <path d="M 0 0 C -13 -16 -11 -40 0 -52 C 11 -40 13 -16 0 0"
              transform="translate(80 90) rotate(36)" fill="#E8DFD0" stroke="#525C44" strokeWidth="0.65"/>
            <path d="M 0 0 C -13 -16 -11 -40 0 -52 C 11 -40 13 -16 0 0"
              transform="translate(80 90) rotate(0)" fill="#F0EBE2" stroke="#525C44" strokeWidth="0.65"/>
            {/* pétalos interiores */}
            <path d="M 0 0 C -8 -22 -6 -48 0 -62 C 6 -48 8 -22 0 0"
              transform="translate(80 90) rotate(-22)" fill="#F8F4EE" stroke="#525C44" strokeWidth="0.65"/>
            <path d="M 0 0 C -8 -22 -6 -48 0 -62 C 6 -48 8 -22 0 0"
              transform="translate(80 90) rotate(22)" fill="#F8F4EE" stroke="#525C44" strokeWidth="0.65"/>
            <path d="M 0 0 C -8 -22 -6 -48 0 -62 C 6 -48 8 -22 0 0"
              transform="translate(80 90) rotate(0)" fill="white" stroke="#525C44" strokeWidth="0.65"/>
            {/* centro */}
            <circle cx="80" cy="90" r="7.5" fill="#DDCDAE" stroke="#525C44" strokeWidth="0.65"/>
            <circle cx="80" cy="90" r="3.2" fill="#525C44" opacity="0.28"/>
            {/* agua */}
            <path d="M 44 110 Q 62 105 80 110 Q 98 115 116 110" stroke="#525C44" strokeWidth="0.7" opacity="0.28"/>
            <path d="M 38 117 Q 59 112 80 117 Q 101 122 122 117" stroke="#525C44" strokeWidth="0.5" opacity="0.16"/>
            {/* detalles dorados */}
            <circle cx="50" cy="69" r="1.5" fill="#CEBA6F" opacity="0.55"/>
            <circle cx="112" cy="66" r="1.5" fill="#CEBA6F" opacity="0.45"/>
            <circle cx="40" cy="90" r="1" fill="#525C44" opacity="0.2"/>
            <circle cx="121" cy="84" r="1" fill="#525C44" opacity="0.2"/>
          </svg>

          <p className="font-serif text-xl font-light text-[#8a8779] italic">Sin resultados</p>
          {search ? (
            <>
              <p className="text-[12px] text-[#8a8779] mt-1.5 mb-5">Intenta con otro término de búsqueda</p>
              <button
                onClick={() => setSearch('')}
                className="text-[11px] uppercase tracking-widest text-green border-b border-green/30 pb-0.5 hover:opacity-70 transition-opacity"
              >
                Limpiar búsqueda
              </button>
            </>
          ) : (
            <p className="text-[12px] text-[#8a8779] mt-1.5">No hay productos en esta categoría aún</p>
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
