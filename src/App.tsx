import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';

const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const UpdatesPage = lazy(() => import('./pages/UpdatesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage'));
const DemoPage = lazy(() => import('./pages/DemoPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/** Holds the page height while a route chunk arrives, so the header does not jump. */
function RouteFallback() {
    return <div className="min-h-[70vh]" aria-busy="true" />;
}

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                {/* Cinematic noise overlay */}
                <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.025] dark:opacity-[0.04] mix-blend-overlay noise-overlay" />
                {/* Brand ambient glow */}
                <div className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none z-0 opacity-20 dark:opacity-15"
                    style={{ background: 'radial-gradient(ellipse at 0% 0%, #1E1B4B, transparent 70%)', filter: 'blur(60px)' }} />
                <div className="fixed bottom-0 right-0 w-[50vw] h-[50vh] pointer-events-none z-0 opacity-15 dark:opacity-10"
                    style={{ background: 'radial-gradient(ellipse at 100% 100%, #F59E0B, transparent 70%)', filter: 'blur(80px)' }} />

                <Suspense fallback={<RouteFallback />}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/features" element={<FeaturesPage />} />
                        <Route path="/security" element={<SecurityPage />} />
                        <Route path="/updates" element={<UpdatesPage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/demo" element={<DemoPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/register" element={<RegistrationPage />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                        <Route path="/refund-policy" element={<RefundPolicyPage />} />
                        {/* Anything else: a real 404 page, noindex. nginx returns a 404
                            status for these rather than a soft 200. */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
                </Suspense>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
