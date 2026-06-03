export default function ProfessionalPathSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-slate-50 to-white">
      <div className="mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 sm:mb-6">
          הדרך המקצועית להשקעה חכמה בקפריסין
        </h2>

        {/* Fear block */}
        <div
          className="max-w-2xl mx-auto my-8 sm:my-10 rounded-2xl bg-white border border-gray-100 shadow-md px-6 sm:px-10 py-7 sm:py-9 text-right"
          dir="rtl"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-5">
            למה רוב הישראלים חוששים להשקיע בקפריסין?
          </h3>
          <ul className="space-y-3 mb-7">
            {[
              'חשש מהונאות ויזמים לא מוכרים',
              'חוסר היכרות עם החוק המקומי',
              'קושי בניהול הנכס מרחוק',
              'חוסר ודאות לגבי התשואה',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-base sm:text-lg text-gray-700"
              >
                <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-base sm:text-lg font-semibold text-ocean-700 border-t border-gray-100 pt-5">
            אנחנו מלווים אתכם בכל שלב כדי לצמצם את הסיכונים.
          </p>
        </div>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto py-4 sm:py-6">
          השקעה נבונה בנדל"ן מתחילה בנתונים מדויקים ומסתיימת בליווי חסר פשרות.
          הצוות המקצועי שלנו מביא עמו <strong>ניסיון עשיר ומוכח</strong> בניתוח
          שוק הנדל"ן הקפריסאי, מתוך מחויבות עמוקה לערכים של{' '}
          <strong>אמינות, שקיפות ודיוק אבסולוטי.</strong>
        </p>

        <ul className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto space-y-4">
          <li>
            <strong>השקעות מבוססות נתונים: </strong> איתור הזדמנויות נדל"ן על
            בסיס נתוני שוק, מגמות מקומיות ופוטנציאל צמיחה ארוך טווח.
          </li>
          <li>
            <strong>היכרות עם השטח: </strong>עבודה מול אנשי מקצוע, יועצים
            וגורמים מקומיים המכירים את שוק הנדל"ן בקפריסין מקרוב.
          </li>
          <li>
            <strong>ליווי לאורך הדרך: </strong> סיוע בתהליך קבלת ההחלטות, ביצוע
            בדיקות מקדימות וחיבור לאנשי המקצוע הנדרשים עד להשלמת העסקה.
          </li>
        </ul>
      </div>
    </section>
  );
}
