import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../services/data';

interface NavbarProps {
    scrolled: boolean;
}

export function Navbar({ scrolled }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 ${scrolled ? 'bg-black' : 'bg-white/20 border border-white/30'
                            }`}
                    >
                        <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <span
                        className={`text-xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-black' : 'text-white'
                            }`}
                    >
                        AdPlatform
                    </span>
                </div>

                {/* Desktop nav links */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            className={`text-sm font-medium transition-colors duration-300 ${scrolled
                                ? 'text-gray-600 hover:text-black'
                                : 'text-white/85 hover:text-white'
                                }`}
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        to="/dashboard"
                        className={`text-sm font-medium transition-colors duration-300 px-3 py-2 ${scrolled
                            ? 'text-gray-600 hover:text-black'
                            : 'text-white/85 hover:text-white'
                            }`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/dashboard"
                        className={`text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 ${scrolled
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'bg-white text-black hover:bg-gray-100'
                            }`}
                    >
                        Get Started Free
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                        }`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-lg">
                    {NAV_LINKS.map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm font-medium text-gray-700 hover:text-black py-2"
                        >
                            {l.label}
                        </a>
                    ))}
                    <div className="pt-3 flex flex-col gap-3 border-t border-gray-100">
                        <Link
                            to="/dashboard"
                            className="block text-sm font-medium text-gray-700 hover:text-black py-2 rounded-lg border border-gray-200 text-center hover:bg-gray-50 transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/dashboard"
                            className="text-sm font-semibold text-center bg-black text-white py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
