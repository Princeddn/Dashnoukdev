import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type {
  HeroBadge,
  SocialLink,
  NavigationLink,
  Tool,
  SectionConfig,
  CMSResponse
} from '@/types/cms';

// ============================================================================
// HERO BADGES
// ============================================================================

export function useHeroBadges(): CMSResponse<HeroBadge[]> {
  const [data, setData] = useState<HeroBadge[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBadges = useCallback(async () => {
    try {
      setLoading(true);
      const { data: badges, error: fetchError } = await supabase
        .from('hero_badges')
        .select('*')
        .eq('is_visible', true)
        .order('order_index');

      if (fetchError) throw fetchError;
      setData(badges as HeroBadge[]);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching hero badges:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  return { data, loading, error, refetch: fetchBadges };
}

// ============================================================================
// SOCIAL LINKS
// ============================================================================

export function useSocialLinks(): CMSResponse<SocialLink[]> {
  const [data, setData] = useState<SocialLink[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      const { data: links, error: fetchError } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_visible', true)
        .order('order_index');

      if (fetchError) throw fetchError;
      setData(links as SocialLink[]);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching social links:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return { data, loading, error, refetch: fetchLinks };
}

// ============================================================================
// NAVIGATION LINKS
// ============================================================================

export function useNavigationLinks(): CMSResponse<NavigationLink[]> {
  const [data, setData] = useState<NavigationLink[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      const { data: links, error: fetchError } = await supabase
        .from('navigation_links')
        .select('*')
        .eq('is_visible', true)
        .order('order_index');

      if (fetchError) throw fetchError;
      setData(links as NavigationLink[]);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching navigation links:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return { data, loading, error, refetch: fetchLinks };
}

// ============================================================================
// TOOLS
// ============================================================================

export function useTools(visibleOnly = true): CMSResponse<Tool[]> {
  const [data, setData] = useState<Tool[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTools = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('tools')
        .select('*')
        .order('order_index');

      if (visibleOnly) {
        query = query.eq('is_visible', true);
      }

      const { data: tools, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setData(tools as Tool[]);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching tools:', err);
    } finally {
      setLoading(false);
    }
  }, [visibleOnly]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  return { data, loading, error, refetch: fetchTools };
}

// ============================================================================
// SECTION CONFIG
// ============================================================================

export function useSectionConfig(sectionName?: string): CMSResponse<SectionConfig | SectionConfig[]> {
  const [data, setData] = useState<SectionConfig | SectionConfig[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);

      if (sectionName) {
        // Fetch specific section
        const { data: config, error: fetchError } = await supabase
          .from('section_config')
          .select('*')
          .eq('section_name', sectionName)
          .single();

        if (fetchError) throw fetchError;
        setData(config as SectionConfig);
      } else {
        // Fetch all sections
        const { data: configs, error: fetchError } = await supabase
          .from('section_config')
          .select('*')
          .order('order_index');

        if (fetchError) throw fetchError;
        setData(configs as SectionConfig[]);
      }

      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching section config:', err);
    } finally {
      setLoading(false);
    }
  }, [sectionName]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return { data, loading, error, refetch: fetchConfig };
}

// ============================================================================
// VISIBLE SECTIONS (for conditional rendering)
// ============================================================================

export function useVisibleSections(): CMSResponse<SectionConfig[]> {
  const [data, setData] = useState<SectionConfig[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSections = useCallback(async () => {
    try {
      setLoading(true);
      const { data: sections, error: fetchError } = await supabase
        .from('section_config')
        .select('*')
        .eq('is_visible', true)
        .order('order_index');

      if (fetchError) throw fetchError;
      setData(sections as SectionConfig[]);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching visible sections:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  return { data, loading, error, refetch: fetchSections };
}
