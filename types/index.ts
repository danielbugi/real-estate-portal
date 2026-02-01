import { ObjectId } from 'mongodb';

export interface Property {
  _id?: ObjectId;
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
    pool?: boolean;
    garden?: boolean;
    parking?: boolean;
    seaview?: boolean;
  };
  description: string;
  descriptionHe: string;
  images: string[];
  roi: {
    rentalYield: number;
    appreciation: number;
  };
  propertyType: 'villa' | 'apartment' | 'penthouse' | 'townhouse';
  propertyTypeHe: string;
  slug: string;
  createdAt: Date;
  published: boolean;
  source: string;
}

export interface Article {
  _id?: ObjectId;
  title: string;
  titleHe: string;
  content: string;
  contentHe: string;
  category: 'investment-guide' | 'market-analysis' | 'legal' | 'lifestyle';
  categoryHe: string;
  slug: string;
  excerpt: string;
  excerptHe: string;
  readTime: number;
  image?: string;
  createdAt: Date;
  published: boolean;
}

export interface Lead {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  interestedIn: string[];
  budget: string;
  message?: string;
  createdAt: Date;
}

export interface SearchFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  propertyType?: string;
  hasPool?: boolean;
  hasSeaview?: boolean;
}
