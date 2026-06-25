'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Brain, Flower2, Sparkles, Leaf, Flame } from 'lucide-react';

const mundos = [
  { label: 'Mundo Mente',      icon: Brain    },
  { label: 'Mundo Cuerpo',     icon: Flower2  },
  { label: 'Mundo Energía',    icon: Sparkles },
  { label: 'Mundo Naturaleza', icon: Leaf     },
  { label: 'Mundo Alma',       icon: Flame    },
];

export default function SobreMiPage() {
  const [heroError, setHeroError] = useState(false);

  return (
    <div>
      {/* Hero — full bleed */}
      <div className="-mx-4 relative aspect-[4/5] sm:aspect-video overflow-hidden bg-gradient-to-br from-[#7a8c68] to-[#c0b49a]">
        {!heroError && (
          <Image
            src="/Ana.png"
            alt="Ana en su tienda"
            fill
            className="object-cover object-top"
            priority
            onError={() => setHeroError(true)}
          />
        )}
        {/* gradiente más denso abajo para tapar el texto quemado en la foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 px-7 pb-9 max-w-[300px]">
          <p className="font-serif italic font-light text-white text-[15px] leading-relaxed">
            "Cada objeto que eliges es una intención que siembras en tu vida"
          </p>
        </div>
      </div>

      {/* Awaken Your Magic */}
      <div className="pt-10 pb-8">

        {/* encabezado con línea decorativa */}
        <div className="flex items-center gap-3 mb-8">
          <h2 className="font-serif text-[22px] font-[500] text-[#2c2c2c] whitespace-nowrap">
            Awaken Your Magic
          </h2>
          <Sparkles size={13} className="text-[#CEBA6F] flex-shrink-0" strokeWidth={1.5} />
          <div className="flex-1 h-px bg-cream" />
        </div>

        {/* grid: descripción + mundos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

          {/* descripción */}
          <div className="space-y-3.5">
            <p className="text-[14px] text-[#3a3a3a] leading-relaxed">
              En ANA creemos que el bienestar comienza cuando{' '}
              <strong className="font-medium text-[#2c2c2c]">cuerpo, mente y alma</strong>{' '}
              vuelven a alinearse.
            </p>
            <p className="text-[14px] text-[#3a3a3a] leading-relaxed">
              Por eso creamos un espacio donde cada producto es una herramienta de{' '}
              <strong className="font-medium text-[#2c2c2c]">
                conexión, presencia y transformación.
              </strong>{' '}
              Aquí eliges rituales, energía y momentos para ti.
            </p>
          </div>

          {/* nuestros mundos */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6e6e62] font-medium mb-5">
              Nuestros mundos
            </p>
            <ul className="space-y-4">
              {mundos.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <Link href="/shop" className="flex items-center gap-3 group">
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className="text-green flex-shrink-0 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-[14px] text-[#3a3a3a] border-b border-[#d4cbbf] pb-0.5 group-hover:border-green group-hover:text-green transition-colors">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
