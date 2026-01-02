"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SectionCard, StatCard } from "@/components/admin/SectionCard";
import { FormField, TextAreaField, SelectField } from "@/components/admin/FormField";
import { Button } from "@/components/ui/button";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { Trash2, Edit, Save, X, Wrench, Eye, EyeOff } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  category: string;
  description: string | null;
  icon: string | null;
  website_url: string | null;
  is_visible: boolean;
  order_index: number;
  created_at: string;
}

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Tool>>({
    name: "",
    category: "Development",
    description: "",
    icon: null,
    website_url: null,
    is_visible: true,
    order_index: 0,
  });

  useEffect(() => {
    fetchTools();
  }, []);

  async function fetchTools() {
    try {
      const { data, error } = await supabase
        .from("tools")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setTools(data || []);
    } catch (error) {
      console.error("Error fetching tools:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from("tools")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("tools").insert({
          ...formData,
          order_index: tools.length,
        });

        if (error) throw error;
      }

      setFormData({
        name: "",
        category: "Development",
        description: "",
        icon: null,
        website_url: null,
        is_visible: true,
        order_index: 0,
      });
      setEditingId(null);
      fetchTools();
    } catch (error) {
      console.error("Error saving tool:", error);
      alert("Erreur lors de la sauvegarde");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet outil ?")) return;

    try {
      const { error } = await supabase.from("tools").delete().eq("id", id);
      if (error) throw error;
      fetchTools();
    } catch (error) {
      console.error("Error deleting tool:", error);
      alert("Erreur lors de la suppression");
    }
  }

  async function toggleVisibility(id: string, currentVisibility: boolean) {
    try {
      const { error } = await supabase
        .from("tools")
        .update({ is_visible: !currentVisibility })
        .eq("id", id);

      if (error) throw error;
      fetchTools();
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  }

  function handleEdit(tool: Tool) {
    setFormData(tool);
    setEditingId(tool.id);
  }

  function handleCancel() {
    setFormData({
      name: "",
      category: "Development",
      description: "",
      icon: null,
      website_url: null,
      is_visible: true,
      order_index: 0,
    });
    setEditingId(null);
  }

  const categories = [
    "Development",
    "Design",
    "DevOps",
    "Testing",
    "Database",
    "Other",
  ];

  const categoryStats = categories.reduce((acc, cat) => {
    acc[cat] = tools.filter((t) => t.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  const visibleCount = tools.filter((t) => t.is_visible).length;

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
        <h1 className="text-3xl font-bold text-gray-900">Outils</h1>
        <p className="text-gray-600 mt-2">
          Gérez les outils et technologies que vous utilisez
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <StatCard
          title="Total"
          value={tools.length}
          icon={<Wrench className="w-4 h-4 text-green-600" />}
        />
        <StatCard
          title="Visibles"
          value={visibleCount}
          icon={<Eye className="w-4 h-4 text-apple-blue" />}
        />
        {categories.map((cat) => (
          <StatCard
            key={cat}
            title={cat}
            value={categoryStats[cat] || 0}
            icon={<Wrench className="w-4 h-4 text-gray-600" />}
          />
        ))}
      </div>

      {/* Add/Edit Form */}
      <SectionCard
        title={editingId ? "Modifier l'outil" : "Ajouter un outil"}
        description="Remplissez les informations"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Nom"
              id="name"
              value={formData.name || ""}
              onChange={(value) => setFormData({ ...formData, name: value })}
              placeholder="VS Code"
              required
            />

            <SelectField
              label="Catégorie"
              id="category"
              value={formData.category || "Development"}
              onChange={(value) => setFormData({ ...formData, category: value })}
              options={categories.map((cat) => ({ value: cat, label: cat }))}
              required
            />
          </div>

          <TextAreaField
            label="Description (optionnel)"
            id="description"
            value={formData.description || ""}
            onChange={(value) => setFormData({ ...formData, description: value || null })}
            placeholder="Éditeur de code moderne et extensible..."
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Icône (optionnel)"
              id="icon"
              value={formData.icon || ""}
              onChange={(value) => setFormData({ ...formData, icon: value || null })}
              placeholder="💻"
              helpText="Emoji ou texte court"
            />

            <FormField
              label="Site web (optionnel)"
              id="website_url"
              type="url"
              value={formData.website_url || ""}
              onChange={(value) =>
                setFormData({ ...formData, website_url: value || null })
              }
              placeholder="https://code.visualstudio.com"
            />
          </div>

          <ToggleSwitch
            id="is_visible"
            label="Visible sur le site"
            checked={formData.is_visible || false}
            onChange={(checked) => setFormData({ ...formData, is_visible: checked })}
            description="Afficher cet outil dans la section Outils"
          />

          <div className="flex gap-2">
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              {editingId ? "Mettre à jour" : "Ajouter"}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
            )}
          </div>
        </form>
      </SectionCard>

      {/* Tools List */}
      <SectionCard
        title="Tous les outils"
        description={`${tools.length} outil(s) au total`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tools.length === 0 ? (
            <p className="col-span-2 text-center text-gray-500 py-8">
              Aucun outil. Ajoutez-en un ci-dessus.
            </p>
          ) : (
            tools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {tool.icon && (
                  <div className="text-2xl flex-shrink-0">{tool.icon}</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {tool.name}
                      </h3>
                      {tool.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {tool.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      {tool.category}
                    </span>
                    {tool.website_url && (
                      <a
                        href={tool.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-apple-blue hover:underline flex items-center gap-1"
                      >
                        Site web
                      </a>
                    )}
                    <button
                      onClick={() => toggleVisibility(tool.id, tool.is_visible)}
                      className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                        tool.is_visible
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {tool.is_visible ? (
                        <>
                          <Eye className="w-3 h-3" /> Visible
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" /> Masqué
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(tool)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(tool.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}
