import { Cpu, Heart, Github, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">AI Dev Guide</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              Полное руководство по использованию ИИ-инструментов в разработке. 
              Сравнение Cursor, Claude Code и OpenAI Codex с практическими советами и рекомендациями.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Разделы</h4>
            <ul className="space-y-2">
              <li>
                <a href="#tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Сравнение инструментов
                </a>
              </li>
              <li>
                <a href="#formats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Форматы использования
                </a>
              </li>
              <li>
                <a href="#workflow" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AI Workflow
                </a>
              </li>
              <li>
                <a href="#tips" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Советы и рекомендации
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-4">Инструменты</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://cursor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
                >
                  Cursor
                </a>
              </li>
              <li>
                <a
                  href="https://docs.anthropic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-orange-400 transition-colors"
                >
                  Claude Code
                </a>
              </li>
              <li>
                <a
                  href="https://openai.com/codex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  OpenAI Codex
                </a>
              </li>
              <li>
                <a
                  href="https://antigravity.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-blue-400 transition-colors"
                >
                  Antigravity
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AI Dev Guide. Все права защищены.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Сделано с <Heart className="w-4 h-4 text-red-500" /> для разработчиков
          </p>
        </div>
      </div>
    </footer>
  );
}
