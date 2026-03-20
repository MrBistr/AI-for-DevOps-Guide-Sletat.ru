import { useEffect, useState } from 'react';
import HeroSection from './sections/HeroSection';
import ToolsComparison from './sections/ToolsComparison';
import UsageFormats from './sections/UsageFormats';
import WorkflowSection from './sections/WorkflowSection';
import TipsSection from './sections/TipsSection';
import FAQSection from './sections/FAQSection';
import Footer from './sections/Footer';
import Navigation from './sections/Navigation';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Background grid pattern */}
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />
      
      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      
      {/* Navigation */}
      <Navigation scrolled={scrolled} />
      
      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <ToolsComparison />
        <UsageFormats />
        <WorkflowSection />
        <TipsSection />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
