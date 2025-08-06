import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/ui/hero-section";
import ProductShowcase from "@/components/ui/product-showcase";
import ArtisanSection from "@/components/ui/artisan-section";
import Footer from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <HeroSection />
      <ProductShowcase />
      <ArtisanSection />
      <Footer />
    </div>
  );
};

export default Index;
