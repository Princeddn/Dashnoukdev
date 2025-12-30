import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Photo de profil (placeholder) */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-4xl font-bold shadow-lg">
            NP
          </div>

          {/* Nom */}
          <h1 className="text-5xl font-bold tracking-tight">Nouk Prince</h1>

          {/* Phrase d'accueil */}
          <p className="text-2xl text-muted-foreground font-medium">
            Welcome in my world
          </p>

          {/* Boutons rapides */}
          <div className="flex gap-4 pt-4">
            <Link
              href="https://github.com/Princeddn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="gap-2">
                <Github className="w-5 h-5" />
                GitHub
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/prince-noukounwoui-ba1978217/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="gap-2">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
