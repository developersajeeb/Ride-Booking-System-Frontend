import RideRequestForm from '@/components/shared/RideRequestForm';
import CTA from './CTA';
import FeaturesList from './FeaturesList';
import HeroSection from './HeroSection';
import Highlights from './Highlights';
import PricingSection from './PricingSection';

const Home = () => {
    return (
        <>
            <HeroSection />
            <section className="max-w-[1300px] mx-auto px-4 pb-20">
                <RideRequestForm />
            </section>
            <FeaturesList />
            <Highlights />
            <CTA />
            <PricingSection />
        </>
    );
};

export default Home;