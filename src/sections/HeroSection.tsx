import { useEffect, useRef } from 'react';
import { Sparkles, Code2, Terminal, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToTools = () => {
    document.querySelector('#tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="animate-on-scroll opacity-0 mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Полное руководство 2025
          </span>
        </div>

        {/* Main Title */}
        <h1 className="animate-on-scroll opacity-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ animationDelay: '0.1s' }}>
          <span className="text-foreground">ИИ-инструменты</span>
          <br />
          <span className="text-gradient">для разработчика</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-on-scroll opacity-0 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8" style={{ animationDelay: '0.2s' }}>
          Подробное сравнение <span className="text-purple-400 font-medium">Cursor</span>,{' '}
          <span className="text-orange-400 font-medium">Claude Code</span> и{' '}
          <span className="text-emerald-400 font-medium">OpenAI Codex</span>.
          Узнайте, как использовать ИИ для ускорения разработки без потери качества.
        </p>

        {/* Tool Icons */}
        <div className="animate-on-scroll opacity-0 flex items-center justify-center gap-4 sm:gap-8 mb-10" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500/20 transition-all glow-cursor">
              <Code2 className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400" />
            </div>
            <span className="text-xs text-muted-foreground">Cursor</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500/20 transition-all glow-claude">
              <Terminal className="w-7 h-7 sm:w-8 sm:h-8 text-orange-400" />
            </div>
            <span className="text-xs text-muted-foreground">Claude Code</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all glow-codex">
              <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
            </div>
            <span className="text-xs text-muted-foreground">Codex</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
          <Button
            size="lg"
            onClick={scrollToTools}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-105"
          >
            Начать изучение
          </Button>
        </div>

        {/* Stats */}
        <div className="animate-on-scroll opacity-0 mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto" style={{ animationDelay: '0.5s' }}>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gradient">3</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Инструмента</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gradient">40%</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Экономия времени</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gradient">100%</div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1">Практические советы</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
}
