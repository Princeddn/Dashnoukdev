-- Insertion des données réelles du portfolio de Prince Noukounwoui
-- Ce fichier contient toutes les données de votre portfolio

-- ============================================
-- INSERTION DES PROJETS
-- ============================================

INSERT INTO projects (name, type, status, stack, github_url, app_url, description) VALUES
(
  'LoRaWAN Plug and Play',
  'software',
  'production',
  ARRAY['Python', 'LoRaWAN', 'Chirpstack', 'IoT', 'Linux', 'Cloud', 'SSH'],
  'https://princeddn.github.io/chirp-api/',
  'https://princeddn.github.io/chirp-api/',
  'Bibliothèque Python pour décoder les trames LoRaWAN. Extraction automatique des informations des capteurs (fabricant, modèle, données mesurées) et reconnaissance des capteurs par analyse des trames.'
),
(
  'Mini station météo Arduino',
  'automation',
  'production',
  ARRAY['Arduino', 'IoT', 'Capteurs', 'LCD', 'C++'],
  NULL,
  NULL,
  'Mini station météo avec Arduino, intégrant des capteurs pour mesurer la vitesse du vent (anémomètre) et les précipitations (pluviomètre). Affichage en temps réel sur écran LCD.'
),
(
  'Logiciel dimensionnement photovoltaïque',
  'software',
  'building',
  ARRAY['Python', 'Interface graphique', 'Énergie', 'Photovoltaïque'],
  'https://github.com/prince-noukounwoui/pv-dimensioning-tool',
  'https://pv-tool-docs.readthedocs.io',
  'Logiciel complet pour le dimensionnement des systèmes photovoltaïques. Calcul de la taille optimale des installations solaires en fonction des besoins énergétiques, de l''irradiation solaire et des contraintes techniques.'
),
(
  'Progiciel dimensionnement réseau BT',
  'software',
  'production',
  ARRAY['VBA Excel', 'Électrique', 'Interface graphique', 'Dimensionnement'],
  NULL,
  NULL,
  'Logiciel pour le dimensionnement des réseaux électriques basse tension. Calcul des sections de câbles, chutes de tension et dimensionnement des équipements de protection.'
),
(
  'Dashnouk Dev',
  'web',
  'building',
  ARRAY['Next.js', 'Supabase', 'TypeScript', 'TailwindCSS'],
  'https://github.com/Princeddn/Dashnoukdev',
  NULL,
  'Mon quartier général personnel - Dashboard et lanceur de projets avec IA. Centralise mes projets, compétences et objectifs professionnels.'
);

-- ============================================
-- INSERTION DES COMPÉTENCES
-- ============================================

-- Compétences acquises
INSERT INTO skills (name, level, category) VALUES
('Python', 'acquired', 'Développement'),
('JavaScript', 'acquired', 'Développement'),
('LoRaWAN', 'acquired', 'IoT'),
('Zigbee', 'acquired', 'IoT'),
('GTB/GTC', 'acquired', 'Bâtiment'),
('Analyse de données IoT', 'acquired', 'IoT'),
('Maintenance photovoltaïque', 'acquired', 'Énergie'),
('Électrotechnique', 'acquired', 'Électrique'),
('QGIS / ArcGIS', 'acquired', 'Cartographie'),
('Arduino', 'acquired', 'IoT');

-- Compétences en apprentissage
INSERT INTO skills (name, level, category) VALUES
('KNX', 'learning', 'Bâtiment'),
('Next.js', 'learning', 'Développement'),
('TypeScript', 'learning', 'Développement'),
('Cloud Computing', 'learning', 'Infrastructure'),
('Jeedom', 'learning', 'Domotique');

-- Compétences à acquérir
INSERT INTO skills (name, level, category) VALUES
('Machine Learning', 'target', 'IA'),
('Kubernetes', 'target', 'Infrastructure'),
('React Native', 'target', 'Mobile');

-- ============================================
-- INSERTION DES OBJECTIFS
-- ============================================

-- Objectifs annuels 2025
INSERT INTO goals (title, scope, status, year, month) VALUES
('Valider mon Master 2 IDBCI', 'year', 'in_progress', 2025, NULL),
('Maîtriser KNX sur Jeedom', 'year', 'in_progress', 2025, NULL),
('Finaliser le logiciel de dimensionnement PV', 'year', 'in_progress', 2025, NULL),
('Contribuer à 3 projets open-source IoT', 'year', 'todo', 2025, NULL);

-- Objectifs annuels 2026
INSERT INTO goals (title, scope, status, year, month) VALUES
('Obtenir une certification KNX', 'year', 'todo', 2026, NULL),
('Créer une startup dans l''IoT/Smart Building', 'year', 'todo', 2026, NULL);

-- Objectifs mensuels - Décembre 2025
INSERT INTO goals (title, scope, status, year, month) VALUES
('Terminer Dashnouk Dev', 'month', 'in_progress', 2025, 12),
('Créer 5 dashboards énergétiques pour Jeedom', 'month', 'in_progress', 2025, 12);

-- Objectifs mensuels - Janvier 2026
INSERT INTO goals (title, scope, status, year, month) VALUES
('Apprendre les bases du Machine Learning', 'month', 'todo', 2026, 1),
('Rédiger mon mémoire de Master', 'month', 'todo', 2026, 1);
