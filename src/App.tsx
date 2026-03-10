import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DemoSection from './components/DemoSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background transition-colors duration-300 flex flex-col relative">
        {/* Global Cinematic Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")', animation: 'noise-jitter 0.5s steps(2) infinite' }} />

        <Header />

        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <DemoSection />

          <PricingSection />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
