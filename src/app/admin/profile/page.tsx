"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { SectionCard } from "@/components/admin/SectionCard";
import { FormField, TextAreaField } from "@/components/admin/FormField";
import { Button } from "@/components/ui/button";
import { User, Upload, Save } from "lucide-react";
import Image from "next/image";

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  avatar_url: string;
  resume_url: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    avatar_url: "",
    resume_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("category", "profile");

      if (error) {
        console.error("Error fetching profile:", error);
      }

      if (data && data.length > 0) {
        const profileData: any = {
          name: "",
          title: "",
          bio: "",
          email: "",
          phone: "",
          location: "",
          avatar_url: "",
          resume_url: "",
        };

        data.forEach((setting) => {
          profileData[setting.key] = setting.value || "";
        });

        setProfile(profileData as ProfileData);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      // Update each profile field
      for (const [key, value] of Object.entries(profile)) {
        await supabase
          .from("site_settings")
          .upsert({
            key,
            value,
            category: "profile",
            type: "text",
            description: `Profile ${key}`,
          }, {
            onConflict: "key",
          });
      }

      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("L'image ne doit pas dépasser 2MB");
      return;
    }

    setUploadingAvatar(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `avatar-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw new Error(uploadError.message || "Erreur lors de l'upload");
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        throw new Error("Impossible d'obtenir l'URL publique");
      }

      const newAvatarUrl = urlData.publicUrl;

      // Update profile state
      setProfile({ ...profile, avatar_url: newAvatarUrl });

      // Save to database immediately
      await supabase
        .from("site_settings")
        .upsert(
          {
            key: "avatar_url",
            value: newAvatarUrl,
            category: "profile",
            type: "text",
            description: "Avatar URL",
          },
          { onConflict: "key" }
        );

      alert("Photo uploadée avec succès !");
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      alert(`Erreur : ${error.message || "Impossible d'uploader la photo"}`);
    } finally {
      setUploadingAvatar(false);
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
        <h1 className="text-3xl font-bold text-gray-900">Profil</h1>
        <p className="text-gray-600 mt-2">
          Gérez vos informations personnelles et votre photo de profil
        </p>
      </div>

      {/* Avatar Upload */}
      <SectionCard
        title="Photo de profil"
        description="Téléchargez votre photo (max 2MB)"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt="Avatar"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
              disabled={uploadingAvatar}
            />
            <Button
              type="button"
              variant="outline"
              disabled={uploadingAvatar}
              onClick={(e) => {
                e.preventDefault();
                (e.currentTarget.previousElementSibling as HTMLInputElement)?.click();
              }}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploadingAvatar ? "Upload..." : "Changer la photo"}
            </Button>
          </label>
        </div>
      </SectionCard>

      {/* Personal Information */}
      <SectionCard
        title="Informations personnelles"
        description="Informations affichées sur votre portfolio"
        action={
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Sauvegarde..." : "Enregistrer"}
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Nom complet"
              id="name"
              value={profile.name}
              onChange={(value) => setProfile({ ...profile, name: value })}
              placeholder="Nouk Prince"
              required
            />
            <FormField
              label="Titre professionnel"
              id="title"
              value={profile.title}
              onChange={(value) => setProfile({ ...profile, title: value })}
              placeholder="Software Engineer"
              required
            />
          </div>

          <TextAreaField
            label="Bio"
            id="bio"
            value={profile.bio}
            onChange={(value) => setProfile({ ...profile, bio: value })}
            placeholder="Parlez de vous..."
            rows={4}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Email"
              id="email"
              type="email"
              value={profile.email}
              onChange={(value) => setProfile({ ...profile, email: value })}
              placeholder="prince@example.com"
            />
            <FormField
              label="Téléphone"
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(value) => setProfile({ ...profile, phone: value })}
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <FormField
            label="Localisation"
            id="location"
            value={profile.location}
            onChange={(value) => setProfile({ ...profile, location: value })}
            placeholder="Paris, France"
          />

          <FormField
            label="URL du CV"
            id="resume_url"
            type="url"
            value={profile.resume_url}
            onChange={(value) => setProfile({ ...profile, resume_url: value })}
            placeholder="https://example.com/cv.pdf"
            helpText="Lien vers votre CV en PDF"
          />
        </div>
      </SectionCard>
    </div>
  );
}
