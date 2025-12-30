-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('web', 'mobile', 'software', 'automation')),
  status TEXT NOT NULL CHECK (status IN ('idea', 'building', 'mvp', 'production', 'paused')),
  stack TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  app_url TEXT,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Table: skills
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('acquired', 'learning', 'target')),
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: goals
CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  scope TEXT NOT NULL CHECK (scope IN ('year', 'month')),
  status TEXT NOT NULL CHECK (status IN ('todo', 'in_progress', 'done')),
  year INTEGER,
  month INTEGER CHECK (month >= 1 AND month <= 12),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(type) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_skills_level ON skills(level);
CREATE INDEX IF NOT EXISTS idx_goals_scope_status ON goals(scope, status);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Policies pour lecture publique
CREATE POLICY "Public read access on projects" ON projects
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Public read access on skills" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Public read access on goals" ON goals
  FOR SELECT USING (true);

-- Note: Les policies pour INSERT, UPDATE, DELETE seront ajoutées
-- quand on configurera l'authentification admin
