import CTA from './CTA';
import FeaturesList from './FeaturesList';
import HeroSection from './HeroSection';
import Highlights from './Highlights';
import PricingSection from './PricingSection';

const Home = () => {
    return (
        <>
            <HeroSection />
            <FeaturesList />
            <Highlights />
            <CTA />
            <PricingSection />
        </>
    );
};

export default Home;