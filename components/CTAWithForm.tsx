'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

interface CTAWithFormProps {
  title: string;
  subtitle: string;
}

export default function CTAWithForm({ title, subtitle }: CTAWithFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          budget: '',
          message: '',
        });
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="section-padding luxury-gradient">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect p-4 sm:p-6 md:p-12 rounded-2xl"
        >
          {/* Title and Description */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4">
              {title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
              {subtitle}
            </p>
          </div>

          {/* Form */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">תודה רבה!</h3>
              <p className="text-gray-600">נחזור אליכם בהקדם</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                  >
                    שם מלא
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-all outline-none text-sm sm:text-base"
                    placeholder="הכנס את שמך המלא"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                  >
                    אימייל
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-all outline-none text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Budget */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                  >
                    טלפון
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-all outline-none text-sm sm:text-base"
                    placeholder="050-1234567"
                  />
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                  >
                    תקציב השקעה
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-all outline-none text-sm sm:text-base"
                  >
                    <option value="">בחר תקציב</option>
                    <option value="150-300k">€150,000 - €300,000</option>
                    <option value="300-500k">€300,000 - €500,000</option>
                    <option value="500-750k">€500,000 - €750,000</option>
                    <option value="750k+">€750,000+</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Message (Full Width) */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2"
                >
                  הודעה (אופציונלי)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-all outline-none resize-none text-sm sm:text-base"
                  placeholder="ספר לנו על מה אתה מחפש..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary px-6 sm:px-8 md:px-12 py-3 md:py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>שולח...</span>
                    </>
                  ) : (
                    <>
                      <span>קבלו שיחת ייעוץ ללא עלות!</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
