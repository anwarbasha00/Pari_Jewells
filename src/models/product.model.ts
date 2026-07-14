import mongoose, { Schema, models } from "mongoose";

interface Product {
  name: string;
  description: string;
  price:number
  originalPrice: number;
  discount:number;
  category: string;
  slug: string;
  images?: {
  public_id: string;
  url: string;
}[];
  featured: Boolean;
  bestSeller: Boolean;
  newArrival: Boolean;
  inStock: Boolean;
  stock:number;
  keywords: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
    },
    slug: {
    type: String,
    required: true,
    unique: true,
  },

    images: [
  {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
],
    

    keywords: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    newArrival: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    inStock: {
      type: Boolean,
      default: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const Product =
  models.Product || mongoose.model<Product>("Product", productSchema);

export default Product;