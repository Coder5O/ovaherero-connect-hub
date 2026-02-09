import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { NatureGallery } from "@/components/home/NatureGallery";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <AboutPreview />
      <NatureGallery />
      <NewsletterSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
