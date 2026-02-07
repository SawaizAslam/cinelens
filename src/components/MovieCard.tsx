import React from 'react';
import { Star, Play } from 'lucide-react';

interface MovieCardProps {
    title: string;
    image: string;
    rating: number;
    year: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, image, rating, year }) => {
    return (
        <div className="relative group cursor-pointer w-full md:w-48 flex-shrink-0 animate-fade-in">
            <div className="relative overflow-hidden rounded-xl aspect-[2/3] mb-3">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-5 h-5 fill-white text-white ml-1" />
                    </div>
                </div>
                <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-xs font-bold text-white flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    {rating}
                </div>
            </div>
            <h3 className="text-white font-medium text-sm truncate group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-gray-500 text-xs">{year}</p>
        </div>
    );
};

export default MovieCard;
