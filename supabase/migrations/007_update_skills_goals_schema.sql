-- Migration 007: Update skills and goals tables to match admin expectations
-- This adds missing columns to the existing tables

-- ============================================================================
-- UPDATE SKILLS TABLE
-- ============================================================================

-- Add missing columns to skills table
ALTER TABLE skills
  ADD COLUMN IF NOT EXISTS proficiency INTEGER DEFAULT 50 CHECK (proficiency >= 0 AND proficiency <= 100),
  ADD COLUMN IF NOT EXISTS icon TEXT,
  ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true;

-- Drop old level column and update category values if needed
ALTER TABLE skills DROP COLUMN IF EXISTS level;

-- Add index for ordering
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills(order_index);

-- ============================================================================
-- UPDATE GOALS TABLE
-- ============================================================================

-- Add missing columns to goals table
ALTER TABLE goals
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Personal',
  ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  ADD COLUMN IF NOT EXISTS target_date DATE,
  ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- IMPORTANT: Drop old constraint FIRST before updating data
ALTER TABLE goals DROP CONSTRAINT IF EXISTS goals_status_check;

-- Update status values to match new schema (todo -> not_started, done -> completed)
UPDATE goals SET status = 'not_started' WHERE status = 'todo';
UPDATE goals SET status = 'completed' WHERE status = 'done';

-- Add new status constraint AFTER updating data
ALTER TABLE goals ADD CONSTRAINT goals_status_check
  CHECK (status IN ('not_started', 'in_progress', 'completed'));

-- Drop old columns
ALTER TABLE goals DROP COLUMN IF EXISTS scope;
ALTER TABLE goals DROP COLUMN IF EXISTS year;
ALTER TABLE goals DROP COLUMN IF EXISTS month;

-- Add index for ordering
CREATE INDEX IF NOT EXISTS idx_goals_order ON goals(order_index);
CREATE INDEX IF NOT EXISTS idx_goals_status ON goals(status);
CREATE INDEX IF NOT EXISTS idx_goals_priority ON goals(priority);

-- Update timestamps
ALTER TABLE skills ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE goals ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_skills_updated_at ON skills;
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_goals_updated_at ON goals;
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
