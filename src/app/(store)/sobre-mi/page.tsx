'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Brain, Flower2, Sparkles, Leaf, Flame, Feather, type LucideIcon } from 'lucide-react';
import type { ProductCategory } from '@/types/product';

type MundoData = {
  key: ProductCategory;
  name: string;
  quote: string;
  desc: React.ReactNode;
  gradient: string;
  icon: LucideIcon;
};

const mundosData: MundoData[] = [
  {
    key: 'Mundo Mente',
    name: 'Mente',
    quote: 'Cinco minutos de respiración o escritura consciente pueden cambiar por completo tu estado mental.',
    desc: <>El <strong className="font-semibold text-white">Mundo Mente</strong> reúne productos para apoyar la claridad mental y la atención plena.</>,
    gradient: 'from-[#bfb090] via-[#c8b898] to-[#a89870]',
    icon: Brain,
  },
  {
    key: 'Mundo Cuerpo',
    name: 'Cuerpo',
    quote: 'Escuchar tu cuerpo es una de las formas más simples de volver al presente.',
    desc: <>El <strong className="font-semibold text-white">Mundo Cuerpo</strong> reúne productos pensados para acompañar prácticas de autocuidado y conexión corporal.</>,
    gradient: 'from-[#b8b090] via-[#c0b898] to-[#a0a080]',
    icon: Flower2,
  },
  {
    key: 'Mundo Energía',
    name: 'Energía',
    quote: 'El cristal acompaña, pero la intención es la que dirige la energía y da sentido al ritual.',
    desc: <>El <strong className="font-semibold text-white">Mundo Energía</strong> reúne herramientas energéticas que acompañan procesos de limpieza, protección e intención.</>,
    gradient: 'from-[#c0a8a8] via-[#c8b0b0] to-[#a89090]',
    icon: Sparkles,
  },
  {
    key: 'Mundo Naturaleza',
    name: 'Naturaleza',
    quote: 'Volver a lo natural siempre es un regalo para tu cuerpo.',
    desc: <>En nuestro <strong className="font-semibold text-white">Mundo Naturaleza</strong> encuentras aliados naturales que acompañan tu bienestar día a día.</>,
    gradient: 'from-[#909870] via-[#9ca878] to-[#808860]',
    icon: Leaf,
  },
  {
    key: 'Mundo Alma',
    name: 'Alma',
    quote: 'Encender incienso o palo santo ayuda a cerrar ciclos, iniciar rituales y crear ambientes de calma y presencia.',
    desc: <>El <strong className="font-semibold text-white">Mundo Alma</strong> reúne herramientas aromáticas para rituales de limpieza, enfoque y conexión.</>,
    gradient: 'from-[#b89870] via-[#c0a878] to-[#987858]',
    icon: Flame,
  },
];

export default function SobreMiPage() {
  const [heroError, setHeroError] = useState(false);
  const [selected, setSelected] = useState<MundoData>(mundosData[0]);
  const [fading, setFading] = useState(false);

  const pickMundo = (m: MundoData) => {
    if (m.key === selected.key) return;
    setFading(true);
    setTimeout(() => { setSelected(m); setFading(false); }, 140);
  };

  return (
    <div>
      {/* Hero full bleed */}
      <div className="-mx-4 -mt-6 relative aspect-[4/5] sm:aspect-video overflow-hidden bg-gradient-to-br from-[#7a8c68] to-[#c0b49a]">
        {!heroError && (
          <Image src="/Ana.png" alt="Ana en su tienda" fill className="object-cover object-top" priority onError={() => setHeroError(true)} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 px-7 pb-9 max-w-[300px]">
          <p className="font-serif italic font-light text-white text-[15px] leading-relaxed">
            "Cada objeto que eliges es una intención que siembras en tu vida"
          </p>
        </div>
      </div>

      {/* Awaken Your Magic */}
      <div className="pt-10 pb-10">
        <div className="flex items-center gap-3 mb-7">
          <h2 className="font-serif text-[22px] font-[500] text-[#2c2c2c] whitespace-nowrap">Awaken Your Magic</h2>
          <Sparkles size={13} className="text-[#CEBA6F] flex-shrink-0" strokeWidth={1.5} />
          <div className="flex-1 h-px bg-cream" />
        </div>
        <div className="space-y-3">
          <p className="text-[14px] text-[#3a3a3a] leading-relaxed">
            En ANA creemos que el bienestar comienza cuando{' '}
            <strong className="font-medium text-[#2c2c2c]">cuerpo, mente y alma</strong> vuelven a alinearse.
          </p>
          <p className="text-[14px] text-[#3a3a3a] leading-relaxed">
            Por eso creamos un espacio donde cada producto es una herramienta de{' '}
            <strong className="font-medium text-[#2c2c2c]">conexión, presencia y transformación.</strong>{' '}
            Aquí eliges rituales, energía y momentos para ti.
          </p>
        </div>
      </div>

      {/* Nuestros Mundos — interactivo */}
      <div className="pb-10">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#6e6e62] font-medium mb-6">
          Nuestros mundos
        </p>

        {/* selector de 5 mundos */}
        <div className="flex justify-between mb-5">
          {mundosData.map(m => {
            const active = selected.key === m.key;
            return (
              <button
                key={m.key}
                onClick={() => pickMundo(m)}
                className={`flex flex-col items-center gap-1.5 flex-1 transition-colors ${active ? 'text-green' : 'text-[#8a8779]'}`}
              >
                <m.icon size={21} strokeWidth={active ? 2 : 1.5} />
                <span className={`text-[9px] uppercase tracking-wider leading-none ${active ? 'font-medium' : ''}`}>
                  {m.name}
                </span>
                <span className={`h-0.5 rounded-full transition-all duration-200 ${active ? 'w-4 bg-green' : 'w-0 bg-transparent'}`} />
              </button>
            );
          })}
        </div>

        {/* panel de contenido */}
        <div className={`rounded-2xl bg-gradient-to-b ${selected.gradient} px-7 pt-10 pb-8 transition-opacity duration-150 ${fading ? 'opacity-0' : 'opacity-100'}`}>

          {/* título tipo referencia */}
          <div className="text-center mb-6">
            <p className="font-serif text-[32px] italic font-light text-white leading-none">Mundo</p>
            <p className="text-[22px] font-[300] tracking-[0.4em] text-white leading-tight mt-1">
              {selected.name.toUpperCase()}
            </p>
          </div>

          {/* cita */}
          <p className="text-[13px] font-light text-white/85 leading-relaxed text-center mb-7 max-w-[280px] mx-auto">
            {selected.quote}
          </p>

          {/* pluma separadora */}
          <div className="flex justify-center mb-7">
            <Feather size={20} strokeWidth={1} className="text-white/55" />
          </div>

          {/* descripción */}
          <p className="text-[14px] text-white/90 leading-relaxed">
            {selected.desc}
          </p>

          {/* CTA */}
          <Link
            href="/shop"
            className="mt-8 inline-block text-[11px] uppercase tracking-[0.22em] text-white/90 border-b border-white/40 pb-0.5 hover:text-white hover:border-white transition-colors"
          >
            Explorar {selected.name} →
          </Link>
        </div>
      </div>
    </div>
  );
}
