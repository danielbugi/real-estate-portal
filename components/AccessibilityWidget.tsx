'use client';

import { useState, useEffect } from 'react';
import {
  X,
  Eye,
  Type,
  MousePointer,
  Contrast,
  Link,
  Settings,
} from 'lucide-react';

type AccessibilityOptions = {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  highContrast: boolean;
  invertColors: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  cursorSize: boolean;
};

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AccessibilityOptions>({
    fontSize: 100,
    lineHeight: 100,
    letterSpacing: 100,
    highContrast: false,
    invertColors: false,
    grayscale: false,
    highlightLinks: false,
    readableFont: false,
    cursorSize: false,
  });

  useEffect(() => {
    // Load saved preferences from localStorage with error handling
    try {
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        setOptions(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load accessibility settings:', error);
    }
  }, []);

  useEffect(() => {
    // Save preferences to localStorage with error handling
    try {
      localStorage.setItem('accessibility-settings', JSON.stringify(options));
      // Trigger event to update wrapper
      window.dispatchEvent(new Event('accessibility-update'));
    } catch (error) {
      console.error('Failed to save accessibility settings:', error);
    }
  }, [options]);

  const resetSettings = () => {
    setOptions({
      fontSize: 100,
      lineHeight: 100,
      letterSpacing: 100,
      highContrast: false,
      invertColors: false,
      grayscale: false,
      highlightLinks: false,
      readableFont: false,
      cursorSize: false,
    });
  };

  const toggleOption = (optionName: keyof AccessibilityOptions) => {
    setOptions((prev) => ({
      ...prev,
      [optionName]: !prev[optionName as keyof AccessibilityOptions],
    }));
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="פתח תפריט נגישות"
        title="נגישות"
      >
        <Eye className="w-6 h-6" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div
          id="accessibility-widget"
          dir="rtl"
          lang="he"
          className="fixed left-4 top-1/2 -translate-y-1/2 ml-16 z-50 bg-white rounded-lg shadow-2xl border-2 border-blue-600 w-80 max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center z-10">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Settings className="w-5 h-5" />
              הצהרת נגישות
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded"
              aria-label="סגור תפריט נגישות"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Font Size */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-semibold text-sm">
                <Type className="w-4 h-4" />
                גודל טקסט
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setOptions({
                      ...options,
                      fontSize: Math.max(50, options.fontSize - 10),
                    })
                  }
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  aria-label="הקטן טקסט"
                >
                  -
                </button>
                <span className="flex-1 text-center text-sm">
                  {options.fontSize}%
                </span>
                <button
                  onClick={() =>
                    setOptions({
                      ...options,
                      fontSize: Math.min(200, options.fontSize + 10),
                    })
                  }
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  aria-label="הגדל טקסט"
                >
                  +
                </button>
              </div>
            </div>

            {/* Line Height */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-semibold text-sm">
                <Type className="w-4 h-4" />
                מרווח בין שורות
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setOptions({
                      ...options,
                      lineHeight: Math.max(80, options.lineHeight - 10),
                    })
                  }
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  aria-label="הקטן מרווח"
                >
                  -
                </button>
                <span className="flex-1 text-center text-sm">
                  {options.lineHeight}%
                </span>
                <button
                  onClick={() =>
                    setOptions({
                      ...options,
                      lineHeight: Math.min(200, options.lineHeight + 10),
                    })
                  }
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  aria-label="הגדל מרווח"
                >
                  +
                </button>
              </div>
            </div>

            {/* Letter Spacing */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-semibold text-sm">
                <Type className="w-4 h-4" />
                מרווח בין אותיות
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setOptions({
                      ...options,
                      letterSpacing: Math.max(80, options.letterSpacing - 10),
                    })
                  }
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  aria-label="הקטן מרווח אותיות"
                >
                  -
                </button>
                <span className="flex-1 text-center text-sm">
                  {options.letterSpacing}%
                </span>
                <button
                  onClick={() =>
                    setOptions({
                      ...options,
                      letterSpacing: Math.min(150, options.letterSpacing + 10),
                    })
                  }
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  aria-label="הגדל מרווח אותיות"
                >
                  +
                </button>
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Toggle Options */}
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2 font-semibold text-sm">
                  <Contrast className="w-4 h-4" />
                  ניגודיות גבוהה
                </span>
                <input
                  type="checkbox"
                  checked={options.highContrast}
                  onChange={() => toggleOption('highContrast')}
                  className="w-5 h-5 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2 font-semibold text-sm">
                  <Contrast className="w-4 h-4" />
                  היפוך צבעים
                </span>
                <input
                  type="checkbox"
                  checked={options.invertColors}
                  onChange={() => toggleOption('invertColors')}
                  className="w-5 h-5 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2 font-semibold text-sm">
                  <Eye className="w-4 h-4" />
                  גווני אפור
                </span>
                <input
                  type="checkbox"
                  checked={options.grayscale}
                  onChange={() => toggleOption('grayscale')}
                  className="w-5 h-5 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2 font-semibold text-sm">
                  <Link className="w-4 h-4" />
                  הדגשת קישורים
                </span>
                <input
                  type="checkbox"
                  checked={options.highlightLinks}
                  onChange={() => toggleOption('highlightLinks')}
                  className="w-5 h-5 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2 font-semibold text-sm">
                  <Type className="w-4 h-4" />
                  גופן קריא
                </span>
                <input
                  type="checkbox"
                  checked={options.readableFont}
                  onChange={() => toggleOption('readableFont')}
                  className="w-5 h-5 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-2 font-semibold text-sm">
                  <MousePointer className="w-4 h-4" />
                  סמן עכבר גדול
                </span>
                <input
                  type="checkbox"
                  checked={options.cursorSize}
                  onChange={() => toggleOption('cursorSize')}
                  className="w-5 h-5 cursor-pointer"
                />
              </label>
            </div>

            <hr className="border-gray-300" />

            {/* Reset Button */}
            <button
              onClick={resetSettings}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition-colors"
            >
              איפוס הגדרות
            </button>

            {/* Accessibility Statement */}
            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
              <p className="font-semibold mb-1">הצהרת נגישות</p>
              <p>
                אתר זה עומד בתקן הישראלי 5568 לנגישות תכנים באינטרנט ברמת AA.
                במידה ונתקלתם בבעיית נגישות, אנא צרו קשר דרך{' '}
                <a href="/contact" className="text-blue-600 underline">
                  טופס יצירת הקשר
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
