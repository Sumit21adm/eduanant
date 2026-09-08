import { useEffect } from 'react';

export const SITE = {
    name: 'EduAnant',
    legalName: 'Snapx Technologies LLP',
    url: 'https://eduanant.cloud',
    logo: 'https://eduanant.cloud/eduanant-logo.svg',
    ogImage: 'https://eduanant.cloud/og-whatsapp-preview.png',
    phone: '+91-79036-12979',
    email: 'hello@eduanant.cloud',
    locality: 'Patna',
    region: 'Bihar',
    postalCode: '804453',
    country: 'IN',
    /** The product's released version — not the website build. */
    version: '1.4.0',
} as const;

export interface SeoProps {
    title: string;
    description: string;
    path: string;
    keywords?: string;
    /** Extra JSON-LD graph nodes for this page (breadcrumbs are added automatically). */
    schema?: Record<string, unknown>[];
    /** Breadcrumb trail after Home, e.g. [{ name: 'Pricing', path: '/pricing' }]. */
    crumbs?: { name: string; path: string }[];
    noindex?: boolean;
}

/** Create or update a <meta> by name or property. */
function upsertMeta(key: 'name' | 'property', value: string, content: string) {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(key, value);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
    let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
}

/**
 * Per-route SEO. Writes title, description, canonical, Open Graph, Twitter and
 * JSON-LD into <head>.
 *
 * This runs in an effect, which is enough for browsers and for Google — but most
 * AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not execute JavaScript. The
 * prerender step in `scripts/prerender.mjs` runs each route through headless
 * Chrome at build time and writes the resulting HTML to disk, so those crawlers
 * receive fully-formed markup. Keep the two in step: a route added to the router
 * must also be added to ROUTES there.
 */
export default function Seo({ title, description, path, keywords, schema = [], crumbs = [], noindex }: SeoProps) {
    useEffect(() => {
        const url = `${SITE.url}${path === '/' ? '/' : path}`;

        document.title = title;
        upsertMeta('name', 'description', description);
        if (keywords) upsertMeta('name', 'keywords', keywords);
        upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
        upsertLink('canonical', url);

        upsertMeta('property', 'og:title', title);
        upsertMeta('property', 'og:description', description);
        upsertMeta('property', 'og:url', url);
        upsertMeta('property', 'og:type', 'website');
        upsertMeta('property', 'og:site_name', SITE.name);
        upsertMeta('property', 'og:locale', 'en_IN');
        upsertMeta('property', 'og:image', SITE.ogImage);

        upsertMeta('name', 'twitter:card', 'summary_large_image');
        upsertMeta('name', 'twitter:title', title);
        upsertMeta('name', 'twitter:description', description);
        upsertMeta('name', 'twitter:image', SITE.ogImage);

        const breadcrumb = {
            '@type': 'BreadcrumbList',
            itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: c.name,
                item: `${SITE.url}${c.path === '/' ? '/' : c.path}`,
            })),
        };

        const graph = [breadcrumb, ...schema];
        const id = 'page-jsonld';
        document.getElementById(id)?.remove();
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.id = id;
        s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
        document.head.appendChild(s);
    }, [title, description, path, keywords, noindex, schema, crumbs]);

    return null;
}
