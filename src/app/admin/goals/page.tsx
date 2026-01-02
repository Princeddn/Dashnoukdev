"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SectionCard, StatCard } from "@/components/admin/SectionCard";
import { FormField, TextAreaField, SelectField } from "@/components/admin/FormField";
import { Button } from "@/components/ui/button";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { Trash2, Edit, Save, X, CheckCircle, Circle } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "not_started" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  target_date: string | null;
  is_visible: boolean;
  order_index: number;
  created_at: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Goal>>({
    title: "",
    description: "",
    category: "Professional",
    status: "not_started",
    priority: "medium",
    target_date: null,
    is_visible: true,
    order_index: 0,
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  async function fetchGoals() {
    try {
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        const { error } = await supabase
          .from("goals")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("goals").insert({
          ...formData,
          order_index: goals.length,
        });

        if (error) throw error;
      }

      setFormData({
        title: "",
        description: "",
        category: "Professional",
        status: "not_started",
        priority: "medium",
        target_date: null,
        is_visible: true,
        order_index: 0,
      });
      setEditingId(null);
      fetchGoals();
    } catch (error) {
      console.error("Error saving goal:", error);
      alert("Erreur lors de la sauvegarde");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet objectif ?")) return;

    try {
      const { error } = await supabase.from("goals").delete().eq("id", id);
      if (error) throw error;
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
      alert("Erreur lors de la suppression");
    }
  }

  async function toggleVisibility(id: string, currentVisibility: boolean) {
    try {
      const { error } = await supabase
        .from("goals")
        .update({ is_visible: !currentVisibility })
        .eq("id", id);

      if (error) throw error;
      fetchGoals();
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  }

  function handleEdit(goal: Goal) {
    setFormData(goal);
    setEditingId(goal.id);
  }

  function handleCancel() {
    setFormData({
      title: "",
      description: "",
      category: "Professional",
      status: "not_started",
      priority: "medium",
      target_date: null,
      is_visible: true,
      order_index: 0,
    });
    setEditingId(null);
  }

  const statusStats = {
    not_started: goals.filter((g) => g.status === "not_started").length,
    in_progress: goals.filter((g) => g.status === "in_progress").length,
    completed: goals.filter((g) => g.status === "completed").length,
  };

  const getStatusIcon = (status: Goal["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in_progress":
        return <Circle className="w-5 h-5 text-apple-orange fill-current" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: Goal["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-apple-orange/10 text-apple-orange";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900">Objectifs</h1>
        <p className="text-gray-600 mt-2">
          Définissez et suivez vos objectifs professionnels
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Non démarrés"
          value={statusStats.not_started}
          icon={<Circle className="w-6 h-6 text-gray-400" />}
        />
        <StatCard
          title="En cours"
          value={statusStats.in_progress}
          icon={<Circle className="w-6 h-6 text-apple-orange fill-current" />}
        />
        <StatCard
          title="Terminés"
          value={statusStats.completed}
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
        />
      </div>

      {/* Add/Edit Form */}
      <SectionCard
        title={editingId ? "Modifier l'objectif" : "Ajouter un objectif"}
        description="Remplissez les informations"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Titre"
            id="title"
            value={formData.title || ""}
            onChange={(value) => setFormData({ ...formData, title: value })}
            placeholder="Maîtriser React et Next.js"
            required
          />

          <TextAreaField
            label="Description"
            id="description"
            value={formData.description || ""}
            onChange={(value) => setFormData({ ...formData, description: value })}
            placeholder="Détails de l'objectif..."
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              label="Catégorie"
              id="category"
              value={formData.category || "Professional"}
              onChange={(value) => setFormData({ ...formData, category: value })}
              options={[
                { value: "Professional", label: "Professionnel" },
                { value: "Learning", label: "Apprentissage" },
                { value: "Personal", label: "Personnel" },
                { value: "Project", label: "Projet" },
              ]}
              required
            />

            <SelectField
              label="Statut"
              id="status"
              value={formData.status || "not_started"}
              onChange={(value) =>
                setFormData({ ...formData, status: value as Goal["status"] })
              }
              options={[
                { value: "not_started", label: "Non démarré" },
                { value: "in_progress", label: "En cours" },
                { value: "completed", label: "Terminé" },
              ]}
              required
            />

            <SelectField
              label="Priorité"
              id="priority"
              value={formData.priority || "medium"}
              onChange={(value) =>
                setFormData({ ...formData, priority: value as Goal["priority"] })
              }
              options={[
                { value: "low", label: "Basse" },
                { value: "medium", label: "Moyenne" },
                { value: "high", label: "Haute" },
              ]}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Date cible (optionnel)"
              id="target_date"
              type="date"
              value={formData.target_date || ""}
              onChange={(value) =>
                setFormData({ ...formData, target_date: value || null })
              }
            />

            <div className="flex items-center h-full pt-6">
              <ToggleSwitch
                id="is_visible"
                label="Visible sur le site"
                checked={formData.is_visible || false}
                onChange={(checked) =>
                  setFormData({ ...formData, is_visible: checked })
                }
              />
            </div>
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

      {/* Goals List */}
      <SectionCard
        title="Tous les objectifs"
        description={`${goals.length} objectif(s) au total`}
      >
        <div className="space-y-3">
          {goals.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Aucun objectif. Ajoutez-en un ci-dessus.
            </p>
          ) : (
            goals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="mt-1">{getStatusIcon(goal.status)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(goal)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(goal.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(
                        goal.priority
                      )}`}
                    >
                      {goal.priority === "high"
                        ? "Haute"
                        : goal.priority === "medium"
                        ? "Moyenne"
                        : "Basse"}
                    </span>
                    <span className="px-2 py-1 text-xs bg-apple-blue/10 text-apple-blue rounded-full">
                      {goal.category}
                    </span>
                    {goal.target_date && (
                      <span className="text-xs text-gray-500">
                        Cible: {new Date(goal.target_date).toLocaleDateString("fr-FR")}
                      </span>
                    )}
                    <button
                      onClick={() => toggleVisibility(goal.id, goal.is_visible)}
                      className={`text-xs px-2 py-1 rounded-full ${
                        goal.is_visible
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {goal.is_visible ? "Visible" : "Masqué"}
                    </button>
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
