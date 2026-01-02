-- Insert additional profile settings if they don't exist (with profile_ prefix)
INSERT INTO site_settings (key, value, category, type, description)
VALUES
  ('profile_name', '"Noukounwoui Prince"', 'profile', 'text', 'Full name'),
  ('profile_title', '"IOT and BMS Engineer"', 'profile', 'text', 'Professional title'),
  ('profile_bio', '"Passionate developer building amazing web experiences"', 'profile', 'text', 'Biography'),
  ('profile_email', '"noukounwouiprince@gmail.com"', 'profile', 'text', 'Email address'),
  ('profile_phone', '"0612719903"', 'profile', 'text', 'Phone number'),
  ('profile_location', '"Lyon, France"', 'profile', 'text', 'Location'),
  ('profile_avatar_url', '""', 'profile', 'text', 'Avatar URL'),
  ('profile_resume_url', '""', 'profile', 'text', 'Resume URL')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description;
