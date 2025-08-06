import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Package, Users, Award, Crown, ShoppingBag, Search, Filter, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Artisans = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const allArtisans = [
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
      location: "São Paulo, BR",
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
      location: "Rio de Janeiro, BR",
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
      location: "Belo Horizonte, BR",
      description: "Escritor experiente em aventuras completas e conteúdo narrativo envolvente."
    },
    {
      id: 4,
      name: "Forjador de Sons",
      title: "Maestro das Trilhas",
      avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      products: 67,
      subscribers: 2100,
      tier: "Épico",
      specialty: "Trilhas Sonoras",
      monthlyPrice: "R$ 15,90",
      location: "Porto Alegre, BR",
      description: "Compositor especializado em trilhas sonoras imersivas para RPG."
    },
    {
      id: 5,
      name: "Artista Mística",
      title: "Pintora de Dragões",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      products: 89,
      subscribers: 1567,
      tier: "Lendário",
      specialty: "Arte & Ilustrações",
      monthlyPrice: "R$ 22,90",
      location: "Curitiba, BR",
      description: "Artista digital especializada em ilustrações épicas e conceituais."
    },
    {
      id: 6,
      name: "Lore Master",
      title: "Guardião da História",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 4.6,
      products: 34,
      subscribers: 789,
      tier: "Épico",
      specialty: "Lore & Worldbuilding",
      monthlyPrice: "R$ 18,90",
      location: "Recife, BR",
      description: "Especialista em criar histórias e mundos complexos para campanhas épicas."
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

  const filteredArtisans = allArtisans.filter(artisan => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artisan.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === "all" || artisan.tier === selectedTier;
    const matchesSpecialty = selectedSpecialty === "all" || artisan.specialty.includes(selectedSpecialty);
    
    return matchesSearch && matchesTier && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-tavern-wood via-tavern-brass/20 to-tavern-wood border-b border-tavern-brass/30">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-medieval font-bold text-foreground">
              Nossos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-magical-glow">
                Artesãos
              </span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Descubra criadores talentosos e apoie seus favoritos com assinaturas mensais.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-tavern-brass/30">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40 w-4 h-4" />
                <Input
                  placeholder="Buscar artesãos ou especialidades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Tier Filter */}
              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tiers</SelectItem>
                  <SelectItem value="Mítico">Mítico</SelectItem>
                  <SelectItem value="Lendário">Lendário</SelectItem>
                  <SelectItem value="Épico">Épico</SelectItem>
                </SelectContent>
              </Select>

              {/* Specialty Filter */}
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Especialidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Especialidades</SelectItem>
                  <SelectItem value="Tokens">Tokens & Personagens</SelectItem>
                  <SelectItem value="Mapas">Mapas & Cenários</SelectItem>
                  <SelectItem value="Aventuras">Aventuras & PDFs</SelectItem>
                  <SelectItem value="Trilhas">Trilhas Sonoras</SelectItem>
                  <SelectItem value="Arte">Arte & Ilustrações</SelectItem>
                  <SelectItem value="Lore">Lore & Worldbuilding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-tavern-brass/20">
              <span className="text-sm text-foreground/60">
                {filteredArtisans.length} artesão{filteredArtisans.length !== 1 ? 's' : ''} encontrado{filteredArtisans.length !== 1 ? 's' : ''}
              </span>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Mais Filtros
              </Button>
            </div>
          </div>
        </Card>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtisans.map((artisan) => (
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
                    <div className="flex items-center mt-1 text-xs text-foreground/50">
                      <MapPin className="w-3 h-3 mr-1" />
                      {artisan.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-3 space-y-3">
                <p className="text-sm text-foreground/70 line-clamp-2">
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

        {/* Empty State */}
        {filteredArtisans.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-card/60 backdrop-blur-sm border border-tavern-brass/30 rounded-xl p-8 max-w-md mx-auto">
              <Users className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Nenhum artesão encontrado
              </h3>
              <p className="text-foreground/60 mb-4">
                Tente ajustar seus filtros ou termo de busca.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTier("all");
                  setSelectedSpecialty("all");
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artisans;