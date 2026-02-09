import React from 'react';
import { Upload, Cpu, Film } from 'lucide-react';

const HowItWorks: React.FC = () => {
    return (
        <div id="how-it-works" className="py-20 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full -z-10"></div>

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How Cazem Works</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Powered by Google's Gemini 3 API, we analyze visual scenes and dialogue to identify movies with cutting-edge AI technology.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Upload className="w-8 h-8 text-primary" />,
                            title: "Upload or Capture",
                            desc: "Drop a screenshot, take a photo, or type a quote from the movie.",
                            step: "01"
                        },
                        {
                            icon: <Cpu className="w-8 h-8 text-secondary" />,
                            title: "Gemini 3 Analysis",
                            desc: "Google's Gemini 3 API processes your input using advanced vision and language models to identify the movie.",
                            step: "02"
                        },
                        {
                            icon: <Film className="w-8 h-8 text-accent" />,
                            title: "Instant Results",
                            desc: "Get the movie title, exact scene details, and streaming availability.",
                            step: "03"
                        }
                    ].map((item, index) => (
                        <div key={index} className="glass p-8 rounded-2xl relative group hover:-translate-y-2 transition-transform duration-300">
                            <div className="absolute top-4 right-4 text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                                {item.step}
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
