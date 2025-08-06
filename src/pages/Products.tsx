import { useState } from "react";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

// Mock data for products
const mockProducts = [
  {
    id: 1,
    title: "Pack de Tokens de Personagens",
    author: "Artesão Mágico",
    price: "R$ 15,99",
    category: "Tokens",
    image: "/src/assets/rpg-tokens.jpg",
    rating: 4.8,
    downloads: 234
  },
  {
    id: 2,
    title: "Mapa da Floresta Sombria",
    author: "Cartógrafo Digital",
    price: "R$ 24,99",
    category: "Mapas",
    image: "/src/assets/fantasy-maps.jpg",
    rating: 4.9,
    downloads: 156
  },
  {
    id: 3,
    title: "Aventura: O Tesouro Perdido",
    author: "Mestre das Histórias",
    price: "R$ 39,99",
    category: "Aventuras",
    image: "/src/assets/parchment-bg.jpg",
    rating: 4.7,
    downloads: 89
  },
  {
    id: 4,
    title: "Trilha Sonora Épica",
    author: "Bardo Musical",
    price: "R$ 19,99",
    category: "Áudio",
    image: "/src/assets/tavern-hero.jpg",
    rating: 4.6,
    downloads: 178
  },
  {
    id: 5,
    title: "Tokens de Monstros Épicos",
    author: "Artesão Mágico",
    price: "R$ 29,99",
    category: "Tokens",
    image: "/src/assets/rpg-tokens.jpg",
    rating: 4.9,
    downloads: 302
  },
  {
    id: 6,
    title: "Cidade Medieval Completa",
    author: "Arquiteto Digital",
    price: "R$ 49,99",
    category: "Mapas",
    image: "/src/assets/fantasy-maps.jpg",
    rating: 4.8,
    downloads: 127
  }
];

const categories = ["Todos", "Tokens", "Mapas", "Aventuras", "Áudio", "Assets"];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      
      {/* Header */}
      <div className="pt-20 pb-8 bg-gradient-to-b from-tavern-wood/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-medieval font-bold text-foreground mb-4">
              Produtos Digitais
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra uma vasta coleção de produtos criados por artesãos especializados em RPG
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar produtos, artesãos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Categoria</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevância</SelectItem>
                          <SelectItem value="price-low">Menor preço</SelectItem>
                          <SelectItem value="price-high">Maior preço</SelectItem>
                          <SelectItem value="rating">Avaliação</SelectItem>
                          <SelectItem value="downloads">Downloads</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <div className="flex gap-2">
                        <Button
                          variant={viewMode === "grid" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode("grid")}
                        >
                          <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={viewMode === "list" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode("list")}
                        >
                          <List className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {filteredProducts.length} produtos encontrados
              </p>
              <div className="flex gap-2">
                {selectedCategory !== "Todos" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory("Todos")}>
                    {selectedCategory} ✕
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-tavern-glow transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 right-2 bg-tavern-brass text-tavern-wood">
                  {product.category}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                <p className="text-sm text-muted-foreground">por {product.author}</p>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-tavern-brass">{product.price}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">⭐ {product.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{product.downloads} downloads</p>
              </CardContent>
              <CardFooter className="pt-2">
                <Button className="w-full" variant="magical">
                  Adicionar ao Carrinho
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou termos de busca
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Todos");
            }}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;