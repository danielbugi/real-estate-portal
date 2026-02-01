// components/AccessibilityWrapper.tsx
'use client';

import { useEffect, useState } from 'react';

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

export function AccessibilityWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
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
    // Load settings once
    try {
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        setOptions(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load accessibility settings:', error);
    }

    // Listen for updates from the widget
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem('accessibility-settings');
        if (saved) {
          setOptions(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Failed to load accessibility settings:', error);
      }
    };

    window.addEventListener('accessibility-update', handleUpdate);
    return () =>
      window.removeEventListener('accessibility-update', handleUpdate);
  }, []);

  // Build styles
  const filters: string[] = [];
  if (options.highContrast) filters.push('contrast(1.5)');
  if (options.invertColors) filters.push('invert(1)');
  if (options.grayscale) filters.push('grayscale(1)');

  const wrapperStyle: React.CSSProperties = {
    minHeight: '100vh',
    fontSize: `${options.fontSize}%`,
    lineHeight:
      options.lineHeight !== 100 ? `${options.lineHeight / 100}` : undefined,
    letterSpacing:
      options.letterSpacing !== 100
        ? `${(options.letterSpacing - 100) / 100}em`
        : undefined,
    filter: filters.length > 0 ? filters.join(' ') : undefined,
    fontFamily: options.readableFont
      ? 'Arial, Helvetica, sans-serif, "Noto Sans Hebrew"'
      : undefined,
  };

  return (
    <>
      <div id="a11y-content-wrapper" style={wrapperStyle}>
        {children}
      </div>

      {/* Inject styles for links and cursor */}
      <style jsx global>{`
        ${options.highlightLinks
          ? `
          #a11y-content-wrapper a {
            background-color: yellow !important;
            color: black !important;
            text-decoration: underline !important;
            padding: 2px 4px !important;
          }
        `
          : ''}

        ${options.cursorSize
          ? `
          body,
          body * {
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M3 3 L3 27 L12 18 L17 28 L20 27 L15 17 L25 17 Z" fill="black" stroke="white" stroke-width="1"/></svg>') 0 0, auto !important;
          }
        `
          : ''}
      `}</style>
    </>
  );
}
