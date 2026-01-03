-- Migration 009: Add skills from CV
-- Adds all skills from cv.json with appropriate categories

-- Delete existing skills to replace with CV skills
DELETE FROM skills;

-- Add skills from CV with proper categorization
INSERT INTO skills (name, category, proficiency, icon, order_index, is_visible) VALUES
-- Programming Languages
('JavaScript', 'Frontend', 90, '🟨', 0, true),
('Python', 'Backend', 90, '🐍', 1, true),
('VBA Excel', 'Other', 75, '📊', 2, true),

-- IoT & Communication
('ZigBee', 'Mobile', 95, '📡', 3, true),
('LoRa', 'Mobile', 90, '📻', 4, true),
('LoRaWAN', 'Mobile', 95, '🛰️', 5, true),
('KNX', 'Mobile', 85, '🏠', 6, true),
('MQTT', 'Mobile', 85, '📨', 7, true),

-- Building & Energy Management
('GTB/GTC', 'Other', 90, '🏢', 8, true),
('Analyse de données IoT', 'Backend', 85, '📊', 9, true),
('Maintenance photovoltaïque', 'Other', 80, '☀️', 10, true),

-- Electrical & Electronics
('Électrotechnique', 'Other', 90, '⚡', 11, true),

-- GIS & Mapping
('QGIS / ArcGIS', 'Other', 80, '🗺️', 12, true),
('GlobalMapper', 'Other', 75, '🌍', 13, true),

-- CAD & Design
('Autocad', 'Design', 70, '📐', 14, true),
('ArchiCAD', 'Design', 70, '🏗️', 15, true),

-- Energy Software
('PVSYST', 'Other', 80, '☀️', 16, true),
('Comsol', 'Other', 70, '🔬', 17, true),
('MatLab', 'Other', 75, '📈', 18, true)
ON CONFLICT DO NOTHING;
