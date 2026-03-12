import { useState, useEffect } from 'react';
import { Navbar } from './landing/Navbar';
import { HeroSection } from './landing/HeroSection';
import { StatsSection } from './landing/StatsSection';
import { FeaturesSection } from './landing/FeaturesSection';
import { HowItWorksSection } from './landing/HowItWorksSection';
import { TestimonialsSection } from './landing/TestimonialsSection';
import { PricingSection } from './landing/PricingSection';
import { CtaBand } from './landing/CtaBand';
import { FooterSection } from './landing/FooterSection';

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    return (
        <div className="min-h-screen bg-white text-black overflow-x-hidden">
            <Navbar scrolled={scrolled} />
            <HeroSection />
            <StatsSection />
            <FeaturesSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <PricingSection />
            <CtaBand />
            <FooterSection />
        </div>
    );
}
