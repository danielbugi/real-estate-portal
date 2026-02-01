'use client';

import { motion } from 'framer-motion';
import {
  Building2,
  Users,
  Award,
  Target,
  Heart,
  Globe,
  TrendingUp,
  Shield,
} from 'lucide-react';
import StatsSection from '@/components/StatsSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brown-900/90 via-brown-800/80 to-brown-900/90" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              אודות Cyprus Invest
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              המומחים שלכם להשקעות נדל״ן בינלאומיות
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                המשימה <span className="text-ocean-500">שלנו</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                אנו מתמחים בהשקעות נדל״ן יוקרתיות בקפריסין עבור משקיעים ישראלים.
                המטרה שלנו היא לספק שירות מקצועי ומקיף, מליווי מלא בתהליך הרכישה
                ועד לניהול השוטף של הנכס.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                עם ניסיון של למעלה מעשור בשוק הנדל״ן הקפריסאי, אנו מציעים
                פתרונות השקעה מותאמים אישית עם דגש על תשואה גבוהה ויציבות לטווח
                ארוך.
              </p>
              <div className="flex gap-4">
                <div className="bg-ocean-100 p-4 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-ocean-600" />
                </div>
                <div className="bg-gold-100 p-4 rounded-lg">
                  <Shield className="w-8 h-8 text-gold-600" />
                </div>
                <div className="bg-brown-100 p-4 rounded-lg">
                  <Heart className="w-8 h-8 text-brown-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Users, value: '500+', label: 'לקוחות מרוצים' },
                { icon: Building2, value: '1,200+', label: 'נכסים שנמכרו' },
                { icon: Award, value: '15+', label: 'שנות ניסיון' },
                { icon: Globe, value: '3', label: 'משרדים בינלאומיים' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-effect p-6 rounded-2xl text-center"
                >
                  <item.icon className="w-12 h-12 mx-auto mb-4 text-ocean-500" />
                  <div className="text-3xl font-bold text-ocean-600 mb-2">
                    {item.value}
                  </div>
                  <div className="text-gray-600">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding luxury-gradient">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              הערכים <span className="text-ocean-500">שלנו</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              העקרונות המנחים אותנו בכל פעילות
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'אמינות ושקיפות',
                desc: 'אנו פועלים בשקיפות מלאה ומספקים מידע מדויק ומקצועי',
                delay: 0,
              },
              {
                icon: Heart,
                title: 'מחויבות ללקוח',
                desc: 'הצלחת הלקוח היא ההצלחה שלנו - ליווי מלא ותמיכה מתמשכת',
                delay: 0.1,
              },
              {
                icon: Target,
                title: 'מקצועיות',
                desc: 'ניסיון עשיר וידע מעמיק בשוק הנדל״ן הקפריסאי',
                delay: 0.2,
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: value.delay }}
                className="glass-effect p-8 rounded-2xl text-center card-hover"
              >
                <value.icon className="w-16 h-16 mx-auto mb-4 text-ocean-500" />
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              הצוות <span className="text-ocean-500">המקצועי</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              מומחים עם ניסיון עשיר בשוק הנדל״ן הבינלאומי
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'דוד כהן',
                role: 'מנכ״ל ומייסד',
                image:
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300',
              },
              {
                name: 'שרה לוי',
                role: 'מנהלת מכירות',
                image:
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300',
              },
              {
                name: 'יוסי אברהם',
                role: 'יועץ השקעות',
                image:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300',
              },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-effect rounded-2xl overflow-hidden card-hover"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-ocean-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              מוכנים להתחיל את המסע?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              בואו נדבר על ההשקעה שלכם בקפריסין
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
