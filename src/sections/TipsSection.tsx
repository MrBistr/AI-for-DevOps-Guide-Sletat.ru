import { useState, useEffect, useRef } from 'react';
import { 
  Lightbulb, 
  Shield, 
  Zap, 
  Settings, 
  Globe, 
  CheckCircle2,
  ChevronDown,
  Terminal,
  Code2,
  Bot
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface TipCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  tips: {
    title: string;
    content: string;
    details?: string[];
  }[];
}

const tipCategories: TipCategory[] = [
  {
    id: 'golden',
    title: 'Золотые правила',
    icon: Lightbulb,
    color: 'yellow',
    tips: [
      {
        title: 'Rule of Thumb: Нативный harness',
        content: 'Модели показывают лучший результат в «родной» оболочке (например, модели Anthropic в Claude Code, в OpenAI в Codex).',
        details: [
          'Claude в Claude Code работает лучше, чем в Cursor',
          'Gemini лучше всего проявляет себя в Antigravity',
          'Нативная интеграция даёт доступ ко всем возможностям модели',
        ],
      },
      {
        title: 'Гибридный сетап для профи',
        content: 'Используйте Cursor для фронтенда и визуальных правок, а Claude Code — для сложной логики бэкенда.',
        details: [
          'Cursor — UI-задачи, визуальный контроль, наглядный diff',
          'Claude Code — backend-логика, рефакторинг, автоматизация',
          'Gemini (Antigravity) — фронтенд и дизайн',
        ],
      },
      {
        title: 'Правило одного сообщения',
        content: 'Для автономных агентов (OpenClaw) ставьте только те задачи, которые можно описать одним сообщением и не нужно контролировать в процессе.',
        details: [
          'Задача должна быть чётко описана',
          'Можно проверить результат',
          'Быстро откатить при ошибке',
        ],
      },
    ],
  },
  {
    id: 'setup',
    title: 'Настройка и подключение',
    icon: Settings,
    color: 'blue',
    tips: [
      {
        title: 'Файл CLAUDE.md — ваша «библия»',
        content: 'Перед первым рабочим использованием создайте CLAUDE.md в корне проекта с правилами, стеком и конвенциями.',
        details: [
          'Структура проекта',
          'Используемый стек (Go, TypeScript, etc.)',
          'Правила оформления кода (conventions)',
          'Команды сборки и ограничения',
        ],
      },
      {
        title: 'Настройка Codex через config.toml',
        content: 'Для Codex используйте ~/.codex/config.toml или локальный .codex/config.toml для настройки модели, провайдера и MCP.',
        details: [
          'Настройка модели и провайдера',
          'Approval policies',
          'MCP (Model Context Protocol)',
        ],
      },
      {
        title: 'Переменные окружения для API-ключей',
        content: 'Храните API-ключи в переменных окружения — это безопаснее и удобнее для работы в CI/CD средах.',
        details: [
          'ANTHROPIC_API_KEY для Claude Code',
          'OPENAI_API_KEY для Codex',
          'Не храните ключи в коде репозитория',
        ],
      },
    ],
  },
  {
    id: 'security',
    title: 'Безопасность и риски',
    icon: Shield,
    color: 'red',
    tips: [
      {
        title: 'Никогда не давайте полную автономность',
        content: 'Не давайте ИИ полную автономность на критичных данных, деньгах, доступах и production-системах.',
        details: [
          'Всегда проверяйте код перед production',
          'Контролируйте доступ к критичным данным',
          'Используйте approval policies',
        ],
      },
      {
        title: 'Автономные сценарии — только с понятной рамкой',
        content: 'Для автономных сценариев годятся только задачи с понятной рамкой: их можно описать одним сообщением, проверить по результату и быстро откатить при ошибке.',
        details: [
          'Однозначное описание задачи',
          'Возможность быстрой проверки',
          'Лёгкий откат изменений',
        ],
      },
      {
        title: 'Частые ошибки',
        content: 'Самые частые ошибки: просить сразу сделать большую фичу, давать слишком широкий контекст, не задавать правила проекта, принимать код без ревью.',
        details: [
          'Не просите сразу большую фичу',
          'Не давайте слишком широкий контекст',
          'Всегда задавайте правила проекта',
          'Всегда ревьюйте код ИИ',
        ],
      },
    ],
  },
  {
    id: 'rf',
    title: 'Доступ для пользователей из РФ',
    icon: Globe,
    color: 'green',
    tips: [
      {
        title: 'Оплата из РФ',
        content: 'Для подписки Pro рекомендуются виртуальные карты (ChocoPay, Epay) или шлюзы типа AITUNNEL для прямого доступа к API Claude.',
        details: [
          'ChocoPay — виртуальные карты',
          'Epay — альтернативный способ',
          'AITUNNEL — шлюз для доступа к API',
        ],
      },
      {
        title: 'Cursor работает без блокировок',
        content: 'Cursor работает в РФ без блокировок на бесплатном тарифе — отличный вариант для начала.',
        details: [
          'Бесплатный тариф доступен',
          'Не требует VPN',
          'Быстрая регистрация',
        ],
      },
      {
        title: 'Альтернативные способы доступа',
        content: 'Рассмотрите локальные модели или шлюзы для работы с Claude и OpenAI из РФ.',
        details: [
          'Локальные модели (Ollama, etc.)',
          'Шлюзы и прокси',
          'Зарубежные VPS для запуска',
        ],
      },
    ],
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
};

export default function TipsSection() {
  const [openTips, setOpenTips] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleTip = (categoryId: string, tipIndex: number) => {
    const key = `${categoryId}-${tipIndex}`;
    setOpenTips((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      id="tips"
      ref={sectionRef}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Советы и <span className="text-gradient">рекомендации</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Практические советы от опытных разработчиков для эффективной работы с ИИ
          </p>
        </div>

        {/* Tool Icons Summary */}
        <div className={`flex items-center justify-center gap-8 mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-2 text-purple-400">
            <Code2 className="w-5 h-5" />
            <span className="text-sm font-medium">Cursor — UI & Frontend</span>
          </div>
          <div className="flex items-center gap-2 text-orange-400">
            <Terminal className="w-5 h-5" />
            <span className="text-sm font-medium">Claude Code — Backend & Logic</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Bot className="w-5 h-5" />
            <span className="text-sm font-medium">Codex — Review & Quick tasks</span>
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tipCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            const colors = colorClasses[category.color];

            return (
              <div
                key={category.id}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${(categoryIndex + 1) * 150}ms` }}
              >
                <div className="glass-card rounded-2xl overflow-hidden h-full">
                  {/* Category Header */}
                  <div className={`p-6 ${colors.bg} border-b ${colors.border}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>
                  </div>

                  {/* Tips List */}
                  <div className="p-6 space-y-4">
                    {category.tips.map((tip, tipIndex) => {
                      const key = `${category.id}-${tipIndex}`;
                      const isOpen = openTips[key];

                      return (
                        <Collapsible
                          key={tipIndex}
                          open={isOpen}
                          onOpenChange={() => toggleTip(category.id, tipIndex)}
                        >
                          <div className="space-y-2">
                            <CollapsibleTrigger className="w-full">
                              <div className="flex items-start gap-3 text-left hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                                <CheckCircle2 className={`w-5 h-5 ${colors.text} mt-0.5 flex-shrink-0`} />
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{tip.title}</h4>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                              </div>
                            </CollapsibleTrigger>
                            <p className="text-sm text-muted-foreground pl-8">{tip.content}</p>
                            <CollapsibleContent>
                              {tip.details && (
                                <ul className="pl-8 pt-2 space-y-1">
                                  {tip.details.map((detail, i) => (
                                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                      <span className={`w-1 h-1 rounded-full ${colors.bg.replace('/10', '')} mt-1.5 flex-shrink-0`} />
                                      {detail}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </CollapsibleContent>
                          </div>
                        </Collapsible>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Reference Card */}
        <div className={`mt-12 glass-card rounded-2xl p-6 sm:p-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Быстрый выбор инструмента
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-5 h-5 text-purple-400" />
                <span className="font-semibold text-purple-400">Cursor</span>
              </div>
              <p className="text-xs text-muted-foreground">UI, визуальный контроль, наглядный diff, работа с файлами</p>
            </div>
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-5 h-5 text-orange-400" />
                <span className="font-semibold text-orange-400">Claude Code</span>
              </div>
              <p className="text-xs text-muted-foreground">Backend, рефакторинг, автоматизация, сложная логика</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-emerald-400">Codex</span>
              </div>
              <p className="text-xs text-muted-foreground">Code review, быстрые задачи, обсуждение решений</p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-blue-400">Antigravity</span>
              </div>
              <p className="text-xs text-muted-foreground">Frontend, дизайн, browser-in-the-loop, Chrome control</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
