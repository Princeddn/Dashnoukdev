-- Migration 004: CMS Core Infrastructure
-- Tables pour gérer tout le contenu du site

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE: site_settings
-- Stockage flexible clé-valeur pour tous les paramètres du site
-- ============================================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT NOT NULL, -- 'hero', 'profile', 'navbar', 'metadata', 'theme'
  type TEXT NOT NULL, -- 'text', 'url', 'image', 'number', 'boolean', 'array', 'object'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLE: section_config
-- Configuration et visibilité des sections du site
-- ============================================================================
CREATE TABLE IF NOT EXISTS section_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_name TEXT UNIQUE NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  title TEXT,
  description TEXT,
  order_index INTEGER NOT NULL,
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLE: tools
-- Outils et technologies (migration de l'array hardcodé)
-- ============================================================================
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT DEFAULT 'other', -- 'frontend', 'backend', 'iot', 'design', 'other'
  icon TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLE: navigation_links
-- Liens de navigation du site
-- ============================================================================
CREATE TABLE IF NOT EXISTS navigation_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  is_external BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLE: social_links
-- Liens vers réseaux sociaux
-- ============================================================================
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL, -- 'github', 'linkedin', 'twitter', 'email'
  url TEXT NOT NULL,
  label TEXT,
  icon TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- TABLE: hero_badges
-- Badges affichés dans la section hero
-- ============================================================================
CREATE TABLE IF NOT EXISTS hero_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  emoji TEXT,
  color TEXT DEFAULT 'blue', -- 'blue', 'purple', 'orange'
  order_index INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_section_config_order ON section_config(order_index);
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_order ON tools(order_index);
CREATE INDEX IF NOT EXISTS idx_navigation_links_order ON navigation_links(order_index);
CREATE INDEX IF NOT EXISTS idx_social_links_order ON social_links(order_index);
CREATE INDEX IF NOT EXISTS idx_hero_badges_order ON hero_badges(order_index);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_badges ENABLE ROW LEVEL SECURITY;

-- site_settings policies
CREATE POLICY "Public can read site_settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert site_settings" ON site_settings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update site_settings" ON site_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete site_settings" ON site_settings
  FOR DELETE USING (auth.role() = 'authenticated');

-- section_config policies
CREATE POLICY "Public can read visible sections" ON section_config
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert sections" ON section_config
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update sections" ON section_config
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete sections" ON section_config
  FOR DELETE USING (auth.role() = 'authenticated');

-- tools policies
CREATE POLICY "Public can read visible tools" ON tools
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Authenticated users can read all tools" ON tools
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert tools" ON tools
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update tools" ON tools
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete tools" ON tools
  FOR DELETE USING (auth.role() = 'authenticated');

-- navigation_links policies
CREATE POLICY "Public can read visible nav links" ON navigation_links
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Authenticated users can read all nav links" ON navigation_links
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert nav links" ON navigation_links
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update nav links" ON navigation_links
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete nav links" ON navigation_links
  FOR DELETE USING (auth.role() = 'authenticated');

-- social_links policies
CREATE POLICY "Public can read visible social links" ON social_links
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Authenticated users can read all social links" ON social_links
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert social links" ON social_links
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update social links" ON social_links
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete social links" ON social_links
  FOR DELETE USING (auth.role() = 'authenticated');

-- hero_badges policies
CREATE POLICY "Public can read visible badges" ON hero_badges
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Authenticated users can read all badges" ON hero_badges
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert badges" ON hero_badges
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update badges" ON hero_badges
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete badges" ON hero_badges
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================================================
-- DATA MIGRATION: Insert existing hardcoded data
-- ============================================================================

-- Hero section settings
INSERT INTO site_settings (key, value, category, type, description) VALUES
('hero_greeting', '"Bonjour, je suis"', 'hero', 'text', 'Texte de salutation dans le hero'),
('hero_title', '"Nouk Prince"', 'hero', 'text', 'Nom principal affiché dans le hero'),
('hero_tagline', '"Welcome in my world"', 'hero', 'text', 'Slogan du hero'),
('hero_availability', '"Disponible"', 'hero', 'text', 'Statut de disponibilité'),
('hero_availability_color', '"green"', 'hero', 'text', 'Couleur du statut (green, orange, red)'),
('hero_stats', '{"projects": 5, "skills": 18, "years": 4}'::jsonb, 'hero', 'object', 'Statistiques affichées dans le hero'),
('hero_stats_labels', '{"years": "ans d''expérience", "projects": "projets réalisés", "skills": "compétences"}'::jsonb, 'hero', 'object', 'Labels des statistiques'),
('hero_cta_text', '"Contact"', 'hero', 'text', 'Texte du bouton CTA principal'),
('hero_cta_href', '"#contact"', 'hero', 'text', 'Lien du bouton CTA');

-- Profile settings
INSERT INTO site_settings (key, value, category, type, description) VALUES
('profile_name', '"Nouk Prince"', 'profile', 'text', 'Nom complet'),
('profile_photo', '""', 'profile', 'image', 'URL de la photo de profil'),
('profile_initials', '"NP"', 'profile', 'text', 'Initiales pour placeholder');

-- Navbar settings
INSERT INTO site_settings (key, value, category, type, description) VALUES
('navbar_logo_text', '"NP"', 'navbar', 'text', 'Texte du logo'),
('navbar_site_name', '"Nouk Prince"', 'navbar', 'text', 'Nom du site dans la navbar'),
('navbar_cta_text', '"Tous les projets"', 'navbar', 'text', 'Texte du bouton CTA'),
('navbar_cta_href', '"/projects"', 'navbar', 'text', 'Lien du bouton CTA');

-- Metadata settings
INSERT INTO site_settings (key, value, category, type, description) VALUES
('site_title', '"Nouk Prince - HQ"', 'metadata', 'text', 'Titre du site (SEO)'),
('site_description', '"Mon quartier général personnel"', 'metadata', 'text', 'Description du site (SEO)'),
('site_language', '"fr"', 'metadata', 'text', 'Langue du site');

-- Navigation links (from Navbar.tsx hardcoded data)
INSERT INTO navigation_links (label, href, order_index, is_visible, is_external) VALUES
('Accueil', '#accueil', 0, true, false),
('Objectifs', '#objectifs', 1, true, false),
('Compétences', '#competences', 2, true, false),
('Projets', '#projets', 3, true, false);

-- Social links (from HeroSection.tsx hardcoded data)
INSERT INTO social_links (platform, url, label, icon, order_index, is_visible) VALUES
('github', 'https://github.com/Princeddn', 'GitHub', 'Github', 0, true),
('linkedin', 'https://www.linkedin.com/in/prince-noukounwoui-ba1978217/', 'LinkedIn', 'Linkedin', 1, true);

-- Hero badges (from HeroSection.tsx hardcoded data)
INSERT INTO hero_badges (text, emoji, color, order_index, is_visible) VALUES
('Innovation', '💡', 'blue', 0, true),
('IoT & Energy', '⚡', 'purple', 1, true),
('Full Stack', '🚀', 'orange', 2, true);

-- Tools (from page.tsx hardcoded array - 27 tools)
INSERT INTO tools (name, category, order_index, is_visible) VALUES
-- Frontend
('React', 'frontend', 0, true),
('Next.js', 'frontend', 1, true),
('TypeScript', 'frontend', 2, true),
('JavaScript', 'frontend', 3, true),
('TailwindCSS', 'frontend', 4, true),
('HTML/CSS', 'frontend', 5, true),
-- Backend
('Node.js', 'backend', 6, true),
('Python', 'backend', 7, true),
('PostgreSQL', 'backend', 8, true),
('Supabase', 'backend', 9, true),
('REST APIs', 'backend', 10, true),
('GraphQL', 'backend', 11, true),
-- IoT & Embedded
('Arduino', 'iot', 12, true),
('ESP32', 'iot', 13, true),
('Raspberry Pi', 'iot', 14, true),
('MQTT', 'iot', 15, true),
('Modbus', 'iot', 16, true),
-- Tools & DevOps
('Git', 'other', 17, true),
('GitHub Actions', 'other', 18, true),
('Docker', 'other', 19, true),
('VS Code', 'other', 20, true),
('Figma', 'design', 21, true),
-- Energy & Automation
('Solar Energy', 'iot', 22, true),
('Smart Grids', 'iot', 23, true),
('Home Automation', 'iot', 24, true),
('Industrial IoT', 'iot', 25, true),
('Data Analytics', 'other', 26, true);

-- Section configurations
INSERT INTO section_config (section_name, is_visible, title, description, order_index, settings) VALUES
('hero', true, 'Hero', 'Section d''accueil principale', 0, '{}'::jsonb),
('goals', true, 'Mes Objectifs', 'Mes ambitions annuelles et mensuelles', 1, '{"show_yearly": true, "show_monthly": true}'::jsonb),
('skills', true, 'Mes Compétences', 'Ce que je maîtrise, ce que j''apprends, ce que je vise', 2, '{"show_acquired": true, "show_learning": true, "show_target": true}'::jsonb),
('tools', true, 'Mes Outils', 'Technologies et outils que je maîtrise au quotidien', 3, '{}'::jsonb),
('projects', true, 'Mes Projets', 'Découvrez mes réalisations et projets en cours', 4, '{"display_limit": 3}'::jsonb);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_section_config_updated_at
  BEFORE UPDATE ON section_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- Tables created: site_settings, section_config, tools, navigation_links, social_links, hero_badges
-- RLS policies applied to all tables
-- Existing hardcoded data migrated
-- Ready for Phase 1 implementation
