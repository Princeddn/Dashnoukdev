import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type {
  SiteSetting,
  SettingCategory,
  CMSResponse,
  UpdateResponse,
  SettingUpdate,
  HeroData,
  ProfileInfo,
  NavbarData,
  SiteMetadata
} from '@/types/cms';

// ============================================================================
// GENERIC SITE SETTINGS HOOK
// ============================================================================

/**
 * Fetch a specific site setting by key
 */
export function useSiteSetting(key: string): CMSResponse<SiteSetting> {
  const [data, setData] = useState<SiteSetting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSetting = useCallback(async () => {
    try {
      setLoading(true);
      const { data: setting, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', key)
        .single();

      if (fetchError) throw fetchError;
      setData(setting as SiteSetting);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error(`Error fetching setting ${key}:`, err);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);

  return { data, loading, error, refetch: fetchSetting };
}

/**
 * Fetch all site settings in a category
 */
export function useSiteSettingsByCategory(category: SettingCategory): CMSResponse<SiteSetting[]> {
  const [data, setData] = useState<SiteSetting[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const { data: settings, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('category', category)
        .order('key');

      if (fetchError) throw fetchError;
      setData(settings as SiteSetting[]);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error(`Error fetching settings for category ${category}:`, err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { data, loading, error, refetch: fetchSettings };
}

/**
 * Fetch all site settings
 */
export function useAllSiteSettings(): CMSResponse<SiteSetting[]> {
  const [data, setData] = useState<SiteSetting[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const { data: settings, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .order('category, key');

      if (fetchError) throw fetchError;
      setData(settings as SiteSetting[]);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching all settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { data, loading, error, refetch: fetchSettings };
}

// ============================================================================
// UPDATE HOOKS
// ============================================================================

/**
 * Update a site setting
 */
export function useUpdateSiteSetting(): UpdateResponse {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = useCallback(async (data: { key: string; value: any }) => {
    try {
      setUpdating(true);
      const { error: updateError } = await supabase
        .from('site_settings')
        .update({ value: data.value, updated_at: new Date().toISOString() })
        .eq('key', data.key);

      if (updateError) throw updateError;
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error(`Error updating setting ${data.key}:`, err);
      throw err;
    } finally {
      setUpdating(false);
    }
  }, []);

  return { update, updating, error };
}

/**
 * Batch update multiple site settings
 */
export function useBatchUpdateSettings(): UpdateResponse {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = useCallback(async (settings: SettingUpdate[]) => {
    try {
      setUpdating(true);

      // Update each setting
      const updates = settings.map(({ key, value }) =>
        supabase
          .from('site_settings')
          .update({ value, updated_at: new Date().toISOString() })
          .eq('key', key)
      );

      const results = await Promise.all(updates);

      // Check for errors
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        throw new Error(`Failed to update ${errors.length} settings`);
      }

      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error batch updating settings:', err);
      throw err;
    } finally {
      setUpdating(false);
    }
  }, []);

  return { update, updating, error };
}

// ============================================================================
// SPECIALIZED HOOKS (TYPED DATA)
// ============================================================================

/**
 * Fetch all hero data as a typed object
 */
export function useHeroData(): CMSResponse<HeroData> {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHeroData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: settings, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('category', 'hero');

      if (fetchError) throw fetchError;

      // Transform array of settings into typed HeroData object
      const heroData: HeroData = {
        greeting: '',
        title: '',
        tagline: '',
        availability: '',
        availability_color: 'green',
        stats: { projects: 0, skills: 0, years: 0 },
        stats_labels: { years: '', projects: '', skills: '' },
        cta_text: '',
        cta_href: ''
      };

      settings?.forEach((setting: SiteSetting) => {
        switch (setting.key) {
          case 'hero_greeting':
            heroData.greeting = setting.value;
            break;
          case 'hero_title':
            heroData.title = setting.value;
            break;
          case 'hero_tagline':
            heroData.tagline = setting.value;
            break;
          case 'hero_availability':
            heroData.availability = setting.value;
            break;
          case 'hero_availability_color':
            heroData.availability_color = setting.value;
            break;
          case 'hero_stats':
            heroData.stats = setting.value;
            break;
          case 'hero_stats_labels':
            heroData.stats_labels = setting.value;
            break;
          case 'hero_cta_text':
            heroData.cta_text = setting.value;
            break;
          case 'hero_cta_href':
            heroData.cta_href = setting.value;
            break;
        }
      });

      setData(heroData);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching hero data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeroData();
  }, [fetchHeroData]);

  return { data, loading, error, refetch: fetchHeroData };
}

/**
 * Fetch profile data as a typed object
 */
export function useProfileData(): CMSResponse<ProfileInfo> {
  const [data, setData] = useState<ProfileInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: settings, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('category', 'profile');

      if (fetchError) throw fetchError;

      const profileData: ProfileInfo = {
        name: '',
        photo: '',
        initials: ''
      };

      settings?.forEach((setting: SiteSetting) => {
        switch (setting.key) {
          case 'profile_name':
            profileData.name = setting.value;
            break;
          case 'profile_photo':
            profileData.photo = setting.value;
            break;
          case 'profile_initials':
            profileData.initials = setting.value;
            break;
        }
      });

      setData(profileData);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching profile data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  return { data, loading, error, refetch: fetchProfileData };
}

/**
 * Fetch navbar data as a typed object
 */
export function useNavbarData(): CMSResponse<NavbarData> {
  const [data, setData] = useState<NavbarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNavbarData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: settings, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('category', 'navbar');

      if (fetchError) throw fetchError;

      const navbarData: NavbarData = {
        logo_text: '',
        site_name: '',
        cta_text: '',
        cta_href: ''
      };

      settings?.forEach((setting: SiteSetting) => {
        switch (setting.key) {
          case 'navbar_logo_text':
            navbarData.logo_text = setting.value;
            break;
          case 'navbar_site_name':
            navbarData.site_name = setting.value;
            break;
          case 'navbar_cta_text':
            navbarData.cta_text = setting.value;
            break;
          case 'navbar_cta_href':
            navbarData.cta_href = setting.value;
            break;
        }
      });

      setData(navbarData);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching navbar data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNavbarData();
  }, [fetchNavbarData]);

  return { data, loading, error, refetch: fetchNavbarData };
}

/**
 * Fetch site metadata as a typed object
 */
export function useSiteMetadata(): CMSResponse<SiteMetadata> {
  const [data, setData] = useState<SiteMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMetadata = useCallback(async () => {
    try {
      setLoading(true);
      const { data: settings, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('category', 'metadata');

      if (fetchError) throw fetchError;

      const metadata: SiteMetadata = {
        title: '',
        description: '',
        language: ''
      };

      settings?.forEach((setting: SiteSetting) => {
        switch (setting.key) {
          case 'site_title':
            metadata.title = setting.value;
            break;
          case 'site_description':
            metadata.description = setting.value;
            break;
          case 'site_language':
            metadata.language = setting.value;
            break;
        }
      });

      setData(metadata);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching metadata:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetadata();
  }, [fetchMetadata]);

  return { data, loading, error, refetch: fetchMetadata };
}
