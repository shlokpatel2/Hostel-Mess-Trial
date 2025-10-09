import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'student' | 'committee';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role: 'student' | 'committee';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'student' | 'committee';
          created_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          day: string;
          breakfast: string[];
          lunch: string[];
          snacks: string[];
          dinner: string[];
          updated_at: string;
        };
        Insert: {
          id?: string;
          day: string;
          breakfast: string[];
          lunch: string[];
          snacks: string[];
          dinner: string[];
          updated_at?: string;
        };
        Update: {
          id?: string;
          day?: string;
          breakfast?: string[];
          lunch?: string[];
          snacks?: string[];
          dinner?: string[];
          updated_at?: string;
        };
      };
      workers: {
        Row: {
          id: string;
          name: string;
          photo: string;
          upi_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          photo: string;
          upi_id: string;
          role: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          photo?: string;
          upi_id?: string;
          role?: string;
          created_at?: string;
        };
      };
      complaints: {
        Row: {
          id: string;
          student_id: string;
          student_name: string;
          category: string;
          description: string;
          image_url: string | null;
          status: 'pending' | 'resolved';
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          student_name: string;
          category: string;
          description: string;
          image_url?: string | null;
          status?: 'pending' | 'resolved';
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          student_name?: string;
          category?: string;
          description?: string;
          image_url?: string | null;
          status?: 'pending' | 'resolved';
          created_at?: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          priority: 'low' | 'medium' | 'high';
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          priority: 'low' | 'medium' | 'high';
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          priority?: 'low' | 'medium' | 'high';
          created_at?: string;
        };
      };
    };
  };
}