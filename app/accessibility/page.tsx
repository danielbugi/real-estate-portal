import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'הצהרת נגישות | Cyprus Insights',
  description:
    'הצהרת הנגישות של Cyprus Insights - מחויבות לנגישות דיגיטלית, תקני WCAG 2.1 ברמה AA, וכלי נגישות מתקדמים לכלל המשתמשים',
  openGraph: {
    title: 'הצהרת נגישות | Cyprus Insights',
    description: 'הצהרת הנגישות של Cyprus Insights - מחויבות לנגישות דיגיטלית',
  },
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            הצהרת נגישות
          </h1>
          <p className="text-lg text-gray-600">עדכון אחרון: פברואר 2025</p>
        </header>

        {/* Main Content */}
        <article className="prose prose-lg max-w-none" dir="rtl">
          {/* Commitment Section */}
          <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              המחויבות שלנו לנגישות
            </h2>
            <p className="text-gray-700 leading-relaxed">
              אתר <strong>Cyprus Insights</strong> (
              <code>cyprus-insights.co.il</code>) מחויב להבטיח נגישות דיגיטלית
              לאנשים עם מוגבלויות. אנו משפרים באופן רציף את חוויית המשתמש עבור
              כולם ומיישמים את תקני הנגישות הרלוונטיים.
            </p>
          </section>

          {/* Technical Standards */}
          <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              תקנים טכניים
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              האתר שואף לעמוד בדרישות תקן הנגישות הישראלי (ת"י 5568) ברמת התאמה
              AA, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות
              לשירות), התשע"ג-2013.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              האתר עומד בדרישות{' '}
              <strong>WCAG 2.1 (Web Content Accessibility Guidelines)</strong>{' '}
              ברמה AA, הכוללות:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Perceivable (ניתן לתפיסה)</strong> - המידע והממשק מוצגים
                בצורה שמשתמשים יכולים לתפוס
              </li>
              <li>
                <strong>Operable (ניתן להפעלה)</strong> - רכיבי הממשק וניווט
                ניתנים להפעלה
              </li>
              <li>
                <strong>Understandable (מובן)</strong> - המידע והתפעול של הממשק
                מובנים למשתמש
              </li>
              <li>
                <strong>Robust (איתן)</strong> - התוכן ניתן לפירוש אמין על ידי
                מגוון רחב של סוגי משתמשים, כולל טכנולוגיות מסייעות
              </li>
            </ul>
          </section>

          {/* Accessibility Features */}
          <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              תכונות נגישות באתר
            </h2>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">
              כלי נגישות אינטראקטיבי
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              האתר כולל widget נגישות מתקדם המאפשר התאמה אישית של חוויית הגלישה:
            </p>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                התאמות תצוגה:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• הגדלה וקטנת גופן טקסט</li>
                <li>• התאמת ניגודיות והיפוך צבעים</li>
                <li>• שינוי צבעים לפי העדפות אישיות</li>
                <li>• הדגשת קישורים וכותרות</li>
                <li>• מצב קריא (Readable Font)</li>
                <li>• התאמה למוגבלויות ראייה שונות</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                התאמות ניווט ותפעול:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• ניווט באמצעות מקלדת בלבד</li>
                <li>• ניווט עם מקשי חצים</li>
                <li>• הפעלה וביטול של אנימציות</li>
                <li>• הבלטת אלמנטים בעת מעבר עליהם</li>
                <li>• הגדלת סמן העכבר</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                תמיכה בטכנולוגיות מסייעות:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• תמיכה מלאה בתוכנות הקראת מסך (Screen Readers)</li>
                <li>• תיאורים חלופיים לתמונות</li>
                <li>• סימון סמנטי נכון של מבנה העמוד</li>
                <li>• תגיות ARIA מתאימות</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-6">
              מבנה האתר
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>ניווט עקבי</strong> - תפריט ניווט אחיד בכל דפי האתר
              </li>
              <li>
                • <strong>היררכיה ברורה</strong> - שימוש נכון בכותרות (H1, H2,
                H3) למבנה לוגי
              </li>
              <li>
                • <strong>קישורים תיאוריים</strong> - כל קישור מכיל תיאור ברור
                של יעדו
              </li>
              <li>
                • <strong>טפסים נגישים</strong> - כל שדה טופס מסומן בבירור עם
                הוראות ברורות
              </li>
              <li>
                • <strong>תמיכה בהגדלה</strong> - האתר תומך בהגדלה עד 200% ללא
                אובדן תוכן או פונקציונליות
              </li>
            </ul>
          </section>

          {/* Browser & Technology Compatibility */}
          <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              תאימות למגוון דפדפנים וטכנולוגיות מסייעות
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                האתר נבדק ותואם לדפדפנים הבאים:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Google Chrome (גרסה עדכנית)</li>
                <li>• Mozilla Firefox (גרסה עדכנית)</li>
                <li>• Microsoft Edge (גרסה עדכנית)</li>
                <li>• Safari (גרסה עדכנית)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                תמיכה בטכנולוגיות מסייעות:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• NVDA</li>
                <li>• JAWS</li>
                <li>• VoiceOver (Mac/iOS)</li>
                <li>• TalkBack (Android)</li>
              </ul>
            </div>
          </section>

          {/* Testing Process */}
          <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              תהליך בדיקה ושיפור
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              אנו מבצעים בדיקות נגישות באופן שוטף הכוללות:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• בדיקות אוטומטיות באמצעות כלים מקצועיים</li>
              <li>• בדיקות ידניות על ידי צוות מומחה</li>
              <li>• בדיקות משתמשים עם טכנולוגיות מסייעות</li>
              <li>• עדכונים שוטפים בהתאם להתפתחויות טכנולוגיות ותקינה</li>
            </ul>
          </section>

          {/* Known Limitations */}
          <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              מגבלות נגישות ידועות
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              למרות מאמצינו להבטיח נגישות מלאה, ייתכנו מצבים בודדים שבהם חלקים
              מסוימים באתר עדיין אינם נגישים באופן מלא:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>
                • תכנים מוטמעים מצד שלישי (סרטונים, מפות) עשויים להיות בעלי
                נגישות מוגבלת
              </li>
              <li>• תכנים ישנים הנמצאים בתהליך התאמה</li>
              <li>• קבצי PDF חיצוניים שעלולים להיות חסרי נגישות מלאה</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              אנו עובדים באופן פעיל לטפל במגבלות אלו ולשפר את הנגישות בכל מרכיבי
              האתר.
            </p>
          </section>

          {/* Feedback & Contact */}
          <section className="bg-blue-50 rounded-lg shadow-sm p-8 mb-8 border-r-4 border-blue-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              משוב ויצירת קשר
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              נגישות האתר חשובה לנו מאוד. אם נתקלתם בבעיית נגישות באתר, או אם יש
              לכם הצעות לשיפור, אנא צרו איתנו קשר:
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                דרכי יצירת קשר:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>אימייל:</strong>{' '}
                  <a
                    href="mailto:info@cyprus-insights.co.il"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    info@cyprus-insights.co.il
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-md">
              <h4 className="font-semibold text-gray-800 mb-2">זמני מענה:</h4>
              <p className="text-gray-700">
                אנו שואפים להגיב לפניות נגישות בתוך 5 ימי עסקים ולפתור בעיות
                בהקדם האפשרי.
              </p>
            </div>
          </section>

          {/* Alternative Accessibility Arrangements */}
          <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              הסדרי נגישות חלופיים
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              במידה ואינכם מצליחים לגשת לתוכן או לשירות כלשהו באתר, ניתן ליצור
              איתנו קשר ואנו נספק לכם את המידע או השירות בדרך חלופית נגישה:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• מידע בדוא"ל</li>
              <li>• שיחה טלפונית עם נציג</li>
              <li>• פגישה במשרדינו</li>
            </ul>
          </section>

          {/* Legal Information */}
          <section className="bg-gray-50 rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              תאריך עדכון ומידע משפטי
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>תאריך עדכון אחרון של הצהרה זו:</strong> פברואר 2025
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              הצהרה זו תתעדכן בהתאם לשינויים ושיפורים שיתבצעו באתר.
            </p>

            <div className="border-t pt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                רכז נגישות:
              </h3>
              <ul className="space-y-1 text-gray-700">
                <li>שם: [שם רכז הנגישות]</li>
                <li>טלפון: [מספר טלפון]</li>
                <li>אימייל: [כתובת אימייל]</li>
              </ul>
            </div>
          </section>

          {/* Commitment */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 mb-8 text-white">
            <h2 className="text-3xl font-bold mb-4">התחייבות לשיפור מתמיד</h2>
            <p className="text-white leading-relaxed text-lg">
              אנו ב-Cyprus Insights רואים בנגישות ערך מרכזי ומתחייבים להמשיך
              ולשפר את נגישות האתר כדי להבטיח שכל המשתמשים, ללא קשר ליכולותיהם,
              יוכלו ליהנות מהתכנים והשירותים שלנו.
            </p>
            <p className="text-white text-lg mt-4 font-medium">
              תודה שבחרתם ב-Cyprus Insights.
            </p>
          </section>

          {/* Footer Note */}
          <footer className="text-center text-sm text-gray-500 italic mt-8">
            הצהרת נגישות זו עודכנה לאחרונה בפברואר 2025 ומבוססת על תקני הנגישות
            הישראליים והבינלאומיים המעודכנים ביותר.
          </footer>
        </article>
      </div>
    </div>
  );
}
