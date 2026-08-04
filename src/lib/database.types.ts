export const NEWS_CATEGORY_VALUES = ["PRESS_RELEASE", "CAMPAIGN_UPDATE", "COMMUNITY", "STATEMENT", "SPEECH"] as const;
export type NewsCategory = (typeof NEWS_CATEGORY_VALUES)[number];

export const EVENT_TYPE_VALUES = ["RALLY", "TOWN_HALL", "FORUM", "SUMMIT", "CONSULTATION"] as const;
export type EventType = (typeof EVENT_TYPE_VALUES)[number];

export interface Database {
  public: {
    Tables: {
      news_articles: {
        Row: {
          id: string;
          date: string;
          title: string;
          excerpt: string;
          category: NewsCategory;
          read_min: number;
          live: boolean;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          title: string;
          excerpt: string;
          category: NewsCategory;
          read_min?: number;
          live?: boolean;
          image_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["news_articles"]["Insert"]>;
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          date: string;
          time: string;
          title: string;
          location: string;
          lga: string;
          type: EventType;
          featured: boolean;
          note: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          time: string;
          title: string;
          location: string;
          lga: string;
          type: EventType;
          featured?: boolean;
          note?: string | null;
          image_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
        Relationships: [];
      };
      policies: {
        Row: {
          id: string;
          order: number;
          title: string;
          tagline: string;
          summary: string;
          commitments: string[];
          impact: string;
          accent_color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order?: number;
          title: string;
          tagline: string;
          summary: string;
          commitments?: string[];
          impact: string;
          accent_color?: string;
        };
        Update: Partial<Database["public"]["Tables"]["policies"]["Insert"]>;
        Relationships: [];
      };
      endorsements: {
        Row: {
          id: string;
          order: number;
          quote: string;
          name: string;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order?: number;
          quote: string;
          name: string;
          role: string;
        };
        Update: Partial<Database["public"]["Tables"]["endorsements"]["Insert"]>;
        Relationships: [];
      };
      media: {
        Row: {
          id: string;
          url: string;
          label: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          url: string;
          label?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["media"]["Insert"]>;
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: number;
          candidate_full_name: string;
          known_as: string;
          hero_headline_line1: string;
          hero_headline_line2: string;
          hero_subtitle: string;
          hero_body: string;
          hero_image_url: string;
          candidate_bio: string[];
          candidate_image_url: string;
          profile_bio: string[];
          profile_image_url: string;
          contact_office_address: string;
          contact_email: string;
          contact_whatsapp: string;
          whatsapp_share_message: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]> & { id?: number };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          read?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
        };
        Update: Partial<Database["public"]["Tables"]["newsletter_subscribers"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
