import { useState, useEffect, useRef } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Wrench, Shield, CreditCard } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  details?: string[];
  category: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'ИИ заменит разработчика?',
    answer: 'Нет. ИИ — это инструмент, который помогает разработчику, но не заменяет его. Ответственность за архитектуру, качество кода, безопасность и поддерживаемость остаётся у человека.',
    details: [
      'ИИ хорошо помогает думать, искать варианты, писать рутину',
      'Ускоряет delivery, но не заменяет экспертизу',
      'Человек контролирует архитектуру и качество',
    ],
    category: 'general',
  },
  {
    question: 'Где ИИ реально даёт эффект?',
    answer: 'Планирование архитектуры, декомпозиция задач, генерация boilerplate, написание тестов, разбор багов, анализ legacy-кода, первичный рефакторинг и подготовка документации.',
    details: [
      'Claude Code, Cursor и Codex позиционируются как инструменты для понимания кодовой базы',
      'Написание фич, фикс багов и ревью изменений',
      'Экономия времени команды в рутинных задачах',
    ],
    category: 'general',
  },
  {
    question: 'Какой инструмент выбрать для начала?',
    answer: 'Для начала рекомендуем Cursor — он работает в РФ без блокировок на бесплатном тарифе и имеет интуитивный интерфейс на базе VS Code.',
    details: [
      'Cursor: бесплатный тариф, работает в РФ, VS Code-интерфейс',
      'Claude Code: требует API-ключ, лучше для опытных',
      'Codex: простой вход через ChatGPT-аккаунт',
    ],
    category: 'tools',
  },
  {
    question: 'Как установить Claude Code?',
    answer: 'Установка выполняется через npm (универсально), Homebrew (macOS/Linux) или PowerShell с правами администратора (Windows). Требуется API-ключ Anthropic.',
    details: [
      'npm install -g @anthropic-ai/claude-code',
      'Homebrew: brew install claude-code',
      'Windows: PowerShell с правами администратора',
      'Требуется ANTHROPIC_API_KEY в переменных окружения',
    ],
    category: 'setup',
  },
  {
    question: 'Что такое CLAUDE.md и зачем он нужен?',
    answer: 'CLAUDE.md — это файл в корне проекта, который подгружается в каждую сессию как постоянный контекст. Там прописываются структура проекта, используемый стек и правила оформления кода.',
    details: [
      'Структура проекта и архитектура',
      'Используемый стек технологий',
      'Конвенции кода и стандарты',
      'Команды сборки и ограничения',
    ],
    category: 'setup',
  },
  {
    question: 'Как безопасно работать с ИИ?',
    answer: 'Никогда не давайте ИИ полную автономность на критичных данных, деньгах, доступах и production-системах. Всегда ревьюйте код перед деплоем.',
    details: [
      'Используйте approval policies',
      'Проверяйте код перед production',
      'Не давайте доступ к критичным данным',
      'Контролируйте автономных агентов',
    ],
    category: 'security',
  },
  {
    question: 'Как оплатить подписку из РФ?',
    answer: 'Для подписки Pro рекомендуются виртуальные карты (ChocoPay, Epay) или шлюзы типа AITUNNEL для прямого доступа к API Claude и OpenAI.',
    details: [
      'ChocoPay — виртуальные карты для оплаты',
      'Epay — альтернативный способ оплаты',
      'AITUNNEL — шлюз для доступа к API',
      'Cursor работает без блокировок на бесплатном тарифе',
    ],
    category: 'payment',
  },
  {
    question: 'Что такое MCP (Model Context Protocol)?',
    answer: 'MCP — это протокол для связи агента с внешними сервисами типа Notion, GitHub, баз данных и других инструментов. Позволяет ИИ взаимодействовать с внешним миром.',
    details: [
      'Интеграция с внешними сервисами',
      'Notion, GitHub, базы данных',
      'Настраивается в config.toml или Rules',
    ],
    category: 'setup',
  },
  {
    question: 'Как переключать режимы в Claude Code?',
    answer: 'Переключение режимов через Shift+Tab: Plan (обсуждение архитектуры, файлы не меняются), All Files (агент правит всё сам), One File (пофайловая проверка пользователем — самый безопасный).',
    details: [
      'Plan: обсуждение архитектуры',
      'All Files: агент правит всё сам',
      'One File: пофайловая проверка (самый безопасный)',
    ],
    category: 'tools',
  },
  {
    question: 'Как использовать Drag-n-Drop в Claude Code?',
    answer: 'В терминальной версии и расширении VS Code нельзя просто перетащить файл. Лайфхак: нужно зажать Shift во время перетаскивания файла в чат, чтобы он подставился как ссылка через @.',
    details: [
      'Зажмите Shift при перетаскивании',
      'Файл подставится как @filename',
      'Работает в VS Code и терминале',
    ],
    category: 'tools',
  },
];

const categories: Record<string, { label: string; icon: React.ElementType }> = {
  all: { label: 'Все вопросы', icon: HelpCircle },
  general: { label: 'Общие', icon: MessageCircle },
  tools: { label: 'Инструменты', icon: Wrench },
  setup: { label: 'Настройка', icon: Wrench },
  security: { label: 'Безопасность', icon: Shield },
  payment: { label: 'Оплата', icon: CreditCard },
};

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
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

  const filteredItems = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Часто задаваемые <span className="text-gradient">вопросы</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ответы на популярные вопросы о работе с ИИ в разработке
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-2 mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {Object.entries(categories).map(([key, { label, icon: Icon }]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                activeCategory === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className={`space-y-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filteredItems.map((item, index) => {
            const isOpen = openItems[index];

            return (
              <div
                key={index}
                className="glass-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-5 flex items-start gap-4 text-left hover:bg-white/5 transition-colors"
                >
                  <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium pr-8">{item.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pl-14 animate-fade-in">
                    <p className="text-muted-foreground mb-3">{item.answer}</p>
                    {item.details && (
                      <ul className="space-y-1">
                        {item.details.map((detail, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-muted-foreground mb-4">
            Остались вопросы? Изучите документацию инструментов или присоединяйтесь к сообществам разработчиков.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://cursor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors text-sm"
            >
              Cursor Docs
            </a>
            <a
              href="https://docs.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-colors text-sm"
            >
              Claude Docs
            </a>
            <a
              href="https://openai.com/codex"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors text-sm"
            >
              Codex Docs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
