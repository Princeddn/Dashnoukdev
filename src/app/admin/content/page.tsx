"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SectionCard } from "@/components/admin/SectionCard";
import { FormField, TextAreaField, SelectField } from "@/components/admin/FormField";
import { Button } from "@/components/ui/button";
import { Save, Plus, Trash2 } from "lucide-react";

interface HeroBadge {
  id: string;
  text: string;
  icon: string;
  link: string | null;
  order_index: number;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  order_index: number;
}

export default function ContentPage() {
  const [heroData, setHeroData] = useState({
    greeting: "",
    title: "",
    tagline: "",
    availability: "",
    availability_color: "green" as "green" | "orange" | "red",
    cta_text: "",
    cta_href: "",
  });
  const [badges, setBadges] = useState<HeroBadge[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    try {
      // Fetch hero settings
      const { data: heroSettings, error: heroError } = await supabase
        .from("site_settings")
        .select("*")
        .eq("category", "hero");

      if (heroError) {
        console.error("Error fetching hero settings:", heroError);
      }

      if (heroSettings && heroSettings.length > 0) {
        const hero: any = {
          greeting: "",
          title: "",
          tagline: "",
          availability: "",
          availability_color: "green",
          cta_text: "",
          cta_href: "",
        };

        // Map database keys (with hero_ prefix) to local state keys
        heroSettings.forEach((setting) => {
          const key = setting.key.replace('hero_', ''); // Remove prefix
          hero[key] = setting.value || "";
        });

        setHeroData(hero);
      }

      // Fetch badges
      const { data: badgesData, error: badgesError } = await supabase
        .from("hero_badges")
        .select("*")
        .order("order_index");

      if (badgesError) {
        console.error("Error fetching badges:", badgesError);
      }

      if (badgesData) setBadges(badgesData);

      // Fetch social links
      const { data: socialData, error: socialError } = await supabase
        .from("social_links")
        .select("*")
        .order("order_index");

      if (socialError) {
        console.error("Error fetching social links:", socialError);
      }

      if (socialData) setSocialLinks(socialData);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveHero() {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(heroData)) {
        // Add hero_ prefix to key when saving to database
        const dbKey = `hero_${key}`;
        await supabase
          .from("site_settings")
          .upsert(
            {
              key: dbKey,
              value,
              category: "hero",
              type: typeof value === "number" ? "number" : "text",
              description: `Hero ${key}`,
            },
            { onConflict: "key" }
          );
      }

      alert("Section Hero mise à jour !");
    } catch (error) {
      console.error("Error saving hero:", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveBadges() {
    setSaving(true);
    try {
      for (const badge of badges) {
        if (badge.id.startsWith("new-")) {
          // Insert new badge
          const { id, ...badgeData } = badge;
          await supabase.from("hero_badges").insert(badgeData);
        } else {
          // Update existing badge
          await supabase
            .from("hero_badges")
            .update(badge)
            .eq("id", badge.id);
        }
      }

      alert("Badges mis à jour !");
      fetchContent();
    } catch (error) {
      console.error("Error saving badges:", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveSocialLinks() {
    setSaving(true);
    try {
      for (const link of socialLinks) {
        if (link.id.startsWith("new-")) {
          const { id, ...linkData } = link;
          await supabase.from("social_links").insert(linkData);
        } else {
          await supabase
            .from("social_links")
            .update(link)
            .eq("id", link.id);
        }
      }

      alert("Liens sociaux mis à jour !");
      fetchContent();
    } catch (error) {
      console.error("Error saving social links:", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  function addBadge() {
    setBadges([
      ...badges,
      {
        id: `new-${Date.now()}`,
        text: "",
        icon: "✨",
        link: null,
        order_index: badges.length,
      },
    ]);
  }

  function removeBadge(id: string) {
    setBadges(badges.filter((b) => b.id !== id));
    if (!id.startsWith("new-")) {
      supabase.from("hero_badges").delete().eq("id", id);
    }
  }

  function addSocialLink() {
    setSocialLinks([
      ...socialLinks,
      {
        id: `new-${Date.now()}`,
        platform: "",
        url: "",
        icon: "link",
        order_index: socialLinks.length,
      },
    ]);
  }

  function removeSocialLink(id: string) {
    setSocialLinks(socialLinks.filter((l) => l.id !== id));
    if (!id.startsWith("new-")) {
      supabase.from("social_links").delete().eq("id", id);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contenu du site</h1>
        <p className="text-gray-600 mt-2">
          Gérez le contenu de la page d'accueil
        </p>
      </div>

      {/* Hero Section */}
      <SectionCard
        title="Section Hero"
        description="Contenu principal de la page d'accueil"
        action={
          <Button onClick={handleSaveHero} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </Button>
        }
      >
        <div className="space-y-4">
          <FormField
            label="Salutation"
            id="greeting"
            value={heroData.greeting}
            onChange={(value) => setHeroData({ ...heroData, greeting: value })}
            placeholder="Salut, je suis"
          />

          <FormField
            label="Titre principal"
            id="title"
            value={heroData.title}
            onChange={(value) => setHeroData({ ...heroData, title: value })}
            placeholder="Nouk Prince"
          />

          <TextAreaField
            label="Tagline"
            id="tagline"
            value={heroData.tagline}
            onChange={(value) => setHeroData({ ...heroData, tagline: value })}
            placeholder="Votre description en quelques mots"
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Disponibilité"
              id="availability"
              value={heroData.availability}
              onChange={(value) =>
                setHeroData({ ...heroData, availability: value })
              }
              placeholder="Disponible pour des projets"
            />

            <SelectField
              label="Couleur de disponibilité"
              id="availability_color"
              value={heroData.availability_color}
              onChange={(value) =>
                setHeroData({
                  ...heroData,
                  availability_color: value as "green" | "orange" | "red",
                })
              }
              options={[
                { value: "green", label: "Vert (Disponible)" },
                { value: "orange", label: "Orange (Limité)" },
                { value: "red", label: "Rouge (Indisponible)" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Texte du bouton CTA"
              id="cta_text"
              value={heroData.cta_text}
              onChange={(value) => setHeroData({ ...heroData, cta_text: value })}
              placeholder="Voir mes projets"
            />

            <FormField
              label="Lien du bouton CTA"
              id="cta_href"
              value={heroData.cta_href}
              onChange={(value) => setHeroData({ ...heroData, cta_href: value })}
              placeholder="#projects"
            />
          </div>
        </div>
      </SectionCard>

      {/* Badges */}
      <SectionCard
        title="Badges"
        description="Badges affichés sous le titre"
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={addBadge}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
            <Button onClick={handleSaveBadges} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </Button>
          </div>
        }
      >
        <div className="space-y-3">
          {badges.map((badge, index) => (
            <div key={badge.id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                <FormField
                  label="Icône"
                  id={`badge-icon-${index}`}
                  value={badge.icon}
                  onChange={(value) => {
                    const updated = [...badges];
                    if (updated[index]) {
                      updated[index].icon = value;
                      setBadges(updated);
                    }
                  }}
                  placeholder="✨"
                />
                <FormField
                  label="Texte"
                  id={`badge-text-${index}`}
                  value={badge.text}
                  onChange={(value) => {
                    const updated = [...badges];
                    if (updated[index]) {
                      updated[index].text = value;
                      setBadges(updated);
                    }
                  }}
                  placeholder="Badge"
                />
                <FormField
                  label="Lien (optionnel)"
                  id={`badge-link-${index}`}
                  value={badge.link || ""}
                  onChange={(value) => {
                    const updated = [...badges];
                    if (updated[index]) {
                      updated[index].link = value || null;
                      setBadges(updated);
                    }
                  }}
                  placeholder="https://..."
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeBadge(badge.id)}
                className="mt-6"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Social Links */}
      <SectionCard
        title="Liens sociaux"
        description="Vos réseaux sociaux"
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={addSocialLink}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
            <Button onClick={handleSaveSocialLinks} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </Button>
          </div>
        }
      >
        <div className="space-y-3">
          {socialLinks.map((link, index) => (
            <div key={link.id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                <FormField
                  label="Plateforme"
                  id={`social-platform-${index}`}
                  value={link.platform}
                  onChange={(value) => {
                    const updated = [...socialLinks];
                    if (updated[index]) {
                      updated[index].platform = value;
                      setSocialLinks(updated);
                    }
                  }}
                  placeholder="GitHub"
                />
                <FormField
                  label="URL"
                  id={`social-url-${index}`}
                  value={link.url}
                  onChange={(value) => {
                    const updated = [...socialLinks];
                    if (updated[index]) {
                      updated[index].url = value;
                      setSocialLinks(updated);
                    }
                  }}
                  placeholder="https://github.com/..."
                />
                <FormField
                  label="Icône"
                  id={`social-icon-${index}`}
                  value={link.icon}
                  onChange={(value) => {
                    const updated = [...socialLinks];
                    if (updated[index]) {
                      updated[index].icon = value;
                      setSocialLinks(updated);
                    }
                  }}
                  placeholder="github"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeSocialLink(link.id)}
                className="mt-6"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
