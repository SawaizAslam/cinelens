import React from 'react';
import { Film, Twitter, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Film className="w-6 h-6 text-primary" />
                            <span className="text-xl font-bold text-white">Cazem</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Like Shazam for movies! AI-powered instant movie identification. Built with Gemini 3 AI.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Integration</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Team</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <div className="font-medium text-white">Muhammad Sawaiz Aslam</div>
                                <div className="text-xs text-gray-500">Product Developer</div>
                                <div className="flex gap-2 mt-1">
                                    <a href="https://github.com/SawaizAslam" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                        <Github className="w-3.5 h-3.5" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/muhammad-sawaiz-aslam-0137aa196/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                        <Linkedin className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="font-medium text-white">Adan Aamir</div>
                                <div className="text-xs text-gray-500">UI/UX Designer</div>
                                <div className="flex gap-2 mt-1">
                                    <a href="https://github.com/adanaamir" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                        <Github className="w-3.5 h-3.5" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/adan-aamir/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                        <Linkedin className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary/20 hover:text-primary transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary/20 hover:text-primary transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary/20 hover:text-primary transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © 2026 Cazem. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <span>Built with Gemini</span>
                        <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                        <span>Hackathon Project</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
