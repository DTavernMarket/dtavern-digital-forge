import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Package, Users, Award, Crown, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const ArtisanSection = () => {
  const featuredArtisans = [
    {
      id: 1,
      name: "Mestre Aldric",
      title: "Criador de Tokens Épicos",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      products: 45,
      subscribers: 1250,
      tier: "Lendário",
      specialty: "Tokens & Personagens",
      monthlyPrice: "R$ 19,90",
      description: "Especialista em criar tokens únicos e detalhados para personagens de RPG."
    },
    {
      id: 2,
      name: "Cartógrafa Luna",
      title: "Mestre dos Mapas",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      products: 32,
      subscribers: 890,
      tier: "Épico",
      specialty: "Mapas & Cenários",
      monthlyPrice: "R$ 24,90",
      description: "Criadora de mapas detalhados e imersivos para suas aventuras mais épicas."
    },
    {
      id: 3,
      name: "Narrador Sábio",
      title: "Contador de Histórias",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5.0,
      products: 28,
      subscribers: 567,
      tier: "Mítico",
      specialty: "Aventuras & PDFs",
      monthlyPrice: "R$ 29,90",
      description: "Escritor experiente em aventuras completas e conteúdo narrativo envolvente."
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Mítico": return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "Lendário": return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white";
      case "Épico": return "bg-gradient-to-r from-blue-500 to-indigo-500 text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Mítico": return <Crown className="w-3 h-3" />;
      case "Lendário": return <Award className="w-3 h-3" />;
      case "Épico": return <Star className="w-3 h-3" />;
      default: return <Badge className="w-3 h-3" />;
    }
  };

  return (
    <section id="artesaos" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-tavern-brass/30 rounded-full px-4 py-2 text-sm mb-4">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-foreground font-medium">Artesãos em Destaque</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-medieval font-bold text-foreground">
            Conheça nossos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-magical-glow">
              Mestres Artesãos
            </span>
          </h2>
          
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Artistas talentosos que criam conteúdo premium para suas campanhas. 
            Apoie seus favoritos com assinaturas mensais.
          </p>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredArtisans.map((artisan) => (
            <Card key={artisan.id} className="group bg-card/80 backdrop-blur-sm border-tavern-brass/30 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              {/* Header with Tier Badge */}
              <div className="relative p-6 pb-3">
                <div className="absolute top-4 right-4">
                  <Badge className={`${getTierColor(artisan.tier)} text-xs font-semibold`}>
                    {getTierIcon(artisan.tier)}
                    <span className="ml-1">{artisan.tier}</span>
                  </Badge>
                </div>

                {/* Avatar and Info */}
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img 
                      src={artisan.avatar} 
                      alt={artisan.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-accent/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {artisan.name}
                    </h3>
                    <p className="text-sm text-foreground/60 truncate">
                      {artisan.title}
                    </p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-sm font-medium text-foreground ml-1">
                        {artisan.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-3 space-y-3">
                <p className="text-sm text-foreground/70">
                  {artisan.description}
                </p>

                {/* Specialty Badge */}
                <Badge variant="secondary" className="text-xs">
                  {artisan.specialty}
                </Badge>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-foreground/60">
                  <div className="flex items-center space-x-1">
                    <Package className="w-4 h-4" />
                    <span>{artisan.products} produtos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{artisan.subscribers} seguidores</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-muted/30 border-t border-tavern-brass/20">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-xs text-foreground/60 mb-1">Assinatura Mensal</p>
                    <p className="text-lg font-bold text-accent">{artisan.monthlyPrice}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={`/artesao/${artisan.id}`}>
                      <Button variant="outline" size="sm">
                        <ShoppingBag className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="tavern" size="sm">
                      Assinar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <div className="bg-card/60 backdrop-blur-sm border border-tavern-brass/30 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-medieval font-bold text-foreground mb-4">
              Quer ser um Artesão?
            </h3>
            <p className="text-foreground/70 mb-6">
              Monetize sua criatividade! Venda seus produtos e ganhe assinantes mensais na maior taverna digital de RPG.
            </p>
            <Button variant="magical" size="lg">
              Começar a Vender
              <Crown className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanSection;