export type ProductStatus = 'active' | 'archived' | 'unavailable' | 'low_stock';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  unitsSold: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  name: string;
  price: string;
  description: string;
  imageFile?: File;
  imageUrl?: string;
  status: ProductStatus;
}

export const STATUS_LABELS: Record<ProductStatus, string> = {
  active: 'Activo',
  archived: 'Archivado',
  unavailable: 'No disponible',
  low_stock: 'Poco stock',
};
