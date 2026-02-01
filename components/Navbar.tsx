'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Building2, Phone, Mail, Shield, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
        const res = await fetch('/api/admin/stats');
        setIsAdmin(res.ok);
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdminAuth();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium hover:text-ocean-500 transition-colors ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <>
                <Link
                  href="/admin/dashboard"
                  className={`flex items-center gap-1 font-medium hover:text-ocean-500 transition-colors ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  פאנל ניהול
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-1 font-medium hover:text-red-500 transition-colors ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  יציאה
                </button>
              </>
            )}
            <Link href="/contact" className="btn-primary text-sm py-2 px-6">
              קבעו פגישה
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-ocean-500 p-2 rounded-lg group-hover:bg-ocean-600 transition-colors">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div
                className={`font-bold text-xl uppercase ${
                  scrolled ? 'text-ocean-900' : 'text-white'
                }`}
              >
                Cyprus Insights
              </div>
              <div
                className={`text-xs ${
                  scrolled ? 'text-gray-600' : 'text-white/80'
                }`}
              >
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
