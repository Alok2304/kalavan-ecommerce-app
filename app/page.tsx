import ArtisanStory from "@/components/ArtisanStory";
import CategorySection from "@/components/CategorySection";
import CraftsSection from "@/components/CraftsSection";
import CraftStory from "@/components/CraftStory";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import TrustSection from "@/components/TrustSection";

const page = () => {
  return (
    <main className="pt-22">
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <ArtisanStory />
      <CraftsSection />
      <CraftStory />
      <TrustSection />
      <Newsletter />
    </main>
  );
};

export default page;
