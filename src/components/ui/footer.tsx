import { Shield, Github, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-shadow-deep to-background border-t border-tavern-brass/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-tavern-brass to-accent rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-tavern-wood" />
              </div>
              <span className="text-xl font-medieval font-bold text-foreground">
                DTavern
              </span>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              O marketplace definitivo para produtos digitais de RPG de mesa. 
              Conectando artesãos talentosos com mestres e jogadores.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors"
              >
                <Twitter className="w-4 h-4 text-foreground/70 hover:text-accent" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors"
              >
                <Instagram className="w-4 h-4 text-foreground/70 hover:text-accent" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors"
              >
                <Github className="w-4 h-4 text-foreground/70 hover:text-accent" />
              </a>
            </div>
          </div>

          {/* Produtos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Produtos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Tokens de Personagens
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Mapas de Aventura
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  PDFs de Campanhas
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Trilhas Sonoras
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Tokens de Monstros
                </a>
              </li>
            </ul>
          </div>

          {/* Para Artesãos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Para Artesãos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Como Começar
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Comissões e Taxas
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Dicas de Vendas
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Recursos para Criadores
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Comunidade
                </a>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-accent transition-colors">
                  Status do Sistema
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-tavern-brass/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-foreground/60">
              © 2024 DTavern. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4 text-sm text-foreground/60">
              <span>Feito com ❤️ para a comunidade RPG</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;