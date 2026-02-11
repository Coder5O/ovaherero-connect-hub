import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ChaptersMap } from "@/components/home/ChaptersMap";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ChaptersGallery } from "@/components/home/ChaptersGallery";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ChaptersMap />
      <FeaturesSection />
      <AboutPreview />
      <ChaptersGallery />
      <NewsletterSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
