-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view public files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Policy: Allow anyone to upload files (for personal CMS)
CREATE POLICY "Public upload media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media');

-- Policy: Allow anyone to update files
CREATE POLICY "Public update media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'media');

-- Policy: Allow anyone to delete files
CREATE POLICY "Public delete media"
ON storage.objects FOR DELETE
USING (bucket_id = 'media');

-- Insert default profile settings if they don't exist
INSERT INTO site_settings (key, value, category, type, description)
VALUES
  ('name', 'Nouk Prince', 'profile', 'text', 'Full name'),
  ('title', 'Software Engineer', 'profile', 'text', 'Professional title'),
  ('bio', 'Passionate developer building amazing web experiences', 'profile', 'text', 'Biography'),
  ('email', 'prince@example.com', 'profile', 'text', 'Email address'),
  ('phone', '', 'profile', 'text', 'Phone number'),
  ('location', 'Paris, France', 'profile', 'text', 'Location'),
  ('avatar_url', '', 'profile', 'text', 'Avatar URL'),
  ('resume_url', '', 'profile', 'text', 'Resume URL')
ON CONFLICT (key) DO NOTHING;
