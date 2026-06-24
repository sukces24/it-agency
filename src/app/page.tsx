import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import TechStack from '@/components/TechStack';
import Portfolio from '@/components/Portfolio';
import CostRescue from '@/components/CostRescue';
import HowWeWork from '@/components/HowWeWork';
import TestimonialsContact from '@/components/TestimonialsContact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyUs />
      <TechStack />
      <Portfolio />
      <CostRescue />
      <HowWeWork />
      <TestimonialsContact />
    </main>
  );
}
