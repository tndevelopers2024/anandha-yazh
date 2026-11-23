import Nav from '@/components/Nav';
import Hero from '@/components/hero/Hero';
import Services from '@/components/Services';
import Concerns from '@/components/Concerns';
import Ages from '@/components/Ages';
import Doctor from '@/components/Doctor';
import Approach from '@/components/Approach';
import ParentsCorner from '@/components/ParentsCorner';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { ExploreProvider } from '@/components/ui/Explore';
import Cursor from '@/components/ui/Cursor';
import { IntroProvider } from '@/components/ui/Intro';
import { AudienceProvider } from '@/components/ui/Audience';

export default function HomePage() {
  return (
    <IntroProvider>
    <ExploreProvider>
    <AudienceProvider>
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <Services />
        <Concerns />
        <Ages />
        <Doctor />
        <Approach />
        <ParentsCorner />
        <Contact />
      </main>
      <Footer />
    </AudienceProvider>
    </ExploreProvider>
    </IntroProvider>
  );
}
