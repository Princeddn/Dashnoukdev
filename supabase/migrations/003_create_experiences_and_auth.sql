-- Migration pour ajouter les expériences et configurer l'authentification admin

-- ============================================
-- TABLE: experiences (Expériences professionnelles)
-- ============================================

CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT NOT NULL,
  achievements TEXT[],
  technologies TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_experiences_dates ON experiences(start_date DESC, end_date DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_experiences_current ON experiences(is_current) WHERE deleted_at IS NULL;

-- Enable Row Level Security
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Policy pour lecture publique
CREATE POLICY "Public read access on experiences" ON experiences
  FOR SELECT USING (deleted_at IS NULL);

-- ============================================
-- CONFIGURATION AUTHENTIFICATION ADMIN
-- ============================================

-- Policies pour permettre aux utilisateurs authentifiés de modifier les données

-- Policies pour projects
CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Policies pour skills
CREATE POLICY "Authenticated users can insert skills" ON skills
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update skills" ON skills
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete skills" ON skills
  FOR DELETE USING (auth.role() = 'authenticated');

-- Policies pour goals
CREATE POLICY "Authenticated users can insert goals" ON goals
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update goals" ON goals
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete goals" ON goals
  FOR DELETE USING (auth.role() = 'authenticated');

-- Policies pour experiences
CREATE POLICY "Authenticated users can insert experiences" ON experiences
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update experiences" ON experiences
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete experiences" ON experiences
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- DONNÉES DE DÉMONSTRATION (Expériences)
-- ============================================

INSERT INTO experiences (company, position, location, start_date, end_date, is_current, description, achievements, technologies) VALUES
(
  'Freelance',
  'Développeur Full-Stack & Ingénieur IoT',
  'Remote',
  '2023-01-01',
  NULL,
  true,
  'Développement de solutions IoT et applications web pour divers clients. Spécialisation dans les systèmes de gestion technique du bâtiment et l''énergie.',
  ARRAY[
    'Développement de bibliothèques Python pour LoRaWAN',
    'Création d''outils de dimensionnement photovoltaïque',
    'Intégration de systèmes GTB/GTC',
    'Développement d''applications web modernes'
  ],
  ARRAY['Python', 'JavaScript', 'Next.js', 'LoRaWAN', 'Supabase', 'IoT']
),
(
  'Exemple Entreprise',
  'Ingénieur Systèmes Embarqués',
  'Paris, France',
  '2020-06-01',
  '2022-12-31',
  false,
  'Développement de systèmes embarqués pour l''IoT industriel et participation à des projets de smart building.',
  ARRAY[
    'Conception de capteurs IoT',
    'Mise en place de réseaux LoRaWAN',
    'Développement firmware Arduino',
    'Intégration de solutions domotiques'
  ],
  ARRAY['Arduino', 'C++', 'LoRaWAN', 'Zigbee', 'MQTT']
);
