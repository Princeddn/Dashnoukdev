"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SectionCard } from "@/components/admin/SectionCard";
import { FormField } from "@/components/admin/FormField";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { Button } from "@/components/ui/button";
import { Save, Eye } from "lucide-react";

interface SectionConfig {
  id: string;
  section_name: string;
  is_visible: boolean;
  display_title: string;
  order_index: number;
}

interface ThemeSettings {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  text_color: string;
  dark_mode_enabled: boolean;
}

export default function AppearancePage() {
  const [sections, setSections] = useState<SectionConfig[]>([]);
  const [theme, setTheme] = useState<ThemeSettings>({
    primary_color: "#007AFF",
    secondary_color: "#5E5CE6",
    accent_color: "#FF9500",
    background_color: "#FFFFFF",
    text_color: "#000000",
    dark_mode_enabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAppearanceSettings();
  }, []);

  async function fetchAppearanceSettings() {
    try {
      // Fetch section configurations
      const { data: sectionsData, error: sectionsError } = await supabase
        .from("section_config")
        .select("*")
        .order("order_index");

      if (sectionsError) {
        console.error("Error fetching sections:", sectionsError);
      }

      if (sectionsData) setSections(sectionsData);

      // Fetch theme settings
      const { data: themeData, error: themeError } = await supabase
        .from("site_settings")
        .select("*")
        .eq("category", "theme");

      if (themeError) {
        console.error("Error fetching theme:", themeError);
      }

      if (themeData && themeData.length > 0) {
        const themeSettings: any = {};
        themeData.forEach((setting) => {
          themeSettings[setting.key] = setting.value;
        });
        setTheme({ ...theme, ...themeSettings });
      }
    } catch (error) {
      console.error("Error fetching appearance settings:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveTheme() {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(theme)) {
        await supabase
          .from("site_settings")
          .upsert(
            {
              key,
              value,
              category: "theme",
              type: typeof value === "boolean" ? "boolean" : "text",
              description: `Theme ${key}`,
            },
            { onConflict: "key" }
          );
      }

      alert("Thème mis à jour !");
    } catch (error) {
      console.error("Error saving theme:", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveSections() {
    setSaving(true);
    try {
      for (const section of sections) {
        await supabase
          .from("section_config")
          .update({
            is_visible: section.is_visible,
            display_title: section.display_title,
          })
          .eq("id", section.id);
      }

      alert("Sections mises à jour !");
    } catch (error) {
      console.error("Error saving sections:", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  function toggleSection(id: string) {
    setSections(
      sections.map((s) =>
        s.id === id ? { ...s, is_visible: !s.is_visible } : s
      )
    );
  }

  function updateSectionTitle(id: string, title: string) {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, display_title: title } : s))
    );
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
        <h1 className="text-3xl font-bold text-gray-900">Apparence</h1>
        <p className="text-gray-600 mt-2">
          Personnalisez le thème et la visibilité des sections
        </p>
      </div>

      {/* Theme Settings */}
      <SectionCard
        title="Thème"
        description="Couleurs et style du site"
        action={
          <Button onClick={handleSaveTheme} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Couleur primaire
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.primary_color}
                  onChange={(e) =>
                    setTheme({ ...theme, primary_color: e.target.value })
                  }
                  className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                />
                <FormField
                  label=""
                  id="primary_color"
                  value={theme.primary_color}
                  onChange={(value) =>
                    setTheme({ ...theme, primary_color: value })
                  }
                  placeholder="#007AFF"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Couleur secondaire
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.secondary_color}
                  onChange={(e) =>
                    setTheme({ ...theme, secondary_color: e.target.value })
                  }
                  className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                />
                <FormField
                  label=""
                  id="secondary_color"
                  value={theme.secondary_color}
                  onChange={(value) =>
                    setTheme({ ...theme, secondary_color: value })
                  }
                  placeholder="#5E5CE6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Couleur accent
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.accent_color}
                  onChange={(e) =>
                    setTheme({ ...theme, accent_color: e.target.value })
                  }
                  className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                />
                <FormField
                  label=""
                  id="accent_color"
                  value={theme.accent_color}
                  onChange={(value) =>
                    setTheme({ ...theme, accent_color: value })
                  }
                  placeholder="#FF9500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Couleur de fond
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.background_color}
                  onChange={(e) =>
                    setTheme({ ...theme, background_color: e.target.value })
                  }
                  className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                />
                <FormField
                  label=""
                  id="background_color"
                  value={theme.background_color}
                  onChange={(value) =>
                    setTheme({ ...theme, background_color: value })
                  }
                  placeholder="#FFFFFF"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Couleur du texte
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme.text_color}
                  onChange={(e) =>
                    setTheme({ ...theme, text_color: e.target.value })
                  }
                  className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                />
                <FormField
                  label=""
                  id="text_color"
                  value={theme.text_color}
                  onChange={(value) =>
                    setTheme({ ...theme, text_color: value })
                  }
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          <ToggleSwitch
            id="dark_mode"
            label="Mode sombre (expérimental)"
            checked={theme.dark_mode_enabled}
            onChange={(checked) =>
              setTheme({ ...theme, dark_mode_enabled: checked })
            }
            description="Activer le mode sombre pour tout le site"
          />

          {/* Color Preview */}
          <div className="mt-6 p-6 rounded-lg border-2 border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Aperçu des couleurs
            </h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-12 h-12 rounded-lg shadow-sm border border-gray-200"
                  style={{ backgroundColor: theme.primary_color }}
                />
                <span className="text-sm text-gray-600">Primaire</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-12 h-12 rounded-lg shadow-sm border border-gray-200"
                  style={{ backgroundColor: theme.secondary_color }}
                />
                <span className="text-sm text-gray-600">Secondaire</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-12 h-12 rounded-lg shadow-sm border border-gray-200"
                  style={{ backgroundColor: theme.accent_color }}
                />
                <span className="text-sm text-gray-600">Accent</span>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Section Visibility */}
      <SectionCard
        title="Visibilité des sections"
        description="Choisissez les sections à afficher sur votre site"
        action={
          <Button onClick={handleSaveSections} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </Button>
        }
      >
        <div className="space-y-3">
          {sections.map((section) => (
            <div
              key={section.id}
              className="p-4 bg-gray-50 rounded-lg space-y-3"
            >
              <ToggleSwitch
                id={`section-${section.id}`}
                label={section.section_name}
                checked={section.is_visible}
                onChange={() => toggleSection(section.id)}
                description={
                  section.is_visible
                    ? "Cette section est visible"
                    : "Cette section est masquée"
                }
              />
              <FormField
                label="Titre affiché"
                id={`title-${section.id}`}
                value={section.display_title}
                onChange={(value) => updateSectionTitle(section.id, value)}
                placeholder={section.section_name}
              />
            </div>
          ))}
          {sections.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Aucune section configurée. Les sections seront créées
              automatiquement.
            </p>
          )}
        </div>
      </SectionCard>

      {/* Preview Note */}
      <SectionCard
        title="Note importante"
        description="Informations sur l'aperçu"
      >
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
          <Eye className="w-5 h-5 text-apple-blue flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900">
              Aperçu des modifications
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Les modifications de thème et de visibilité des sections prendront
              effet immédiatement après la sauvegarde. Actualisez la page
              d'accueil pour voir les changements.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
