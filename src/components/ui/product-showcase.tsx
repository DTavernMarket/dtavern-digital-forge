import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Download, Users, Heart } from "lucide-react";
import rpgTokens from "@/assets/rpg-tokens.jpg";
import fantasyMaps from "@/assets/fantasy-maps.jpg";

const ProductShowcase = () => {
  const featuredProducts = [
    {
      id: 1,
      title: "Tokens de Personagens Épicos",
      artist: "Mestre Aldric",
      price: "R$ 25,00",
      rating: 4.9,
      downloads: 1250,
      image: rpgTokens,
      category: "Tokens",
      description: "50+ tokens de personagens únicos para suas campanhas"
    },
    {
      id: 2,
      title: "Mapas de Masmorras Ancestrais",
      artist: "Cartógrafa Luna",
      price: "R$ 35,00",
      rating: 4.8,
      downloads: 890,
      image: fantasyMaps,
      category: "Mapas",
      description: "Mapas detalhados com variações de dia/noite"
    },
    {
      id: 3,
      title: "Aventura: O Templo Perdido",
      artist: "Narrador Sábio",
      price: "R$ 45,00",
      rating: 5.0,
      downloads: 567,
      image: rpgTokens,
      category: "Aventuras",
      description: "Aventura completa para personagens nível 5-8"
    }
  ];

  return (
    <section id="produtos" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-tavern-brass/30 rounded-full px-4 py-2 text-sm mb-4">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-foreground font-medium">Produtos em Destaque</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-medieval font-bold text-foreground">
            Tesouros para suas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-magical-glow">
              Aventuras
            </span>
          </h2>
          
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Descubra criações únicas feitas por artesãos talentosos. 
            Tokens, mapas, aventuras e muito mais para enriquecer suas campanhas.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group bg-card/80 backdrop-blur-sm border-tavern-brass/30 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-accent/90 text-tavern-wood text-xs font-semibold px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Favorite Button */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-accent/20 transition-colors">
                  <Heart className="w-4 h-4 text-foreground hover:text-accent" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    por {product.artist}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {product.description}
                  </p>
                </div>

                {/* Rating and Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-medium text-foreground">{product.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-foreground/60">
                    <Download className="w-4 h-4" />
                    <span>{product.downloads}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-tavern-brass/20">
                  <span className="text-xl font-bold text-accent">
                    {product.price}
                  </span>
                  <Button variant="tavern" size="sm">
                    Comprar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Ver Todos os Produtos
            <Users className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;