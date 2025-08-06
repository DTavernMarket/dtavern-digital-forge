import { Button } from "@/components/ui/button";
import { Shield, Scroll, Coins, User, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-tavern-brass/30 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-tavern-brass to-accent rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-tavern-wood" />
            </div>
            <span className="text-xl font-medieval font-bold text-foreground">
              DTavern
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/produtos" 
              className="text-foreground hover:text-accent transition-colors duration-300 font-medium"
            >
              Produtos
            </Link>
            <Link 
              to="/artesaos" 
              className="text-foreground hover:text-accent transition-colors duration-300 font-medium"
            >
              Artesãos
            </Link>
            <a 
              href="#sobre" 
              className="text-foreground hover:text-accent transition-colors duration-300 font-medium"
            >
              Sobre
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Entrar
            </Button>
            <Button variant="magical" size="sm">
              <Scroll className="w-4 h-4 mr-2" />
              Seja um Artesão
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-sm border border-tavern-brass/30 rounded-lg mt-2 p-4 space-y-4">
            <Link 
              to="/produtos" 
              className="block text-foreground hover:text-accent transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Produtos
            </Link>
            <Link 
              to="/artesaos" 
              className="block text-foreground hover:text-accent transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Artesãos
            </Link>
            <a 
              href="#sobre" 
              className="block text-foreground hover:text-accent transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </a>
            <div className="flex flex-col space-y-2 pt-2 border-t border-tavern-brass/30">
              <Button variant="outline" size="sm" className="justify-start">
                <User className="w-4 h-4 mr-2" />
                Entrar
              </Button>
              <Button variant="magical" size="sm" className="justify-start">
                <Scroll className="w-4 h-4 mr-2" />
                Seja um Artesão
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;