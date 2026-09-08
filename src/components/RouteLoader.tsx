import { useEffect, useState } from 'react';
import { readNetworkQuality } from '../lib/network';

/**
 * Shown while a route's JavaScript chunk is downloading.
 *
 * Nothing appears for the first 300 ms: on a good connection the chunk arrives
 * sooner than that, and flashing a spinner is worse than showing nothing. Past
 * that the visitor gets a clear "loading" state, and past 2.5 s — or immediately
 * on a connection we already know is weak — it says so plainly, because a blank
 * area with no explanation reads as a broken site rather than a slow one.
 */
export default function RouteLoader() {
    const [phase, setPhase] = useState<'hidden' | 'loading' | 'slow'>('hidden');

    useEffect(() => {
        const weak = readNetworkQuality() === 'slow';
        const show = setTimeout(() => setPhase(weak ? 'slow' : 'loading'), 300);
        const nag = setTimeout(() => setPhase('slow'), 2500);
        return () => { clearTimeout(show); clearTimeout(nag); };
    }, []);

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6" aria-busy="true" aria-live="polite">
            {phase !== 'hidden' && (
                <div className="flex flex-col items-center gap-4 text-center">
                    <span className="relative flex h-10 w-10" aria-hidden>
                        <span className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-white/10" />
                        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00b6d5] animate-spin" />
                    </span>
                    <p className="text-sm font-semibold text-text-secondary">
                        {phase === 'slow' ? 'Loading — this is taking a moment' : 'Loading…'}
                    </p>
                    {phase === 'slow' && (
                        <p className="text-xs text-text-secondary/70 max-w-xs">
                            Your connection looks slow right now. The page will appear as soon as it arrives.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
