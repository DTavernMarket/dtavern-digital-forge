import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Package } from "lucide-react";
import tavernHero from "@/assets/tavern-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={tavernHero} 
          alt="Taverna medieval aconchegante" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
      </div>

      {/* Magical Particles Effect */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-left max-w-4xl">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-tavern-brass/30 rounded-full px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-foreground font-medium">Marketplace Medieval de RPG</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medieval font-bold text-foreground leading-tight">
              Bem-vindo à{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-magical-glow">
                DTavern
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed">
              O marketplace definitivo para produtos digitais de RPG de mesa. 
              Tokens, mapas, aventuras épicas e trilhas sonoras criadas por artesãos talentosos.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center space-x-2 bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2">
              <Package className="w-4 h-4 text-accent" />
              <span className="text-foreground/90">1000+ Produtos</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2">
              <Users className="w-4 h-4 text-accent" />
              <span className="text-foreground/90">100+ Artesãos</span>
            </div>
            <div className="flex items-center space-x-2 bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-foreground/90">Conteúdo Premium</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="magical" size="lg" className="text-base">
              Explorar Produtos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-base">
              Começar a Vender
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;