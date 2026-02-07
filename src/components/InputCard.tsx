import React, { useState } from 'react';
import { Upload, Camera, MessageSquare, Search } from 'lucide-react';

interface InputCardProps {
    onIdentify: () => void;
}

const InputCard: React.FC<InputCardProps> = ({ onIdentify }) => {
    const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'dialogue'>('upload');
    const [isDragOver, setIsDragOver] = useState(false);

    return (
        <div className="w-full max-w-3xl mx-auto glass rounded-2xl p-1 relative z-20 -mt-10 mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl -z-10"></div>

            <div className="bg-black/80 backdrop-blur-xl rounded-xl p-6 md:p-8 border border-white/5">
                <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`flex items-center gap-2 pb-2 transition-all ${activeTab === 'upload'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <Upload className="w-4 h-4" />
                        <span className="font-medium">Upload Scene</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('camera')}
                        className={`flex items-center gap-2 pb-2 transition-all ${activeTab === 'camera'
                                ? 'text-secondary border-b-2 border-secondary'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <Camera className="w-4 h-4" />
                        <span className="font-medium">Camera</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('dialogue')}
                        className={`flex items-center gap-2 pb-2 transition-all ${activeTab === 'dialogue'
                                ? 'text-accent border-b-2 border-accent'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-medium">Dialogue</span>
                    </button>
                </div>

                {activeTab === 'upload' && (
                    <div
                        className={`
              border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer group
              ${isDragOver ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/20 hover:bg-white/5'}
            `}
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Drop a movie scene or screenshot</h3>
                        <p className="text-gray-400 mb-6">Supported formats: JPG, PNG, WEBP (Max 10MB)</p>
                        <button className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors">
                            Browse Files
                        </button>
                    </div>
                )}

                {activeTab === 'camera' && (
                    <div className="aspect-video bg-black rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white font-medium">Click to capture</p>
                        </div>
                        <button className="w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center hover:bg-white/10 transition-all hover:scale-105">
                            <div className="w-16 h-16 rounded-full bg-red-500"></div>
                        </button>
                    </div>
                )}

                {activeTab === 'dialogue' && (
                    <div className="space-y-4">
                        <textarea
                            className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none text-lg"
                            placeholder='Type a famous dialogue... e.g. "Why so serious?"'
                        ></textarea>
                        <div className="flex justify-end">
                            <button
                                onClick={onIdentify}
                                className="px-8 py-3 rounded-xl bg-gradient-to-r from-accent to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-accent/25 transition-all flex items-center gap-2"
                            >
                                <Search className="w-5 h-5" />
                                <span>Identify Now</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputCard;
