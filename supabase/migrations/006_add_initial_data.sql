-- Migration 006: Add initial data for Skills and Goals
-- This ensures the admin pages have data to display

-- Insert initial skills
INSERT INTO skills (name, category, proficiency, icon, order_index) VALUES
-- Frontend
('React', 'Frontend', 90, '⚛️', 0),
('Next.js', 'Frontend', 85, '▲', 1),
('TypeScript', 'Frontend', 80, '📘', 2),
('JavaScript', 'Frontend', 90, '🟨', 3),
('TailwindCSS', 'Frontend', 85, '🎨', 4),
('HTML/CSS', 'Frontend', 95, '🌐', 5),

-- Backend
('Node.js', 'Backend', 85, '🟢', 6),
('Python', 'Backend', 80, '🐍', 7),
('PostgreSQL', 'Backend', 75, '🐘', 8),
('Supabase', 'Backend', 80, '⚡', 9),
('REST APIs', 'Backend', 85, '🔌', 10),

-- IoT
('Arduino', 'Mobile', 90, '🔧', 11),
('ESP32', 'Mobile', 85, '📡', 12),
('Raspberry Pi', 'Mobile', 80, '🥧', 13),
('MQTT', 'Mobile', 75, '📨', 14),

-- DevOps
('Git', 'DevOps', 90, '🔀', 15),
('GitHub Actions', 'DevOps', 80, '⚙️', 16),
('Docker', 'DevOps', 75, '🐳', 17),

-- Design
('Figma', 'Design', 70, '🎨', 18)
ON CONFLICT DO NOTHING;

-- Insert initial goals
INSERT INTO goals (title, description, category, status, priority, target_date, is_visible, order_index) VALUES
('Maîtriser Next.js 15', 'Approfondir mes connaissances en Next.js 15 et App Router', 'Learning', 'in_progress', 'high', '2026-06-30', true, 0),
('Projet IoT Smart Home', 'Développer un système domotique complet avec ESP32', 'Project', 'in_progress', 'high', '2026-03-31', true, 1),
('Certification AWS', 'Obtenir la certification AWS Solutions Architect', 'Professional', 'not_started', 'medium', '2026-12-31', true, 2),
('Contribuer à l''Open Source', 'Faire 50 contributions sur des projets open source', 'Personal', 'in_progress', 'medium', '2026-12-31', true, 3),
('Apprendre Rust', 'Commencer à apprendre le langage Rust', 'Learning', 'not_started', 'low', '2026-09-30', true, 4)
ON CONFLICT DO NOTHING;

-- Update hero stats to match real project count
UPDATE site_settings
SET value = '{"projects": 6, "skills": 18, "years": 4}'::jsonb
WHERE key = 'hero_stats';
