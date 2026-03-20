import { useState, useEffect, useRef } from 'react';
import { Monitor, Terminal, Cloud, Workflow, ChevronRight, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FormatData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  tools: string;
  pros: string[];
  cons: string[];
  description: string;
  details: string[];
  useCases: string[];
  color: string;
}

const formats: FormatData[] = [
  {
    id: 'ide',
    title: 'IDE',
    subtitle: 'Визуальный контроль',
    icon: Monitor,
    tools: 'Cursor, Antigravity',
    description: 'Лучший выбор для UI-задач и понимания общей структуры проекта благодаря наглядному дереву файлов и визуализации изменений.',
    pros: [
      'Глубокий контекст проекта',
      'Визуальное управление',
      'Файлы, код и чат в одном окне',
      'Индексация до 50 000 файлов',
    ],
    cons: [
      'Ограничения по автоматизации',
      'Менее гибкий для сложных агентских цепочек',
    ],
    details: [
      'Поддержка индексации до 50 000 файлов для понимания контекста',
      'Работа с актуальной онлайн-документацией',
      'Наглядное дерево файлов и визуализация изменений',
      'Возможность видеть структуру проекта и править код вручную',
    ],
    useCases: [
      'UI-задачи и визуальный контроль',
      'Понимание общей структуры проекта',
      'Ежедневная разработка с наглядным diff',
      'Frontend-разработка и дизайн',
    ],
    color: 'purple',
  },
  {
    id: 'cli',
    title: 'CLI / Terminal',
    subtitle: 'Глубокая автоматизация',
    icon: Terminal,
    tools: 'Claude Code, Codex CLI',
    description: 'Позволяет работать с несколькими файлами одновременно и запускать сложные цепочки сценариев напрямую в кодовой базе.',
    pros: [
      'Высокая скорость работы',
      'Интеграция в CI/CD и GitHub Actions',
      'Самые свежие фичи (агенты внутри агентов)',
      'Высокая скорость автоматизации',
    ],
    cons: [
      'Требует навыков работы с командами',
      'Менее нагляден для контроля правок',
      'Нет diff-подсветки «из коробки»',
    ],
    details: [
      'Работа напрямую с файлами из терминала',
      'Лучший для «агентских» задач и сложного анализа',
      'Работа с кодовой базой без посредников',
      'Интеграция с Git и CI/CD',
    ],
    useCases: [
      'Backend-логика и рефакторинг',
      'Сложные изменения в репозитории',
      'Автоматизация через терминал',
      'Работа с огромным контекстом',
    ],
    color: 'orange',
  },
  {
    id: 'api',
    title: 'API и No-code',
    subtitle: 'Автономная работа',
    icon: Cloud,
    tools: 'OpenClaw, n8n',
    description: 'Подходит для задач, работающих 24/7, создания детерминированных процессов и управления через мессенджеры (Telegram/WhatsApp).',
    pros: [
      'Доступ 24/7 через Telegram/Discord',
      'Автономность (Heartbeat)',
      'Работа по расписанию (Crons)',
      'Детерминированный результат',
    ],
    cons: [
      'Высокий расход токенов',
      'Риск «бесконечных циклов» при ошибках',
      'Высокий риск галлюцинаций',
    ],
    details: [
      'Механизм Heartbeat — агент сам «просыпается» и проверяет задачи',
      'Строго предсказуемый результат (данные идут точно по стрелочкам)',
      'Визуальный конструктор пайплайнов',
      'Идеален для бизнес-процессов',
    ],
    useCases: [
      'Задачи, работающие 24/7',
      'Автоматизация бизнес-процессов',
      'Управление через мессенджеры',
      'Детерминированные процессы',
    ],
    color: 'emerald',
  },
];

export default function UsageFormats() {
  const [activeTab, setActiveTab] = useState('ide');
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
      id="formats"
      ref={sectionRef}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Форматы использования и их <span className="text-gradient">эффективность</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите подходящий формат работы в зависимости от задачи и вашего рабочего процесса
          </p>
        </div>

        {/* Tabs */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto mb-8 bg-muted/50 p-1 rounded-xl">
              {formats.map((format) => {
                const Icon = format.icon;
                return (
                  <TabsTrigger
                    key={format.id}
                    value={format.id}
                    className="flex items-center gap-2 py-3 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                  >
                    <Icon className="w-4 h-4 hidden sm:block" />
                    <span className="text-xs sm:text-sm">{format.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {formats.map((format) => (
              <TabsContent key={format.id} value={format.id} className="mt-0">
                <div className="glass-card rounded-2xl p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Overview */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            format.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                            format.color === 'orange' ? 'bg-orange-500/10 text-orange-400' :
                            'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            <format.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{format.title}</h3>
                            <p className="text-muted-foreground">{format.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{format.description}</p>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Workflow className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Инструменты:</span>
                        <span className="font-medium">{format.tools}</span>
                      </div>

                      {/* Pros & Cons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Преимущества
                          </h4>
                          <ul className="space-y-2">
                            {format.pros.map((pro, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-emerald-500 mt-0.5">+</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-red-400 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Недостатки
                          </h4>
                          <ul className="space-y-2">
                            {format.cons.map((con, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-red-500 mt-0.5">−</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                      {/* Details */}
                      <div className="p-4 rounded-xl bg-white/5 border border-border/50">
                        <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                          <Info className="w-4 h-4 text-blue-400" />
                          Ключевые особенности
                        </h4>
                        <ul className="space-y-2">
                          {format.details.map((detail, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Use Cases */}
                      <div className="p-4 rounded-xl bg-white/5 border border-border/50">
                        <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
                          <Workflow className="w-4 h-4 text-purple-400" />
                          Лучшие сценарии использования
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {format.useCases.map((useCase, i) => (
                            <span
                              key={i}
                              className={`text-xs px-3 py-1.5 rounded-full ${
                                format.color === 'purple' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                format.color === 'orange' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              }`}
                            >
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
