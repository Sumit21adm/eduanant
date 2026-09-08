import { useEffect, useState } from 'react';

/**
 * Connection quality, for the schools browsing this on patchy mobile data.
 *
 * Reads the Network Information API where it exists (Chrome and Android, which
 * is most of our audience) and honours Data Saver. Everywhere else it reports
 * 'unknown' and nothing degrades — the site must never look broken because a
 * browser declined to tell us about the network.
 */
export type NetworkQuality = 'fast' | 'slow' | 'unknown';

interface NetworkInformation extends EventTarget {
    effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
    saveData?: boolean;
}

function connection(): NetworkInformation | undefined {
    return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

export function readNetworkQuality(): NetworkQuality {
    const c = connection();
    if (!c) return 'unknown';
    if (c.saveData) return 'slow';
    if (c.effectiveType && ['slow-2g', '2g', '3g'].includes(c.effectiveType)) return 'slow';
    return 'fast';
}

/**
 * Stamps data-net on <html> so CSS can stand decorative animation down on a weak
 * connection — those cost CPU on exactly the low-end Android handsets that tend
 * to be on one. Re-evaluates when the connection changes.
 */
export function useNetworkQuality(): NetworkQuality {
    const [quality, setQuality] = useState<NetworkQuality>(readNetworkQuality);

    useEffect(() => {
        const c = connection();
        const update = () => {
            const q = readNetworkQuality();
            setQuality(q);
            document.documentElement.dataset.net = q;
        };
        update();
        c?.addEventListener('change', update);
        return () => c?.removeEventListener('change', update);
    }, []);

    return quality;
}
