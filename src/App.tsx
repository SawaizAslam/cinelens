import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InputCard from './components/InputCard';
import ResultCard from './components/ResultCard';
import MovieCard from './components/MovieCard';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import { identifyImage, identifyDialogue } from './services/gemini';
import type { MovieResult } from './services/gemini';
import { enrichMovieData } from './services/tmdb';

function App() {
  const [showResult, setShowResult] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isModalScrolled, setIsModalScrolled] = useState(false);
  const [activeInputTab, setActiveInputTab] = useState<'upload' | 'camera' | 'dialogue'>('upload');
  const [resultData, setResultData] = useState<MovieResult | null>(null);
  const [tmdbData, setTmdbData] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleTabSelect = (tab: 'upload' | 'camera' | 'dialogue') => {
    setActiveInputTab(tab);
    document.getElementById('identify-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleIdentify = async (input?: string) => {
    if (!input) return;

    setIsAnalyzing(true);

    try {
      let result: MovieResult | null = null;

      // Check if input is an image (data URL) or text prompt
      if (input.startsWith('data:image')) {
        result = await identifyImage(input);
      } else {
        // Assume it's a dialogue text
        result = await identifyDialogue(input);
      }

      if (result) {
        setResultData(result);

        // Enrich with TMDB data
        const tmdb = await enrichMovieData(result.title);
        if (tmdb) {
          setTmdbData(tmdb);
          setRecommendations(tmdb.similarMovies || []);
        }

        setShowResult(true);
        setIsModalScrolled(false);
      } else {
        alert("Could not identify the content. The AI detection returned no result.");
      }
    } catch (error: any) {
      console.error("Identification Failed:", error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    } finally {
      setIsAnalyzing(false);
    }
  };


  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-white">
      <Navbar forceScrolled={isModalScrolled} />

      <main className="relative z-10">
        <Hero onSelectTab={handleTabSelect} />

        <div id="identify-section" className="container mx-auto px-6 relative z-20">
          <InputCard
            onIdentify={handleIdentify}
            activeTab={activeInputTab}
            onTabChange={setActiveInputTab}
          />
        </div>

        {/* Analyzing Loader Overlay */}
        {isAnalyzing && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-white/10 border-t-primary animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 animate-pulse"></div>
              </div>
            </div>
            <h3 className="mt-8 text-2xl font-bold text-white animate-pulse">Analyzing Scene...</h3>
            <p className="text-gray-400 mt-2">Gemini AI is processing visual data</p>
          </div>
        )}

        {showResult && resultData && (
          <div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm overflow-y-auto pt-20"
            onScroll={(e) => setIsModalScrolled(e.currentTarget.scrollTop > 10)}
          >
            <div className="min-h-screen px-4 text-center">

              {/* Overlay ghost element for centering */}
              <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

              <div className="inline-block w-full max-w-6xl text-left align-middle transition-all transform animate-slide-up my-8 relative">

                <ResultCard onClose={() => setShowResult(false)} data={resultData} tmdbData={tmdbData} />

                {/* Recommendations Section inside Modal */}
                {recommendations.length > 0 && (
                  <div className="mt-12 bg-black/50 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-secondary rounded-full"></span>
                      You may also like
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {recommendations.map((movie, idx) => (
                        <MovieCard key={idx} {...movie} />
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}

export default App;
