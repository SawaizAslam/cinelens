import React from 'react';
import { Star, Play, ExternalLink, RefreshCw, X } from 'lucide-react';
import type { MovieResult } from '../services/gemini';

interface ResultCardProps {
    onClose: () => void;
    data: MovieResult | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ onClose, data }) => {
    if (!data) return null;

    return (
        <div className="w-full max-w-5xl mx-auto animate-fade-in relative z-50">
            <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 md:flex relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[60] text-white/50 hover:text-white bg-black/50 rounded-full p-2 backdrop-blur-md transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Poster Image (Placeholder for now until TMDB Phase) */}
                <div className="md:w-1/3 relative group cursor-pointer overflow-hidden bg-black/50 flex items-center justify-center">
                    <img
                        src="https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
                        alt={data.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50 grayscale hover:grayscale-0"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <span className="text-gray-400 text-sm mb-2">Poster coming in next phase</span>
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                            <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="md:w-2/3 p-8 md:p-10 relative bg-black/80 backdrop-blur-xl">
                    <div className="mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-green-500 text-sm font-semibold">{data.matchScore}% Match</span>
                            </div>
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-2">{data.title}</h2>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <span className="border border-gray-700 px-2 py-0.5 rounded text-xs">MOVIE</span>
                            <span>{data.year}</span>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-white font-medium">{data.rating}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Scene Description</h3>
                            <p className="text-gray-300 leading-relaxed border-l-2 border-primary pl-4">
                                "{data.description}"
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Director</h3>
                                <p className="text-white">{data.director}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Main Cast</h3>
                                <p className="text-white">{data.cast}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(data.title + " trailer")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-lg bg-primary hover:bg-indigo-600 text-white font-semibold transition-colors flex items-center gap-2"
                            >
                                <Play className="w-4 h-4 fill-current" />
                                Watch Trailer
                            </a>
                            <a
                                href={`https://www.imdb.com/find?q=${encodeURIComponent(data.title)}`}
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
