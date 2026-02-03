'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Menu,
  X,
  Building2,
  Phone,
  Mail,
  Shield,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInvestmentsOpen, setIsInvestmentsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await fetch('/api/admin/stats', {
          credentials: 'include',
        });
        setIsAdmin(res.ok);
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdminAuth();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setIsAdmin(false);
    router.push('/admin');
  };

  const navLinks = [
    { href: '/', label: 'בית' },
    { href: '/properties', label: 'נכסים' },
    { href: '/articles', label: 'מאמרים' },
    { href: '/about', label: 'אודות' },
    { href: '/contact', label: 'צור קשר' },
  ];

  const cityLinks = [
    { href: '/investments/limassol', label: 'נדל"ן בלימסול' },
    { href: '/investments/paphos', label: 'נדל"ן בפאפוס' },
    { href: '/investments/larnaca', label: 'נדל"ן בלרנקה' },
    { href: '/investments/nicosia', label: 'נדל"ן בניקוסיה' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium hover:text-ocean-500 transition-colors text-gray-900"
              >
                {link.label}
              </Link>
            ))}

            {/* Investments Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsInvestmentsOpen(true)}
              onMouseLeave={() => setIsInvestmentsOpen(false)}
            >
              <button className="font-medium hover:text-ocean-500 transition-colors text-gray-900 flex items-center gap-1">
                נדל"ן לפי עיר
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isInvestmentsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isInvestmentsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                  >
                    {cityLinks.map((city) => (
                      <Link
                        key={city.href}
                        href={city.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-ocean-50 hover:text-ocean-600 transition-colors"
                      >
                        {city.label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 my-2" />
                    <Link
                      href="/investments"
                      className="block px-4 py-2 text-ocean-600 font-semibold hover:bg-ocean-50 transition-colors"
                    >
                      כל הערים →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isAdmin && (
              <>
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-1 font-medium hover:text-ocean-500 transition-colors text-gray-900"
                >
                  <Shield className="w-4 h-4" />
                  פאנל ניהול
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 font-medium hover:text-red-500 transition-colors text-gray-900"
                >
                  <LogOut className="w-4 h-4" />
                  יציאה
                </button>
              </>
            )}
            <Link
              href="/contact"
              className="btn-primary text-xs sm:text-sm py-2 px-4 sm:px-6"
            >
              קבעו פגישה
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-900"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src="/favicon.svg"
                alt="Cyprus Insights Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-bold text-base sm:text-lg md:text-xl uppercase text-ocean-900">
                Cyprus Insights
              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 hidden sm:block">
                פורטל המידע וההשקעות של ישראל
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="container-custom py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-700 hover:text-ocean-500 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Cities Links */}
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm font-semibold text-gray-500 mb-2 px-2">
                  השקעות לפי עיר
                </div>
                {cityLinks.map((city) => (
                  <Link
                    key={city.href}
                    href={city.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 px-4 text-gray-700 hover:text-ocean-500 transition-colors"
                  >
                    {city.label}
                  </Link>
                ))}
                <Link
                  href="/investments"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-4 text-ocean-600 font-semibold hover:text-ocean-700 transition-colors"
                >
                  כל הערים →
                </Link>
              </div>

              {isAdmin && (
                <>
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 py-2 text-gray-700 hover:text-ocean-500 transition-colors font-medium"
                  >
                    <Shield className="w-4 h-4" />
                    פאנל ניהול
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 py-2 text-gray-700 hover:text-red-500 transition-colors font-medium w-full text-right"
                  >
                    <LogOut className="w-4 h-4" />
                    יציאה
                  </button>
                </>
              )}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full btn-primary text-center py-3"
              >
                קבעו פגישה
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
