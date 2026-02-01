'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/90 via-ocean-800/85 to-ocean-900/90" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              צרו קשר
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              אנחנו כאן כדי לענות על כל שאלה ולסייע לכם במסע ההשקעה
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                בואו <span className="text-ocean-500">נדבר</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                הצוות המקצועי שלנו זמין לשירותכם ומוכן לסייע בכל שאלה או בקשה
              </p>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-ocean-100 p-4 rounded-lg">
                    <Phone className="w-6 h-6 text-ocean-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">טלפון</h3>
                    <p className="text-gray-600">+972-50-123-4567</p>
                    <p className="text-gray-600">+357-99-123-456</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 p-4 rounded-lg">
                    <Mail className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">אימייל</h3>
                    <p className="text-gray-600">info@cyprus-invest.com</p>
                    <p className="text-gray-600">sales@cyprus-invest.com</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="bg-brown-100 p-4 rounded-lg">
                    <MapPin className="w-6 h-6 text-brown-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">כתובת</h3>
                    <p className="text-gray-600">רח׳ דיזנגוף 123, תל אביב</p>
                    <p className="text-gray-600">Limassol Marina, קפריסין</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-ocean-100 p-4 rounded-lg">
                    <Clock className="w-6 h-6 text-ocean-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">שעות פעילות</h3>
                    <p className="text-gray-600">ראשון - חמישי: 9:00 - 18:00</p>
                    <p className="text-gray-600">שישי: 9:00 - 14:00</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-lg mb-4">עקבו אחרינו</h3>
                <div className="flex gap-4">
                  {['Facebook', 'Instagram', 'LinkedIn', 'WhatsApp'].map(
                    (platform, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="bg-ocean-100 hover:bg-ocean-200 text-ocean-600 px-4 py-2 rounded-lg transition-colors"
                      >
                        {platform}
                      </a>
                    )
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">שלחו לנו הודעה</h3>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">המשרדים שלנו</h2>
            <p className="text-xl text-gray-600">
              בקרו אותנו באחד מהמשרדים שלנו בישראל או בקפריסין
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Israel Office */}
            <div className="glass-effect rounded-2xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">משרד ישראל</h3>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-2">תל אביב</h4>
                <p className="text-gray-600 mb-2">רח׳ דיזנגוף 123</p>
                <p className="text-gray-600 mb-4">תל אביב-יפו, 6473409</p>
                <a href="#" className="text-ocean-600 hover:text-ocean-700">
                  הוראות הגעה →
                </a>
              </div>
            </div>

            {/* Cyprus Office */}
            <div className="glass-effect rounded-2xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">משרד קפריסין</h3>
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-2">לימסול</h4>
                <p className="text-gray-600 mb-2">Limassol Marina</p>
                <p className="text-gray-600 mb-4">3601 Limassol, Cyprus</p>
                <a href="#" className="text-gold-600 hover:text-gold-700">
                  Get directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding luxury-gradient">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">שאלות נפוצות</h2>
            <p className="text-xl text-gray-600">תשובות לשאלות הנפוצות ביותר</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: 'כמה זמן לוקח תהליך הרכישה?',
                a: 'תהליך הרכישה בקפריסין לוקח בממוצע 2-3 חודשים, תלוי בסוג הנכס ובמורכבות העסקה.',
              },
              {
                q: 'האם יש הגבלות על זרים לרכוש נכסים?',
                a: 'אזרחי ישראל ואזרחי האיחוד האירופי יכולים לרכוש נכסים בקפריסין ללא הגבלה.',
              },
              {
                q: 'מה עם מיסוי על הנכס?',
                a: 'מס חברות בקפריסין הוא 12.5%, ואין מס ירושה. המיסוי המלא תלוי במבנה ההשקעה.',
              },
              {
                q: 'האם אתם מספקים ליווי משפטי?',
                a: 'כן, אנו עובדים עם עורכי דין מקומיים ומספקים ליווי מלא לאורך כל התהליך.',
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-effect p-6 rounded-xl"
              >
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
