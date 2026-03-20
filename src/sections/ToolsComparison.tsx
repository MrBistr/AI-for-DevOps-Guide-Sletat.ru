import { useState, useEffect, useRef } from 'react';
import { Code2, Terminal, Bot, ChevronDown, Check, X, Star, Zap, Shield } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ToolData {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  glowClass: string;
  description: string;
  pros: string[];
  cons: string[];
  ratings: {
    interface: number;
    planning: number;
    result: number;
    overall: number;
  };
  details: {
    setup: string;
    bestFor: string[];
    integration: string[];
    pricing: string;
  };
}

const tools: ToolData[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    subtitle: 'Полноценная AI-IDE',
    icon: Code2,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    glowClass: 'glow-cursor',
    description: 'Среда на базе VS Code, объединяющая файлы, код и чат. Поддерживает индексацию до 50 000 файлов и топовые модели (Claude Opus, GPT-5). Работает в РФ без блокировок на бесплатном тарифе.',
    pros: [
      'Визуальный интерфейс («гугл-доки для кода»)',
      'Возможность видеть структуру проекта',
      'Индексация до 50 000 файлов',
      'Работа с актуальной онлайн-документацией',
      'Поддержка моделей OpenAI, Anthropic, Google',
    ],
    cons: [
      'Интерфейс может быть сложным для новичков',
      'Менее гибкий для сложных агентских цепочек',
    ],
    ratings: {
      interface: 7,
      planning: 9,
      result: 9,
      overall: 42,
    },
    details: {
      setup: 'Устанавливается как самостоятельное десктопное приложение (форк VS Code). Интеграция моделей через внутренние настройки.',
      bestFor: [
        'UI-задачи и визуальный контроль',
        'Понимание общей структуры проекта',
        'Ежедневная разработка с наглядным diff',
        'Работа с разными моделями',
      ],
      integration: ['VS Code-compatible editors', 'JetBrains через ACP', 'Собственный CLI'],
      pricing: 'Бесплатный тариф с ограничениями. Pro — $20/мес.',
    },
  },
  {
    id: 'claude',
    name: 'Claude Code',
    subtitle: 'Мощный CLI-агент',
    icon: Terminal,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    glowClass: 'glow-claude',
    description: 'Работает напрямую через терминал, лучший для агентских задач и работы с огромным контекстом. Минус: отсутствие актуального diff-интерфейса в консоли затрудняет быструю проверку правок.',
    pros: [
      'Лучший для агентских задач',
      'Сложный анализ больших репозиториев',
      'Работа с кодовой базой без посредников',
      'Самые свежие функции появляются здесь',
      'Высокая скорость автоматизации',
    ],
    cons: [
      'Отсутствие наглядной diff-подсветки',
      'Требует навыков работы с терминалом',
      'Сложно ревьюить большие куски кода',
    ],
    ratings: {
      interface: 6,
      planning: 9,
      result: 10,
      overall: 42,
    },
    details: {
      setup: 'Установка через npm, Homebrew (macOS/Linux) или PowerShell (Windows). Требуется API-ключ Anthropic.',
      bestFor: [
        'Backend-логика и рефакторинг',
        'Сложные изменения в репозитории',
        'Автоматизация через терминал',
        'Работа с огромным контекстом',
      ],
      integration: ['Terminal', 'VS Code (расширение)', 'JetBrains (плагин)', 'Desktop app'],
      pricing: 'Требуется API-ключ. Pro-план через зарубежные карты.',
    },
  },
  {
    id: 'codex',
    name: 'OpenAI Codex',
    subtitle: 'Стабильный минимализм',
    icon: Bot,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    glowClass: 'glow-codex',
    description: 'Инструмент с низким порогом входа, идеально подходящий для Code Review. Главный недостаток — отсутствие встроенного редактора файлов (требуется стороннее ПО).',
    pros: [
      'Минималистичный интерфейс',
      'Идеален для Code Review',
      'Длительные архитектурные обсуждения',
      'Простота для новичков',
      'Параллельные потоки работы',
    ],
    cons: [
      'Нет встроенного редактора',
      'Для ручных правок нужны сторонние программы',
    ],
    ratings: {
      interface: 9,
      planning: 9,
      result: 8,
      overall: 46,
    },
    details: {
      setup: 'Доступен как отдельный интерфейс, CLI, desktop app и IDE extension. Установка CLI через npm или Homebrew.',
      bestFor: [
        'Code Review и обсуждение решений',
        'Быстрые агентные задачи',
        'Работа через ChatGPT-аккаунт',
        'Простой вход для новичков',
      ],
      integration: ['VS Code', 'Cursor', 'Windsurf', 'JetBrains', 'CLI'],
      pricing: 'ChatGPT Plus подписка. API по отдельному тарифу.',
    },
  },
];

function RatingBar({ value, max = 10, color }: { value: number; max?: number; color: string }) {
  const percentage = (value / max) * 100;
  const colorClasses: Record<string, string> = {
    purple: 'bg-gradient-to-r from-purple-500 to-violet-500',
    orange: 'bg-gradient-to-r from-orange-500 to-amber-500',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-500',
  };

  return (
    <div className="progress-bar">
      <div
        className={`progress-fill ${colorClasses[color]}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default function ToolsComparison() {
  const [openDetails, setOpenDetails] = useState<string | null>(null);
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

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Сравнение <span className="text-gradient">ключевых инструментов</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Три основные конфигурации решений, различающиеся «мозгом» (LLM), 
            инфраструктурой (Harness) и интерфейсом (UI)
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const isOpen = openDetails === tool.id;

            return (
              <div
                key={tool.id}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`glass-card rounded-2xl overflow-hidden h-full ${tool.glowClass}`}>
                  {/* Card Header */}
                  <div className={`p-6 bg-gradient-to-br ${tool.gradient}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                        <p className="text-white/80 text-sm">{tool.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-6">
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Ratings */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Оценка (из 10)
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-24">Интерфейс</span>
                          <div className="flex-1">
                            <RatingBar value={tool.ratings.interface} color={tool.color} />
                          </div>
                          <span className="text-xs font-medium w-8 text-right">{tool.ratings.interface}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-24">Планирование</span>
                          <div className="flex-1">
                            <RatingBar value={tool.ratings.planning} color={tool.color} />
                          </div>
                          <span className="text-xs font-medium w-8 text-right">{tool.ratings.planning}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-24">Результат</span>
                          <div className="flex-1">
                            <RatingBar value={tool.ratings.result} color={tool.color} />
                          </div>
                          <span className="text-xs font-medium w-8 text-right">{tool.ratings.result}</span>
                        </div>
                        <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                          <span className="text-xs font-semibold w-24">Общий балл</span>
                          <div className="flex-1">
                            <RatingBar value={tool.ratings.overall} max={50} color={tool.color} />
                          </div>
                          <span className="text-xs font-bold w-8 text-right">{tool.ratings.overall}</span>
                        </div>
                      </div>
                    </div>

                    {/* Pros & Cons */}
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2 mb-2">
                          <Check className="w-4 h-4" />
                          Плюсы
                        </h4>
                        <ul className="space-y-1">
                          {tool.pros.slice(0, 3).map((pro, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-emerald-500 mt-0.5">+</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-red-400 flex items-center gap-2 mb-2">
                          <X className="w-4 h-4" />
                          Минусы
                        </h4>
                        <ul className="space-y-1">
                          {tool.cons.map((con, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-red-500 mt-0.5">−</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <Collapsible open={isOpen} onOpenChange={() => setOpenDetails(isOpen ? null : tool.id)}>
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border/50 rounded-lg hover:bg-white/5">
                          <span>Подробнее</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="pt-4 space-y-4 border-t border-border/50 mt-4">
                          {/* Setup */}
                          <div>
                            <h5 className="text-sm font-semibold flex items-center gap-2 mb-2">
                              <Zap className="w-4 h-4 text-yellow-500" />
                              Установка
                            </h5>
                            <p className="text-xs text-muted-foreground">{tool.details.setup}</p>
                          </div>

                          {/* Best For */}
                          <div>
                            <h5 className="text-sm font-semibold flex items-center gap-2 mb-2">
                              <Check className="w-4 h-4 text-emerald-500" />
                              Лучше всего подходит для
                            </h5>
                            <ul className="space-y-1">
                              {tool.details.bestFor.map((item, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                                  <span className="w-1 h-1 rounded-full bg-primary" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Integration */}
                          <div>
                            <h5 className="text-sm font-semibold flex items-center gap-2 mb-2">
                              <Shield className="w-4 h-4 text-blue-500" />
                              Интеграции
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {tool.details.integration.map((item, i) => (
                                <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Pricing */}
                          <div>
                            <h5 className="text-sm font-semibold flex items-center gap-2 mb-2">
                              <Star className="w-4 h-4 text-purple-500" />
                              Стоимость
                            </h5>
                            <p className="text-xs text-muted-foreground">{tool.details.pricing}</p>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
