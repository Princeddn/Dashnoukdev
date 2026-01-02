"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SectionCard, StatCard } from "@/components/admin/SectionCard";
import { FormField, SelectField } from "@/components/admin/FormField";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Save, X, Lightbulb } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
  order_index: number;
  created_at: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: "",
    category: "Frontend",
    proficiency: 50,
    icon: null,
    order_index: 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing skill
        const { error } = await supabase
          .from("skills")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;
      } else {
        // Create new skill
        const { error } = await supabase.from("skills").insert({
          ...formData,
          order_index: skills.length,
        });

        if (error) throw error;
      }

      setFormData({
        name: "",
        category: "Frontend",
        proficiency: 50,
        icon: null,
        order_index: 0,
      });
      setEditingId(null);
      fetchSkills();
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Erreur lors de la sauvegarde");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette compétence ?")) return;

    try {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;
      fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Erreur lors de la suppression");
    }
  }

  function handleEdit(skill: Skill) {
    setFormData(skill);
    setEditingId(skill.id);
  }

  function handleCancel() {
    setFormData({
      name: "",
      category: "Frontend",
      proficiency: 50,
      icon: null,
      order_index: 0,
    });
    setEditingId(null);
  }

  const categories = ["Frontend", "Backend", "DevOps", "Mobile", "Design", "Other"];
  const categoryStats = categories.reduce((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

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
        <h1 className="text-3xl font-bold text-gray-900">Compétences</h1>
        <p className="text-gray-600 mt-2">
          Gérez vos compétences techniques et leur niveau
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <StatCard
            key={cat}
            title={cat}
            value={categoryStats[cat] || 0}
            icon={<Lightbulb className="w-4 h-4 text-apple-purple" />}
          />
        ))}
      </div>

      {/* Add/Edit Form */}
      <SectionCard
        title={editingId ? "Modifier la compétence" : "Ajouter une compétence"}
        description="Remplissez les informations"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Nom"
              id="name"
              value={formData.name || ""}
              onChange={(value) => setFormData({ ...formData, name: value })}
              placeholder="React"
              required
            />

            <SelectField
              label="Catégorie"
              id="category"
              value={formData.category || "Frontend"}
              onChange={(value) => setFormData({ ...formData, category: value })}
              options={categories.map((cat) => ({ value: cat, label: cat }))}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Niveau de maîtrise: {formData.proficiency}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.proficiency || 50}
                onChange={(e) =>
                  setFormData({ ...formData, proficiency: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-apple-blue"
              />
            </div>

            <FormField
              label="Icône (optionnel)"
              id="icon"
              value={formData.icon || ""}
              onChange={(value) => setFormData({ ...formData, icon: value || null })}
              placeholder="⚛️"
              helpText="Emoji ou texte court"
            />
          </div>

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

      {/* Skills List */}
      <SectionCard
        title="Toutes les compétences"
        description={`${skills.length} compétence(s) au total`}
      >
        <div className="space-y-2">
          {skills.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Aucune compétence. Ajoutez-en une ci-dessus.
            </p>
          ) : (
            skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {skill.icon && <span className="text-lg">{skill.icon}</span>}
                    <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                    <span className="px-2 py-1 text-xs bg-apple-purple/10 text-apple-purple rounded-full">
                      {skill.category}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-apple-purple transition-all"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(skill)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(skill.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}
