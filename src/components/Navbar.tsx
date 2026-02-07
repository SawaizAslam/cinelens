import React, { useState, useEffect } from 'react';
import { Film, Menu, X, Github } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/50 backdrop-blur-md py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                        <div className="relative bg-black rounded-full p-2">
                            <Film className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <span className="text-2xl font-bold tracking-tighter text-white">
                        Cine<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Lens</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
                    <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it works</a>
                    <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                    </a>
                    <button className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all text-white font-medium">
                        Try Demo
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 md:hidden flex flex-col gap-4">
                    <a href="#" className="text-lg text-white">Home</a>
                    <a href="#how-it-works" className="text-lg text-gray-300">How it works</a>
                    <a href="#" className="text-lg text-gray-300">GitHub</a>
                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold">
                        Try Demo
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
