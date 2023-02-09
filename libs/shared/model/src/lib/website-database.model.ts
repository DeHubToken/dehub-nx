export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          created_at: string | null;
          moralis_provider_id: string | null;
          metadata: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          moralis_provider_id?: string | null;
          metadata?: Json | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          moralis_provider_id?: string | null;
          metadata?: Json | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
