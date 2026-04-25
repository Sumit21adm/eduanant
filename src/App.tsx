import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import SecurityPage from './pages/SecurityPage';
import UpdatesPage from './pages/UpdatesPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                {/* Cinematic noise overlay */}
                <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.025] dark:opacity-[0.04] mix-blend-overlay noise-overlay" />
                {/* Brand ambient glow */}
                <div className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none z-0 opacity-20 dark:opacity-15"
                    style={{ background: 'radial-gradient(ellipse at 0% 0%, #17305a, transparent 70%)', filter: 'blur(60px)' }} />
                <div className="fixed bottom-0 right-0 w-[50vw] h-[50vh] pointer-events-none z-0 opacity-15 dark:opacity-10"
                    style={{ background: 'radial-gradient(ellipse at 100% 100%, #00b6d5, transparent 70%)', filter: 'blur(80px)' }} />

                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/features" element={<FeaturesPage />} />
                        <Route path="/security" element={<SecurityPage />} />
                        <Route path="/updates" element={<UpdatesPage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
