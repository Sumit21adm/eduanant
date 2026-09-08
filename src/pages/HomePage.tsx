import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import PainPointsSection from '../components/PainPointsSection';
import ProductDemoSection from '../components/ProductDemoSection';
import CapabilitiesSection from '../components/CapabilitiesSection';
import WhyUsSection from '../components/WhyUsSection';
import ProofSection from '../components/ProofSection';
import PricingSection from '../components/PricingSection';
import Seo from '../lib/seo';
import { PAGE_SEO, softwareSchema, organizationSchema, homeFaqSchema } from '../lib/seoConfig';

export default function HomePage() {
    return (
        <>
            <Seo {...PAGE_SEO.home} schema={[softwareSchema, organizationSchema, homeFaqSchema]} crumbs={[]} />
            <>
                <HeroSection />
                <StatsSection />
                <PainPointsSection />
                <ProductDemoSection />
                <CapabilitiesSection />
                <WhyUsSection />
                <ProofSection />
                <PricingSection />
            </>
        </>
    );
}

