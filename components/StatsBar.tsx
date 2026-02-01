import { motion } from 'framer-motion';

function StatsBar() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 grid grid-cols-3 gap-6 p-6 bg-gradient-to-br from-ocean-50 to-gold-50 rounded-2xl"
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-ocean-600">15K+</div>
          <p className="text-sm text-gray-600 mt-1">ישראלים בעלי נכסים</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-ocean-600">€350M+</div>
          <p className="text-sm text-gray-600 mt-1">השקעות בשנה</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-ocean-600">8.3%</div>
          <p className="text-sm text-gray-600 mt-1">צמיחה שנתית</p>
        </div>
      </motion.div>
    </div>
  );
}
export default StatsBar;
