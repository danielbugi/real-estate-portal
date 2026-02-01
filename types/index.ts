// TypeScript type definitions for Cyprus Real Estate project

export interface Property {
  _id?: string;
  title: string;
  titleHe: string;
  price: number;
  priceILS: number;
  location: {
    city: string;
    cityHe: string;
    area: string;
    areaHe: string;
    coordinates: [number, number];
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    sqm: number;
    pool: boolean;
    seaview?: boolean;
    parking?: boolean;
  };
  description: string;
  descriptionHe: string;
  images: string[];
  roi: {
    rentalYield: number;
    appreciation: number;
  };
  propertyType: string;
  propertyTypeHe: string;
  slug: string;
  createdAt: string;
  published: boolean;
  source?: string;
}

export interface Article {
  _id?: string;
  title: string;
  titleHe: string;
  content?: string;
  contentHtml?: string;
  contentHe?: string;
  category?: string;
  categoryHe?: string;
  slug: string;
  excerpt?: string;
  excerptHe?: string;
  readTime?: number;
  image?: string;
  featuredImageUrl?: string;
  keywords?: string[];
  createdAt: string;
  updatedAt?: string;
  published: boolean;
  status?: 'pending' | 'approved' | 'rejected';
  source?: string;
  approvedAt?: string;
}

export interface Lead {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  message?: string;
  interestedIn?: string[];
  createdAt: Date;
  source: string;
}

export interface AdminUser {
  _id?: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  createdAt: Date;
  lastLogin?: Date;
}
