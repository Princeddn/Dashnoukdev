// CMS Types for Nouk Prince HQ

// ============================================================================
// SITE SETTINGS
// ============================================================================

export type SettingType = 'text' | 'url' | 'image' | 'number' | 'boolean' | 'array' | 'object';
export type SettingCategory = 'hero' | 'profile' | 'navbar' | 'metadata' | 'theme';

export interface SiteSetting {
  id: string;
  key: string;
  value: any; // JSONB - can be string, number, boolean, object, array
  category: SettingCategory;
  type: SettingType;
  description: string | null;
  created_at: string;
  updated_at: string;
}

// Hero Section Data Structures
export interface HeroStats {
  projects: number;
  skills: number;
  years: number;
}

export interface HeroStatsLabels {
  years: string;
  projects: string;
  skills: string;
}

export interface HeroData {
  greeting: string;
  title: string;
  tagline: string;
  availability: string;
  availability_color: 'green' | 'orange' | 'red';
  stats: HeroStats;
  stats_labels: HeroStatsLabels;
  cta_text: string;
  cta_href: string;
}

// Profile Data
export interface ProfileInfo {
  name: string;
  photo: string;
  initials: string;
}

// Navbar Data
export interface NavbarData {
  logo_text: string;
  site_name: string;
  cta_text: string;
  cta_href: string;
}

// Metadata
export interface SiteMetadata {
  title: string;
  description: string;
  language: string;
}

// ============================================================================
// SECTION CONFIG
// ============================================================================

export type SectionName = 'hero' | 'goals' | 'skills' | 'tools' | 'projects';

export interface SectionConfig {
  id: string;
  section_name: SectionName;
  is_visible: boolean;
  title: string;
  description: string;
  order_index: number;
  settings: Record<string, any>; // JSONB - section-specific settings
  created_at: string;
  updated_at: string;
}

// Section-specific settings
export interface GoalsSettings {
  show_yearly: boolean;
  show_monthly: boolean;
}

export interface SkillsSettings {
  show_acquired: boolean;
  show_learning: boolean;
  show_target: boolean;
}

export interface ProjectsSettings {
  display_limit: number;
}

// ============================================================================
// TOOLS
// ============================================================================

export type ToolCategory = 'frontend' | 'backend' | 'iot' | 'design' | 'other';

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  icon: string | null;
  order_index: number;
  is_visible: boolean;
  created_at: string;
}

// ============================================================================
// NAVIGATION LINKS
// ============================================================================

export interface NavigationLink {
  id: string;
  label: string;
  href: string;
  order_index: number;
  is_visible: boolean;
  is_external: boolean;
  created_at: string;
}

// ============================================================================
// SOCIAL LINKS
// ============================================================================

export type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'email' | 'other';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  label: string | null;
  icon: string | null;
  order_index: number;
  is_visible: boolean;
  created_at: string;
}

// ============================================================================
// HERO BADGES
// ============================================================================

export type BadgeColor = 'blue' | 'purple' | 'orange' | 'green' | 'red';

export interface HeroBadge {
  id: string;
  text: string;
  emoji: string | null;
  color: BadgeColor;
  order_index: number;
  is_visible: boolean;
  created_at: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

// Generic response type for hooks
export interface CMSResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Update response type
export interface UpdateResponse {
  update: (data: any) => Promise<void>;
  updating: boolean;
  error: Error | null;
}

// Batch update for site settings
export interface SettingUpdate {
  key: string;
  value: any;
}
