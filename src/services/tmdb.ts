// TMDB API Service
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface TMDBMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    genres?: { id: number; name: string }[];
    runtime?: number;
}

export interface TMDBSearchResult {
    page: number;
    results: TMDBMovie[];
    total_pages: number;
    total_results: number;
}

/**
 * Search for a movie by title
 */
export const searchMovie = async (title: string): Promise<TMDBMovie | null> => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&page=1`
        );

        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status}`);
        }

        const data: TMDBSearchResult = await response.json();

        // Return the first result (most relevant)
        return data.results[0] || null;
    } catch (error) {
        console.error('Error searching movie:', error);
        return null;
    }
};

/**
 * Get detailed movie information by ID
 */
export const getMovieDetails = async (movieId: number): Promise<TMDBMovie | null> => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};

/**
 * Get full poster URL from poster_path
 */
export const getMoviePoster = (posterPath: string | null, size: 'w200' | 'w500' | 'original' = 'w500'): string => {
    if (!posterPath) {
        return 'https://via.placeholder.com/500x750?text=No+Poster';
    }
    return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
};

/**
 * Get similar/recommended movies
 */
export const getSimilarMovies = async (movieId: number): Promise<TMDBMovie[]> => {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}&page=1`
        );

        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.status}`);
        }

        const data: TMDBSearchResult = await response.json();
        return data.results.slice(0, 4); // Return top 4 similar movies
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        return [];
    }
};

/**
 * Enrich Gemini result with TMDB data
 */
export const enrichMovieData = async (geminiTitle: string) => {
    try {
        // Search for the movie
        const searchResult = await searchMovie(geminiTitle);

        if (!searchResult) {
            return null;
        }

        // Get detailed information
        const details = await getMovieDetails(searchResult.id);

        if (!details) {
            return null;
        }

        // Get similar movies for recommendations
        const similar = await getSimilarMovies(searchResult.id);

        return {
            tmdbId: details.id,
            poster: getMoviePoster(details.poster_path),
            backdrop: getMoviePoster(details.backdrop_path, 'original'),
            overview: details.overview,
            releaseDate: details.release_date,
            rating: details.vote_average,
            genres: details.genres?.map(g => g.name).join(', ') || '',
            runtime: details.runtime,
            similarMovies: similar.map(movie => ({
                title: movie.title,
                image: getMoviePoster(movie.poster_path),
                rating: movie.vote_average,
                year: new Date(movie.release_date).getFullYear()
            }))
        };
    } catch (error) {
        console.error('Error enriching movie data:', error);
        return null;
    }
};
