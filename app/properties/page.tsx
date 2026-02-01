'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  TrendingUp,
  Building2,
} from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data.properties || []))
      .catch(console.error);
  }, []);

  const filteredProperties =
    filter === 'all'
      ? properties
      : properties.filter((p) => p.propertyType === filter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/90 via-ocean-800/80 to-ocean-900/90" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            נכסים יוקרתיים בקפריסין
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl"
          >
            גלו את מגוון הנכסים המובחרים שלנו עם תשואה גבוהה
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="section-padding bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { value: 'all', label: 'הכל' },
              { value: 'villa', label: 'וילות' },
              { value: 'penthouse', label: 'פנטהאוזים' },
              { value: 'apartment', label: 'דירות' },
              { value: 'land', label: 'קרקעות' },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  filter === item.value
                    ? 'bg-ocean-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          {filteredProperties.length > 0 ? (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  נמצאו {filteredProperties.length} נכסים
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property, idx) => (
                  <PropertyCard
                    key={property._id?.toString() || idx}
                    property={property}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Building2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">טוען נכסים...</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding luxury-gradient">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              לא מצאתם את מה שחיפשתם?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              הצוות שלנו יעזור לכם למצוא את הנכס המושלם בהתאם לדרישות שלכם
            </p>
            <a href="/contact" className="btn-primary">
              צרו קשר עכשיו
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
