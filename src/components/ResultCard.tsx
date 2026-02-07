import React from 'react';
import { Star, Play, ExternalLink, RefreshCw, X } from 'lucide-react';

interface ResultCardProps {
    onClose: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ onClose }) => {
    return (
        <div className="w-full max-w-5xl mx-auto animate-fade-in relative z-50">
            <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 md:flex relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[60] text-white/50 hover:text-white bg-black/50 rounded-full p-2 backdrop-blur-md transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Poster Image */}
                <div className="md:w-1/3 relative group cursor-pointer overflow-hidden">
                    <img
                        src="https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
                        alt="The Dark Knight"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="md:w-2/3 p-8 md:p-10 relative bg-black/80 backdrop-blur-xl">
                    <div className="mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-green-500 text-sm font-semibold">98% Match</span>
                            </div>
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-2">The Dark Knight</h2>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <span className="border border-gray-700 px-2 py-0.5 rounded text-xs">MOVIE</span>
                            <span>2008</span>
                            <span>2h 32m</span>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-white font-medium">9.0</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Scene Description</h3>
                            <p className="text-gray-300 leading-relaxed border-l-2 border-primary pl-4">
                                "Joker interrogation scene. Batman slams Joker's head onto the metal table in the interrogation room. Features intense dialogue about chaos and order."
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Director</h3>
                                <p className="text-white">Christopher Nolan</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Main Cast</h3>
                                <p className="text-white">Christian Bale, Heath Ledger</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href="https://www.youtube.com/results?search_query=The+Dark+Knight+trailer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-lg bg-primary hover:bg-indigo-600 text-white font-semibold transition-colors flex items-center gap-2"
                            >
                                <Play className="w-4 h-4 fill-current" />
                                Watch Trailer
                            </a>
                            <a
                                href="https://www.imdb.com/find?q=The+Dark+Knight"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-white font-medium transition-colors flex items-center gap-2"
                            >
                                <ExternalLink className="w-4 h-4" />
                                View IMDb
                            </a>
                            <button
                                onClick={onClose}
                                className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white font-medium transition-colors flex items-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Another
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
