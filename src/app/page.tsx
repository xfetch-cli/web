import Footer from "@/components/Footer";
import ConfigBuilder from "@/components/landing/ConfigBuilder";
import DemoGallery from "@/components/landing/DemoGallery";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FinalCta from "@/components/landing/FinalCta";
import Hero from "@/components/landing/Hero";
import InstallSection from "@/components/landing/InstallSection";
import LandingEffects from "@/components/landing/LandingEffects";
import LayoutExplorer from "@/components/landing/LayoutExplorer";
import ModuleExplorer from "@/components/landing/ModuleExplorer";
import PluginSection from "@/components/landing/PluginSection";
import RoadmapSection from "@/components/landing/RoadmapSection";
import SystemMap from "@/components/landing/SystemMap";
import TerminalDemo from "@/components/landing/TerminalDemo";
import UninstallSection from "@/components/landing/UninstallSection";
import UsageSection from "@/components/landing/UsageSection";

export default function Home() {
  return (
    <div className="xf-landing">
      <LandingEffects />
      <main>
        <Hero />
        <InstallSection />
        <DemoGallery />
        <FeaturesSection />
        <TerminalDemo />
        <SystemMap />
        <ModuleExplorer />
        <LayoutExplorer />
        <ConfigBuilder />
        <PluginSection />
        <UsageSection />
        <RoadmapSection />
        <UninstallSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
