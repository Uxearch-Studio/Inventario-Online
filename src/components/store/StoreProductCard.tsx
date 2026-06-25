import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';

const categoryColors: Record<string, string> = {
  'Mundo Mente': 'bg-blue-50 text-blue-600',
  'Mundo Cuerpo': 'bg-green/10 text-green',
  'Mundo Energía': 'bg-gold-light text-yellow-700',
  'Mundo Naturaleza': 'bg-emerald-50 text-emerald-600',
  'Mundo Alma': 'bg-purple-50 text-purple-600',
};

export default function StoreProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream active:scale-[0.98] transition-transform">
        {/* imagen */}
        <div className="relative w-full aspect-[3/4] bg-cream overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-cream to-[#e8dccc]">
              <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#525C44" strokeWidth="1.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-xs text-green/50 font-medium">Ana Holística</span>
            </div>
          )}
        </div>

        {/* info */}
        <div className="p-3">
          {product.category && (
            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5 ${categoryColors[product.category] ?? 'bg-gray-100 text-gray-500'}`}>
              {product.category}
            </span>
          )}
          <h3 className="text-sm font-semibold text-black leading-tight line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-green font-bold text-sm">
            $ {product.price.toLocaleString('es-CO')}
          </p>
        </div>
      </div>
    </Link>
  );
}
