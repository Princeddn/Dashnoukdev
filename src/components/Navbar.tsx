"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useNavbarData } from "@/hooks/useSiteSettings";
import { useNavigationLinks } from "@/hooks/useCMS";

export function Navbar() {
  const { data: navbarData, loading: navbarLoading } = useNavbarData();
  const { data: navLinks, loading: linksLoading } = useNavigationLinks();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show minimal navbar while loading
  if (navbarLoading || linksLoading || !navbarData || !navLinks) {
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 glass-card shadow-apple-medium`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="w-10 h-10 rounded-apple bg-gradient-to-br from-apple-blue to-apple-purple flex items-center justify-center shadow-apple-subtle animate-pulse" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-card shadow-apple-medium"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-apple bg-gradient-to-br from-apple-blue to-apple-purple flex items-center justify-center shadow-apple-subtle">
                <span className="text-white font-bold text-lg">{navbarData.logo_text}</span>
              </div>
              <span className="font-semibold text-lg text-apple-gray-900 hidden sm:block">
                {navbarData.site_name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="px-4 py-2 rounded-apple-sm text-apple-gray-900 hover:bg-apple-gray-100 transition-colors font-medium"
                    {...(link.is_external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href={navbarData.cta_href}
                  className="ml-2 px-6 py-2 bg-apple-blue text-white rounded-apple-sm hover:bg-apple-blue/90 transition-colors font-medium shadow-apple-subtle"
                >
                  {navbarData.cta_text}
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-apple-sm hover:bg-apple-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-apple-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-apple-gray-900" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 glass-card m-4 rounded-apple-lg shadow-apple-strong">
            <ul className="py-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="block px-6 py-3 text-apple-gray-900 hover:bg-apple-gray-100 transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                    {...(link.is_external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="px-6 pt-2">
                <Link
                  href={navbarData.cta_href}
                  className="block text-center px-6 py-3 bg-apple-blue text-white rounded-apple hover:bg-apple-blue/90 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {navbarData.cta_text}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
