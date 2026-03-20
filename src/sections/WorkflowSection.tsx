import { useState, useEffect, useRef } from 'react';
import { Lightbulb, Code, Search, CheckCircle, ArrowRight, Clock, FileText, RotateCcw } from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  percentage: string;
  icon: React.ElementType;
  color: string;
  description: string;
  details: string[];
  tips: string[];
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'planning',
    title: 'Планирование',
    percentage: '40%',
    icon: Lightbulb,
    color: 'purple',
    description: 'Декомпозиция задачи и обсуждение архитектуры. Критически важно создать файл CLAUDE.md с правилами проекта для контекста ИИ.',
    details: [
      'Декомпозиция задачи на подзадачи',
      'Обсуждение архитектуры с ИИ',
      'Формализация плана',
      'Создание файла CLAUDE.md с правилами проекта',
      'Уточнение, какие файлы будут затронуты',
      'Определение тестов для проверки результата',
    ],
    tips: [
      'Не пишите «сделай фичу» — обсудите план сначала',
      'Разбейте задачу на куски, которые можно протестировать отдельно',
      'Создайте CLAUDE.md — это «библия» для агента',
    ],
  },
  {
    id: 'coding',
    title: 'Кодинг',
    percentage: '20%',
    icon: Code,
    color: 'cyan',
    description: 'Непосредственная генерация кода агентом по детально проработанному и проверенному человеком плану.',
    details: [
      'Запуск агента для написания кода',
      'Генерация по утвержденному плану',
      'Если план прописан детально, генерация проходит гладко',
      'Агент пишет код по спецификации',
    ],
    tips: [
      'Не просите сразу сделать фичу целиком',
      'Сначала согласуйте план, затем запускайте генерацию',
      'Используйте режимы: Plan / All Files / One File',
    ],
  },
  {
    id: 'review',
    title: 'Ревью и исправление',
    percentage: '40%',
    icon: Search,
    color: 'emerald',
    description: 'Тщательная проверка каждой строки. Если ИИ предлагает «костыли», лучше отменить изменения и вернуться к этапу планирования.',
    details: [
      'Построчное изучение изменений',
      'Ручной рефакторинг',
      'Удаление «неподдерживаемого» кода',
      'Проверка адекватности решения',
    ],
    tips: [
      'Если ИИ выдал «кривое» решение — безжалостно отменяйте',
      'Всегда проверяйте код «под капотом»',
      'Не давайте ИИ полную автономность',
    ],
  },
];

export default function WorkflowSection() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
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
      id="workflow"
      ref={sectionRef}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Путь разработчика с ИИ <span className="text-gradient">(Workflow)</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Опытные разработчики рекомендуют делить процесс на этапы, 
            где генерация кода — лишь малая часть
          </p>
        </div>

        {/* Workflow Visualization */}
        <div className={`mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Progress Bar */}
          <div className="relative mb-8">
            <div className="h-4 bg-muted rounded-full overflow-hidden flex">
              <div className="w-[40%] bg-gradient-to-r from-purple-500 to-purple-600 h-full" />
              <div className="w-[20%] bg-gradient-to-r from-cyan-500 to-cyan-600 h-full" />
              <div className="w-[40%] bg-gradient-to-r from-emerald-500 to-emerald-600 h-full" />
            </div>
            
            {/* Percentage Labels */}
            <div className="flex justify-between mt-2 text-sm font-medium">
              <span className="text-purple-400">40%</span>
              <span className="text-cyan-400">20%</span>
              <span className="text-emerald-400">40%</span>
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              
              const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
                purple: {
                  bg: 'bg-purple-500/10',
                  border: 'border-purple-500/30',
                  text: 'text-purple-400',
                  glow: 'shadow-purple-500/20',
                },
                cyan: {
                  bg: 'bg-cyan-500/10',
                  border: 'border-cyan-500/30',
                  text: 'text-cyan-400',
                  glow: 'shadow-cyan-500/20',
                },
                emerald: {
                  bg: 'bg-emerald-500/10',
                  border: 'border-emerald-500/30',
                  text: 'text-emerald-400',
                  glow: 'shadow-emerald-500/20',
                },
              };
              
              const colors = colorClasses[step.color];

              return (
                <div
                  key={step.id}
                  className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  {/* Arrow between steps (desktop) */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-3 z-10">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}

                  <button
                    onClick={() => setActiveStep(isActive ? null : step.id)}
                    className={`w-full text-left glass-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                      isActive ? `ring-2 ring-${step.color}-500/50 ${colors.glow}` : ''
                    }`}
                  >
                    {/* Step Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 ${colors.text}`} />
                      </div>
                      <div>
                        <div className={`text-2xl font-bold ${colors.text}`}>{step.percentage}</div>
                        <div className="font-semibold">{step.title}</div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                    {/* Expand Indicator */}
                    <div className={`flex items-center gap-2 text-sm ${colors.text} transition-transform ${isActive ? 'rotate-90' : ''}`}>
                      <span>Подробнее</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expanded Details */}
        {activeStep && (
          <div className="animate-fade-in">
            {workflowSteps
              .filter((step) => step.id === activeStep)
              .map((step) => {
                const colorClasses: Record<string, string> = {
                  purple: 'border-purple-500/30 bg-purple-500/5',
                  cyan: 'border-cyan-500/30 bg-cyan-500/5',
                  emerald: 'border-emerald-500/30 bg-emerald-500/5',
                };

                return (
                  <div
                    key={step.id}
                    className={`glass-card rounded-2xl p-6 sm:p-8 border-2 ${colorClasses[step.color]}`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Details */}
                      <div>
                        <h4 className="text-lg font-semibold flex items-center gap-2 mb-4">
                          <FileText className="w-5 h-5" />
                          Что включает этап
                        </h4>
                        <ul className="space-y-3">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tips */}
                      <div>
                        <h4 className="text-lg font-semibold flex items-center gap-2 mb-4">
                          <Clock className="w-5 h-5" />
                          Практические советы
                        </h4>
                        <ul className="space-y-3">
                          {step.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-primary">{i + 1}</span>
                              </div>
                              <span className="text-muted-foreground">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* Key Insight */}
        <div className={`mt-12 glass-card rounded-2xl p-6 sm:p-8 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <RotateCcw className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Главная мысль</h3>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ИИ ускоряет разработку не тогда, когда пишет всё сам, 
            а тогда, когда помогает разработчику <span className="text-foreground font-medium">быстрее думать</span>,{' '}
            <span className="text-foreground font-medium">точнее планировать</span>,{' '}
            <span className="text-foreground font-medium">быстрее делать рутину</span> и{' '}
            <span className="text-foreground font-medium">лучше ревьюить изменения</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
