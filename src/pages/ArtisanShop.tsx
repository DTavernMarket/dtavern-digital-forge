import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  Package, 
  Users, 
  Award, 
  Crown, 
  ShoppingBag, 
  Heart, 
  Share2, 
  MapPin,
  Calendar,
  Download,
  Play,
  FileText,
  Image,
  Music,
  Map
} from "lucide-react";

const ArtisanShop = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock data - em um app real, isso viria de uma API
  const artisan = {
    id: parseInt(id || "1"),
    name: "Mestre Aldric",
    title: "Criador de Tokens Épicos",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop",
    rating: 4.9,
    totalProducts: 45,
    subscribers: 1250,
    tier: "Lendário",
    specialty: "Tokens & Personagens",
    monthlyPrice: "R$ 19,90",
    location: "São Paulo, BR",
    joinedDate: "Janeiro 2023",
    description: "Especialista em criar tokens únicos e detalhados para personagens de RPG com mais de 5 anos de experiência. Meus designs são conhecidos pela atenção aos detalhes e pela qualidade artística que traz vida aos seus personagens.",
    socialProof: "Mais de 10.000 downloads",
    tags: ["Fantasy", "D&D", "Pathfinder", "Tokens", "Personagens"]
  };

  const products = [
    {
      id: 1,
      name: "Pack Guerreiros Épicos",
      type: "Tokens",
      price: "R$ 15,90",
      rating: 4.9,
      downloads: 523,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      category: "tokens",
      description: "Coleção com 20 tokens de guerreiros em alta resolução"
    },
    {
      id: 2,
      name: "Magos Ancestrais",
      type: "Tokens",
      price: "R$ 12,90",
      rating: 4.8,
      downloads: 341,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop",
      category: "tokens",
      description: "15 tokens de magos com designs únicos"
    },
    {
      id: 3,
      name: "Mapa da Taverna Perdida",
      type: "Mapa",
      price: "R$ 8,90",
      rating: 5.0,
      downloads: 187,
      image: "https://images.unsplash.com/photo-1515026829845-d7c7b0992a54?w=300&h=300&fit=crop",
      category: "maps",
      description: "Mapa detalhado para aventuras em tavernas"
    },
    {
      id: 4,
      name: "Aventura: O Cristal Sombrio",
      type: "PDF",
      price: "R$ 24,90",
      rating: 4.9,
      downloads: 89,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop",
      category: "adventures",
      description: "Aventura completa para personagens level 3-5"
    }
  ];

  const subscriptionBenefits = [
    "Acesso a todos os produtos mensais",
    "Produtos exclusivos para assinantes",
    "Desconto de 20% em compras avulsas",
    "Acesso antecipado a novos lançamentos",
    "Canal direto com o artesão",
    "Requests personalizados (1 por mês)"
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
      case "Mítico": return <Crown className="w-4 h-4" />;
      case "Lendário": return <Award className="w-4 h-4" />;
      case "Épico": return <Star className="w-4 h-4" />;
      default: return <Badge className="w-4 h-4" />;
    }
  };

  const getProductIcon = (category: string) => {
    switch (category) {
      case "tokens": return <Image className="w-4 h-4" />;
      case "maps": return <Map className="w-4 h-4" />;
      case "adventures": return <FileText className="w-4 h-4" />;
      case "music": return <Music className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Banner Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={artisan.banner} 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={artisan.avatar} alt={artisan.name} />
                <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-medieval font-bold">
                    {artisan.name}
                  </h1>
                  <Badge className={`${getTierColor(artisan.tier)} text-sm font-semibold`}>
                    {getTierIcon(artisan.tier)}
                    <span className="ml-1">{artisan.tier}</span>
                  </Badge>
                </div>
                
                <p className="text-xl text-white/90 mb-2">{artisan.title}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{artisan.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Package className="w-4 h-4" />
                    <span>{artisan.totalProducts} produtos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{artisan.subscribers} seguidores</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{artisan.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button 
                  variant={isFollowing ? "outline" : "secondary"}
                  onClick={() => setIsFollowing(!isFollowing)}
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-red-500 text-red-500' : ''}`} />
                  {isFollowing ? 'Seguindo' : 'Seguir'}
                </Button>
                <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="bg-card/80 backdrop-blur-sm border-tavern-brass/30">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Sobre o Artesão</h2>
                <p className="text-foreground/70 mb-4">{artisan.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {artisan.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-foreground/60 pt-4 border-t border-tavern-brass/20">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Membro desde {artisan.joinedDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{artisan.socialProof}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Products Section */}
            <Card className="bg-card/80 backdrop-blur-sm border-tavern-brass/30">
              <div className="p-6">
                <Tabs defaultValue="all" className="w-full">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-foreground">Produtos</h2>
                    <TabsList>
                      <TabsTrigger value="all">Todos</TabsTrigger>
                      <TabsTrigger value="tokens">Tokens</TabsTrigger>
                      <TabsTrigger value="maps">Mapas</TabsTrigger>
                      <TabsTrigger value="adventures">Aventuras</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="all">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {products.map((product) => (
                        <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                          <div className="aspect-square relative overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge variant="secondary" className="text-xs">
                                {getProductIcon(product.category)}
                                <span className="ml-1">{product.type}</span>
                              </Badge>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                              <Button 
                                variant="secondary" 
                                size="sm" 
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Preview
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-semibold text-foreground mb-2 truncate">
                              {product.name}
                            </h3>
                            <p className="text-sm text-foreground/60 mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-1 text-sm">
                                  <Star className="w-3 h-3 fill-accent text-accent" />
                                  <span className="text-foreground/70">{product.rating}</span>
                                  <span className="text-foreground/50">({product.downloads})</span>
                                </div>
                                <p className="text-lg font-bold text-accent">{product.price}</p>
                              </div>
                              
                              <Button variant="tavern" size="sm">
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Comprar
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Filtered tabs would filter the products array */}
                  <TabsContent value="tokens">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {products.filter(p => p.category === "tokens").map((product) => (
                        <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                          {/* Same product card structure */}
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscription Card */}
            <Card className="bg-gradient-to-br from-accent/10 to-magical-glow/10 border-accent/30">
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    Assinatura Mensal
                  </h3>
                  <div className="text-3xl font-bold text-accent mb-1">
                    {artisan.monthlyPrice}
                  </div>
                  <p className="text-sm text-foreground/60">
                    Renovação automática
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {subscriptionBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-foreground/70">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button variant="magical" className="w-full" size="lg">
                  <Crown className="w-5 h-5 mr-2" />
                  Assinar Agora
                </Button>

                <p className="text-xs text-foreground/50 text-center mt-3">
                  Cancele a qualquer momento
                </p>
              </div>
            </Card>

            {/* Stats Card */}
            <Card className="bg-card/80 backdrop-blur-sm border-tavern-brass/30">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Estatísticas</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60">Total de Produtos</span>
                    <span className="font-semibold text-foreground">{artisan.totalProducts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60">Seguidores</span>
                    <span className="font-semibold text-foreground">{artisan.subscribers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60">Avaliação Média</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold text-foreground">{artisan.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60">Especialidade</span>
                    <Badge variant="secondary" className="text-xs">{artisan.specialty}</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Support Card */}
            <Card className="bg-card/80 backdrop-blur-sm border-tavern-brass/30">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Suporte</h3>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="w-4 h-4 mr-2" />
                    Deixar Avaliação
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="w-4 h-4 mr-2" />
                    Reportar Problema
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanShop;