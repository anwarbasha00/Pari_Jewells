export interface ProductType {
  _id: string;

  slug: string;

  name: string;

  description: string;

  category: string;

  price: number;

  originalPrice: number;

  discount: number;

  images: {
    public_id: string;
    url: string;
  }[];

  featured: boolean;

  bestSeller: boolean;

  newArrival: boolean;

  inStock: boolean;

  stock: number;

  keywords: string[];
}