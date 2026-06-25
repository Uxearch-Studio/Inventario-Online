import { Brain, Flower2, Sparkles, Leaf, Flame } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ProductCategory } from '@/types/product';

export const categoryIcons: Record<ProductCategory, LucideIcon> = {
  'Mundo Mente':      Brain,
  'Mundo Cuerpo':     Flower2,
  'Mundo Energía':    Sparkles,
  'Mundo Naturaleza': Leaf,
  'Mundo Alma':       Flame,
};

export const categoryShortLabels: Record<ProductCategory, string> = {
  'Mundo Mente':      'Mente',
  'Mundo Cuerpo':     'Cuerpo',
  'Mundo Energía':    'Energía',
  'Mundo Naturaleza': 'Naturaleza',
  'Mundo Alma':       'Alma',
};
