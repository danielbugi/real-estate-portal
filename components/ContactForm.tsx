'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
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

      const result = await response.json();

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
      } else {
        // Show error message to user
        alert(result.error || 'שגיאה בשליחת הטופס. אנא נסה שוב.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('שגיאה בשליחת הטופס. אנא בדוק את החיבור לאינטרנט ונסה שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // Client-side sanitization and validation
    let sanitizedValue = value;

    // Prevent HTML/Script injection in all fields
    if (typeof value === 'string') {
      // Remove dangerous patterns
      sanitizedValue = value
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '');

      // Field-specific validation
      if (name === 'name') {
        // Max 100 characters for name
        sanitizedValue = sanitizedValue.substring(0, 100);
      } else if (name === 'email') {
        // Email: lowercase, no spaces, max 254 chars
        sanitizedValue = sanitizedValue.toLowerCase().trim().substring(0, 254);
      } else if (name === 'phone') {
        // Phone: max 20 characters
        sanitizedValue = sanitizedValue.substring(0, 20);
      } else if (name === 'message') {
        // Message: max 2000 characters
        sanitizedValue = sanitizedValue.substring(0, 2000);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect p-8 rounded-2xl text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">תודה רבה!</h3>
        <p className="text-gray-600">נחזור אליכם בהקדם</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="glass-effect p-6 sm:p-8 rounded-2xl space-y-4 sm:space-y-6"
    >
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
          minLength={2}
          maxLength={100}
          pattern="[^<>]*"
          title="Name cannot contain < or > characters"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-all outline-none"
          placeholder="הכנס את שמך המלא"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2">
          אימייל
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          maxLength={254}
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          title="Please enter a valid email address"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-all outline-none"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold mb-2">
          טלפון
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          maxLength={20}
          pattern="[0-9+\-\s()]+"
          title="Please enter a valid phone number"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-all outline-none"
          placeholder="050-1234567"
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-semibold mb-2">
          תקציב השקעה
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-all outline-none"
        >
          <option value="">בחר תקציב</option>
          <option value="150-300k">€150,000 - €300,000</option>
          <option value="300-500k">€300,000 - €500,000</option>
          <option value="500-750k">€500,000 - €750,000</option>
          <option value="750k+">€750,000+</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-2">
          הודעה (אופציונלי)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          maxLength={2000}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200 transition-all outline-none resize-none"
          placeholder="ספר לנו על מה אתה מחפש..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>שולח...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>שלח פנייה</span>
          </>
        )}
      </button>
    </motion.form>
  );
}
