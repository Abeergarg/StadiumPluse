'use client';

import { useReveal } from '@/lib/hooks';
import HeroSection     from '@/components/landing/HeroSection';
import FeatureSections from '@/components/landing/FeatureSections';
import Footer          from '@/components/landing/Footer';

export default function HomePage() {
  // Wire up scroll-reveal on all `.reveal` elements across all sections
  useReveal();
  return (
    <>
      <HeroSection />
      <FeatureSections />
      <Footer />
    </>
  );
}
