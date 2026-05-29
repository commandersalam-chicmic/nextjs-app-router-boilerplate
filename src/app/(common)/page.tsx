"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { FeatureCategoryFilter, ScrollSectionId, SubscribeStatus } from "@/constants";
import { FEATURE_CATEGORY, SUBSCRIBE_STATUS } from "@/constants";
import {
  buildJournalArticles,
  buildStackFeatures,
  type JournalArticle,
  type StackFeature,
} from "@/helpers/home-content";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  FeatureDetail,
  Footer,
  Hero,
  JournalDetail,
  JournalSection,
  Nav,
  PhilosophySection,
  StackSection,
} from "@/section/home";
import { useAuthStore } from "@/store/auth-store";

import type { MouseEvent, ReactElement } from "react";

export default function HomePage(): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<FeatureCategoryFilter>(FEATURE_CATEGORY.All);
  const [selectedFeature, setSelectedFeature] = useState<StackFeature | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<SubscribeStatus>(SUBSCRIBE_STATUS.Idle);
  const [heroAnimate, setHeroAnimate] = useState(false);

  const stackFeatures = useMemo(() => buildStackFeatures(t), [t]);
  const journalArticles = useMemo(() => buildJournalArticles(t), [t]);

  const filteredFeatures = useMemo(() => {
    if (activeCategory === FEATURE_CATEGORY.All) return stackFeatures;
    return stackFeatures.filter((f) => f.categoryKey === activeCategory);
  }, [activeCategory, stackFeatures]);

  const [stackHeaderRef, stackHeaderRevealed] = useScrollReveal();
  const [stackGridRef, stackGridRevealed] = useScrollReveal();
  const [philosophyRef, philosophyRevealed] = useScrollReveal();
  const [philosophyBlock1Ref, philosophyBlock1Revealed] = useScrollReveal();
  const [philosophyBlock2Ref, philosophyBlock2Revealed] = useScrollReveal();
  const [journalRef, journalRevealed] = useScrollReveal();

  useEffect(() => {
    const timer = globalThis.setTimeout(() => {
      setHeroAnimate(true);
    }, 50);
    const handleScroll = () => {
      setScrolled(globalThis.scrollY > 50);
    };
    globalThis.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.clearTimeout(timer);
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribeStatus(SUBSCRIBE_STATUS.Loading);
    globalThis.setTimeout(() => {
      setSubscribeStatus(SUBSCRIBE_STATUS.Success);
      setEmail("");
    }, 1200);
  };

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  const scrollToSection = (targetId: ScrollSectionId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + globalThis.scrollY - headerOffset;
      globalThis.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleLinkClick = (e: MouseEvent<HTMLElement>, targetId: ScrollSectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setSelectedFeature(null);
    setSelectedArticle(null);
    globalThis.setTimeout(() => scrollToSection(targetId), 50);
  };

  const headerTextColor = scrolled || mobileMenuOpen ? "text-foreground" : "text-palette-sandstone";

  if (selectedFeature) {
    return <FeatureDetail feature={selectedFeature} onClose={() => setSelectedFeature(null)} />;
  }
  if (selectedArticle) {
    return <JournalDetail article={selectedArticle} onClose={() => setSelectedArticle(null)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-700 ease-in-out font-sans selection:bg-muted selection:text-foreground">
      <Nav
        headerTextColor={headerTextColor}
        mobileMenuOpen={mobileMenuOpen}
        scrolled={scrolled}
        user={user}
        onLinkClick={handleLinkClick}
        onLogout={handleLogout}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onBrandClick={() => {
          globalThis.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <Hero heroAnimate={heroAnimate} onExploreClick={handleLinkClick} />

      <StackSection
        activeCategory={activeCategory}
        filteredFeatures={filteredFeatures}
        stackGridRef={stackGridRef}
        stackGridRevealed={stackGridRevealed}
        stackHeaderRef={stackHeaderRef}
        stackHeaderRevealed={stackHeaderRevealed}
        onCategoryChange={setActiveCategory}
        onSelectFeature={setSelectedFeature}
      />

      <PhilosophySection
        philosophyBlock1Ref={philosophyBlock1Ref}
        philosophyBlock1Revealed={philosophyBlock1Revealed}
        philosophyBlock2Ref={philosophyBlock2Ref}
        philosophyBlock2Revealed={philosophyBlock2Revealed}
        philosophyRef={philosophyRef}
        philosophyRevealed={philosophyRevealed}
      />

      <JournalSection
        journalArticles={journalArticles}
        journalRef={journalRef}
        journalRevealed={journalRevealed}
        onSelectArticle={setSelectedArticle}
      />

      <Footer
        email={email}
        subscribeStatus={subscribeStatus}
        onEmailChange={setEmail}
        onLinkClick={handleLinkClick}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
}
