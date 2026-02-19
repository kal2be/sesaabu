import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { DepartmentsSection } from "@/components/home/DepartmentsSection";
import { PopularResourcesSection } from "@/components/home/PopularResourcesSection";
import { LatestNewsSection } from "@/components/home/LatestNewsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <DepartmentsSection />
      <PopularResourcesSection />
      <LatestNewsSection />
      <FeaturesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
