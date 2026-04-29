import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Skills } from "@/components/portfolio/skills";
import { Projects } from "@/components/portfolio/projects";
import { Education } from "@/components/portfolio/education";
import { Achievements } from "@/components/portfolio/achievements";
import { Resume } from "@/components/portfolio/resume";
import { Contact } from "@/components/portfolio/contact";
import { BackToTop } from "@/components/portfolio/back-to-top";

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Achievements />
      <Resume />
      <Contact />
      <BackToTop />
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-muted-foreground">
            {"© 2024 Atharva Ghadge. All rights reserved."}
          </p>
        </div>
      </footer>
    </main>
  );
}
