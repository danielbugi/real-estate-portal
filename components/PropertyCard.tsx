'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Bed, Bath, Square, TrendingUp, MapPin } from 'lucide-react';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatPriceILS = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-effect rounded-2xl overflow-hidden card-hover group"
    >
      {/* Property Image */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <Image
          src={property.images[0] || '/placeholder.jpg'}
          alt={property.titleHe}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Property Type Badge */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-ocean-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-base">
          {property.propertyTypeHe}
        </div>

        {/* ROI Badge */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gold-500 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          {property.roi.rentalYield}% תשואה
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4 sm:p-6">
        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-2 sm:mb-3">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">
            {property.location.cityHe}, {property.location.areaHe}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold mb-2 sm:mb-3 line-clamp-2">
          {property.titleHe}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
          {property.descriptionHe}
        </p>

        {/* Features */}
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm">{property.features.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-5 h-5" />
            <span className="text-sm">{property.features.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-5 h-5" />
            <span className="text-sm">{property.features.sqm} מ״ר</span>
          </div>
        </div>

        {/* Additional Features */}
        {(property.features.pool || property.features.seaview) && (
          <div className="flex gap-2 mb-4">
            {property.features.pool && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                🏊 בריכה
              </span>
            )}
            {property.features.seaview && (
              <span className="bg-ocean-100 text-ocean-700 px-3 py-1 rounded-full text-xs">
                🌊 נוף לים
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-3xl font-bold text-ocean-600">
                {formatPrice(property.price)}
              </div>
              <div className="text-sm text-gray-500">
                {formatPriceILS(property.priceILS)}
              </div>
            </div>
            <button className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold transition-all">
              פרטים
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
