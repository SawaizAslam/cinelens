import React from 'react';
import { Camera, Image as ImageIcon, MessageSquare, ArrowRight } from 'lucide-react';

interface HeroProps {
    onSelectTab: (tab: 'upload' | 'camera' | 'dialogue') => void;
}

const Hero: React.FC<HeroProps> = ({ onSelectTab }) => {
    return (
        <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in shadow-lg shadow-primary/5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm font-medium text-gray-300">Powered by Gemini AI 2.0</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight animate-slide-up">
                    Identify Any Movie Scene <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                        Instantly
                    </span>
                </h1>

                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Upload a scene, screenshot, or dialogue. Let our advanced AI reveal exactly what you’re watching in seconds.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <button
                        onClick={() => onSelectTab('upload')}
                        className="group relative px-8 py-4 rounded-xl bg-white text-black font-bold text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <ImageIcon className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Upload Scene</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => onSelectTab('camera')}
                        className="px-8 py-4 rounded-xl glass hover:bg-white/10 text-white font-semibold text-lg transition-all flex items-center gap-2 border border-white/10"
                    >
                        <Camera className="w-5 h-5" />
                        <span>Use Camera</span>
                    </button>

                    <button
                        onClick={() => onSelectTab('dialogue')}
                        className="px-8 py-4 rounded-xl glass hover:bg-white/10 text-white font-semibold text-lg transition-all flex items-center gap-2 border border-white/10"
                    >
                        <MessageSquare className="w-5 h-5" />
                        <span>Dialogue</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
