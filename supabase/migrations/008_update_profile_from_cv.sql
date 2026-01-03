-- Migration 008: Update profile with CV data and add portfolio link
-- Uses data from cv.json to populate complete profile

-- Update profile settings with real CV data
UPDATE site_settings SET value = '"Prince Noukounwoui"' WHERE key = 'profile_name';
UPDATE site_settings SET value = '"Étudiant en Master 2 Ingénierie Durable des Bâtiments Communicants Intelligents"' WHERE key = 'profile_title';
UPDATE site_settings SET value = '"Actuellement en alternance chez JEEDOM, je travaille sur l''intégration de solutions Smarthome, Smartbuilding et Smartcity, en mettant l''accent sur les technologies Zigbee et LoRaWAN. Mes tâches incluent le choix et les tests de produits, la création de dashboards énergétiques, ainsi que le support d''installations GTB."' WHERE key = 'profile_bio';
UPDATE site_settings SET value = '"noukounwouiprince@gmail.com"' WHERE key = 'profile_email';
UPDATE site_settings SET value = '"0612719903"' WHERE key = 'profile_phone';
UPDATE site_settings SET value = '"Lyon, Auvergne-Rhône-Alpes, France"' WHERE key = 'profile_location';

-- Add portfolio URL to profile settings
INSERT INTO site_settings (key, value, category, type, description)
VALUES ('profile_portfolio_url', '"https://princeddn.github.io/myportfolio/"', 'profile', 'text', 'Portfolio URL')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Update hero data with CV info
UPDATE site_settings SET value = '"Salut, je suis"' WHERE key = 'hero_greeting';
UPDATE site_settings SET value = '"Prince Noukounwoui"' WHERE key = 'hero_title';
UPDATE site_settings SET value = '"Ingénieur IoT & Bâtiments Intelligents | Smarthome • Smartbuilding • Smartcity"' WHERE key = 'hero_tagline';
UPDATE site_settings SET value = '"Disponible pour des projets"' WHERE key = 'hero_availability';
UPDATE site_settings SET value = '"green"' WHERE key = 'hero_availability_color';

-- Update social links with LinkedIn from CV
UPDATE social_links SET url = 'https://www.linkedin.com/in/prince-noukounwoui-ba1978217'
WHERE platform = 'linkedin';

-- Add portfolio link to social links if not exists
INSERT INTO social_links (platform, url, label, icon, order_index, is_visible)
VALUES ('portfolio', 'https://princeddn.github.io/myportfolio/', 'Portfolio', 'ExternalLink', 2, true)
ON CONFLICT DO NOTHING;

-- Update navbar CTA to point to portfolio
UPDATE site_settings SET value = '"Voir mon portfolio"' WHERE key = 'navbar_cta_text';
UPDATE site_settings SET value = '"https://princeddn.github.io/myportfolio/"' WHERE key = 'navbar_cta_href';
