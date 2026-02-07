import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InputCard from './components/InputCard';
import ResultCard from './components/ResultCard';
import MovieCard from './components/MovieCard';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  const [showResult, setShowResult] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleIdentify = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
      // Smooth scroll to result
      document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 2000);
  };

  const recommendations = [
    {
      title: "Inception",
      image: "https://image.tmdb.org/t/p/w500/9gk7admal4zlWH9AJ46r4tpUUyU.jpg",
      rating: 8.8,
      year: 2010
    },
    {
      title: "Interstellar",
      image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: 8.6,
      year: 2014
    },
    {
      title: "The Prestige",
      image: "https://image.tmdb.org/t/p/w500/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg",
      rating: 8.5,
      year: 2006
    },
    {
      title: "Tenet",
      image: "https://image.tmdb.org/t/p/w500/k68nPLbISTUMPC96vRdyE8TRp71.jpg",
      rating: 7.3,
      year: 2020
    }
  ];

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-white">
      <Navbar />

      <main className="relative z-10">
        <Hero onStart={() => document.getElementById('identify-section')?.scrollIntoView({ behavior: 'smooth' })} />

        <div id="identify-section" className="container mx-auto px-6 relative z-20">
          <InputCard onIdentify={handleIdentify} />
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

        {showResult && (
          <div id="result-section" className="bg-gradient-to-b from-transparent to-black/50 py-20 border-t border-white/5 mx-auto px-6">
            <div className="container mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-gradient-to-r from-transparent to-primary flex-1"></div>
                <h2 className="text-2xl font-bold text-white">Analysis Result</h2>
                <div className="h-px bg-gradient-to-l from-transparent to-primary flex-1"></div>
              </div>

              <ResultCard />

              <div className="max-w-5xl mx-auto mt-16">
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
