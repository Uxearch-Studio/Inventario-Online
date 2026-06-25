'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Brain, Flower2, Sparkles, Leaf, Flame, Feather, type LucideIcon } from 'lucide-react';
import type { ProductCategory } from '@/types/product';

type MundoData = {
  key: ProductCategory;
  name: string;
  quote: string;
  desc: React.ReactNode;
  bg: string;
  accent: string;
  icon: LucideIcon;
};

const mundosData: MundoData[] = [
  {
    key: 'Mundo Mente',
    name: 'Mente',
    quote: 'Cinco minutos de respiración o escritura consciente pueden cambiar por completo tu estado mental.',
    desc: <>El <strong className="font-semibold text-white">Mundo Mente</strong> reúne productos para apoyar la claridad mental y la atención plena.</>,
    bg: 'from-[#6e6356] to-[#3a2f22]',
    accent: '#c8b898',
    icon: Brain,
  },
  {
    key: 'Mundo Cuerpo',
    name: 'Cuerpo',
    quote: 'Escuchar tu cuerpo es una de las formas más simples de volver al presente.',
    desc: <>El <strong className="font-semibold text-white">Mundo Cuerpo</strong> reúne productos pensados para acompañar prácticas de autocuidado y conexión corporal.</>,
    bg: 'from-[#5e5c40] to-[#323018]',
    accent: '#c0b870',
    icon: Flower2,
  },
  {
    key: 'Mundo Energía',
    name: 'Energía',
    quote: 'El cristal acompaña, pero la intención es la que dirige la energía y da sentido al ritual.',
    desc: <>El <strong className="font-semibold text-white">Mundo Energía</strong> reúne herramientas energéticas que acompañan procesos de limpieza, protección e intención.</>,
    bg: 'from-[#6a5466] to-[#382038]',
    accent: '#c8a8c0',
    icon: Sparkles,
  },
  {
    key: 'Mundo Naturaleza',
    name: 'Naturaleza',
    quote: 'Volver a lo natural siempre es un regalo para tu cuerpo.',
    desc: <>En nuestro <strong className="font-semibold text-white">Mundo Naturaleza</strong> encuentras aliados naturales que acompañan tu bienestar día a día.</>,
    bg: 'from-[#465c34] to-[#223214]',
    accent: '#a8c880',
    icon: Leaf,
  },
  {
    key: 'Mundo Alma',
    name: 'Alma',
    quote: 'Encender incienso o palo santo ayuda a cerrar ciclos, iniciar rituales y crear ambientes de calma y presencia.',
    desc: <>El <strong className="font-semibold text-white">Mundo Alma</strong> reúne herramientas aromáticas para rituales de limpieza, enfoque y conexión.</>,
    bg: 'from-[#6a5438] to-[#382010]',
    accent: '#c8a870',
    icon: Flame,
  },
];

export default function SobreMiPage() {
  const [heroError, setHeroError] = useState(false);
  const [selected, setSelected] = useState<MundoData>(mundosData[0]);
  const [fading, setFading] = useState(false);
  const touchStartX = useRef(0);

  const selectedIndex = mundosData.findIndex(m => m.key === selected.key);

  const pickMundo = (m: MundoData) => {
    if (m.key === selected.key) return;
    setFading(true);
    setTimeout(() => { setSelected(m); setFading(false); }, 150);
  };

  const goPrev = () => { if (selectedIndex > 0) pickMundo(mundosData[selectedIndex - 1]); };
  const goNext = () => { if (selectedIndex < mundosData.length - 1) pickMundo(mundosData[selectedIndex + 1]); };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 48) return;
    if (dx < 0) goNext(); else goPrev();
  };

  const Icon = selected.icon;

  return (
    <div>
      {/* Hero full bleed */}
      <div className="-mx-4 -mt-6 relative aspect-[4/5] sm:aspect-video overflow-hidden bg-gradient-to-br from-[#7a8c68] to-[#c0b49a]">
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

      {/* Nuestros Mundos */}
      <div className="pb-12">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#6e6e62] font-medium mb-5">
          Nuestros mundos
        </p>

        {/* selector — pills con scroll horizontal */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 mb-6">
          {mundosData.map(m => {
            const active = selected.key === m.key;
            return (
              <button
                key={m.key}
                onClick={() => pickMundo(m)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all duration-200 active:scale-95 ${
                  active
                    ? 'bg-green text-white border-green shadow-sm'
                    : 'text-[#6e6e62] border-[#d4cbbf] bg-white hover:border-green/40'
                }`}
              >
                <m.icon size={11} strokeWidth={active ? 2 : 1.6} />
                <span className="text-[10px] uppercase tracking-wider font-medium whitespace-nowrap">{m.name}</span>
              </button>
            );
          })}
        </div>

        {/* panel con swipe */}
        <div
          className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${selected.bg} transition-opacity duration-150 ${fading ? 'opacity-0' : 'opacity-100'}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* textura: glow blanco superior-izquierda */}
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl pointer-events-none" />

          {/* textura: ícono watermark fondo */}
          <div className="absolute -bottom-8 -right-8 pointer-events-none select-none" style={{ opacity: 0.09 }}>
            <Icon size={210} strokeWidth={0.7} className="text-white" />
          </div>

          {/* línea de acento superior */}
          <div
            className="absolute top-0 left-0 right-0 h-px opacity-40"
            style={{ background: `linear-gradient(to right, transparent, ${selected.accent}, transparent)` }}
          />

          <div className="relative px-7 pt-10 pb-8">

            {/* título — una sola línea */}
            <div className="mb-6">
              <p className="font-serif italic font-light text-white leading-tight whitespace-nowrap" style={{ fontSize: '26px' }}>
                Mundo{' '}
                <span
                  className="not-italic font-light tracking-[0.22em]"
                  style={{ fontSize: '20px', verticalAlign: 'baseline' }}
                >
                  {selected.name.toUpperCase()}
                </span>
              </p>
              <div
                className="mt-3 w-10 h-px opacity-50"
                style={{ backgroundColor: selected.accent }}
              />
            </div>

            {/* cita */}
            <p className="text-[13px] font-light text-white leading-relaxed mb-7 max-w-[280px]">
              &ldquo;{selected.quote}&rdquo;
            </p>

            {/* pluma */}
            <div className="flex mb-6">
              <Feather size={16} strokeWidth={1} className="text-white/50" />
            </div>

            {/* descripción */}
            <p className="text-[14px] text-white leading-relaxed">
              {selected.desc}
            </p>

            {/* CTA */}
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-white border-b border-white/40 pb-0.5 hover:border-white/80 transition-colors"
            >
              Explorar {selected.name}
              <span className="text-[12px] leading-none">→</span>
            </Link>
          </div>
        </div>

        {/* dots de navegación */}
        <div className="flex justify-center items-center gap-2 mt-5">
          {mundosData.map((m, i) => (
            <button
              key={m.key}
              onClick={() => pickMundo(m)}
              className={`rounded-full transition-all duration-200 ${
                selectedIndex === i
                  ? 'w-5 h-1.5 bg-green'
                  : 'w-1.5 h-1.5 bg-[#d4cbbf] hover:bg-[#8a8779]'
              }`}
            />
          ))}
        </div>

        {/* hint de swipe — solo en primer mundo */}
        {selectedIndex === 0 && (
          <p className="text-center text-[10px] text-[#8a8779] uppercase tracking-wider mt-3 select-none">
            desliza para explorar →
          </p>
        )}
      </div>
    </div>
  );
}
