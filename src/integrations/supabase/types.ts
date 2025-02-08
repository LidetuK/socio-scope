export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agriculture: {
        Row: {
          crop_production: Json | null
          id: string
          irrigation_coverage: number | null
          land_under_cultivation: number | null
          region: string
          total_farmers: number
          updated_at: string | null
        }
        Insert: {
          crop_production?: Json | null
          id?: string
          irrigation_coverage?: number | null
          land_under_cultivation?: number | null
          region: string
          total_farmers: number
          updated_at?: string | null
        }
        Update: {
          crop_production?: Json | null
          id?: string
          irrigation_coverage?: number | null
          land_under_cultivation?: number | null
          region?: string
          total_farmers?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      api_integrations: {
        Row: {
          api_key: string
          api_url: string
          id: string
          last_sync: string | null
          system_name: string
        }
        Insert: {
          api_key: string
          api_url: string
          id?: string
          last_sync?: string | null
          system_name: string
        }
        Update: {
          api_key?: string
          api_url?: string
          id?: string
          last_sync?: string | null
          system_name?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string | null
          id: string
          record_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string | null
          id?: string
          record_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string | null
          id?: string
          record_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      demographics: {
        Row: {
          female_population: number
          household_count: number
          id: string
          literacy_rate: number | null
          male_population: number
          population: number
          poverty_rate: number | null
          region: string
          updated_at: string | null
        }
        Insert: {
          female_population: number
          household_count: number
          id?: string
          literacy_rate?: number | null
          male_population: number
          population: number
          poverty_rate?: number | null
          region: string
          updated_at?: string | null
        }
        Update: {
          female_population?: number
          household_count?: number
          id?: string
          literacy_rate?: number | null
          male_population?: number
          population?: number
          poverty_rate?: number | null
          region?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      education: {
        Row: {
          dropout_rate: number | null
          id: string
          literacy_rate: number | null
          region: string
          total_schools: number
          total_students: number
          total_teachers: number
          updated_at: string | null
        }
        Insert: {
          dropout_rate?: number | null
          id?: string
          literacy_rate?: number | null
          region: string
          total_schools: number
          total_students: number
          total_teachers: number
          updated_at?: string | null
        }
        Update: {
          dropout_rate?: number | null
          id?: string
          literacy_rate?: number | null
          region?: string
          total_schools?: number
          total_students?: number
          total_teachers?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      file_uploads: {
        Row: {
          created_at: string
          data_type: string
          error_message: string | null
          file_path: string
          file_type: string
          filename: string
          id: string
          processed_records: number | null
          status: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          data_type: string
          error_message?: string | null
          file_path: string
          file_type: string
          filename: string
          id?: string
          processed_records?: number | null
          status?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          data_type?: string
          error_message?: string | null
          file_path?: string
          file_type?: string
          filename?: string
          id?: string
          processed_records?: number | null
          status?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      health: {
        Row: {
          disease_incidence: Json | null
          id: string
          infant_mortality_rate: number | null
          life_expectancy: number | null
          region: string
          total_clinics: number
          total_doctors: number
          total_hospitals: number
          updated_at: string | null
        }
        Insert: {
          disease_incidence?: Json | null
          id?: string
          infant_mortality_rate?: number | null
          life_expectancy?: number | null
          region: string
          total_clinics: number
          total_doctors: number
          total_hospitals: number
          updated_at?: string | null
        }
        Update: {
          disease_incidence?: Json | null
          id?: string
          infant_mortality_rate?: number | null
          life_expectancy?: number | null
          region?: string
          total_clinics?: number
          total_doctors?: number
          total_hospitals?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      households: {
        Row: {
          created_at: string | null
          created_by: string | null
          district: string
          head_age: number | null
          head_employment_status: string | null
          head_gender: string | null
          household_size: number
          household_type: string
          id: string
          locality: string | null
          region: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          district: string
          head_age?: number | null
          head_employment_status?: string | null
          head_gender?: string | null
          household_size: number
          household_type: string
          id?: string
          locality?: string | null
          region: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          district?: string
          head_age?: number | null
          head_employment_status?: string | null
          head_gender?: string | null
          household_size?: number
          household_type?: string
          id?: string
          locality?: string | null
          region?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      infrastructure: {
        Row: {
          electricity_coverage: number | null
          id: string
          region: string
          total_hospitals: number
          total_roads_km: number | null
          total_schools: number
          updated_at: string | null
          water_access_rate: number | null
        }
        Insert: {
          electricity_coverage?: number | null
          id?: string
          region: string
          total_hospitals: number
          total_roads_km?: number | null
          total_schools: number
          updated_at?: string | null
          water_access_rate?: number | null
        }
        Update: {
          electricity_coverage?: number | null
          id?: string
          region?: string
          total_hospitals?: number
          total_roads_km?: number | null
          total_schools?: number
          updated_at?: string | null
          water_access_rate?: number | null
        }
        Relationships: []
      }
      labor_employment: {
        Row: {
          average_income: number | null
          employment_rate: number | null
          id: string
          industry_distribution: Json | null
          region: string
          total_workforce: number
          unemployment_rate: number | null
          updated_at: string | null
        }
        Insert: {
          average_income?: number | null
          employment_rate?: number | null
          id?: string
          industry_distribution?: Json | null
          region: string
          total_workforce: number
          unemployment_rate?: number | null
          updated_at?: string | null
        }
        Update: {
          average_income?: number | null
          employment_rate?: number | null
          id?: string
          industry_distribution?: Json | null
          region?: string
          total_workforce?: number
          unemployment_rate?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      logs: {
        Row: {
          action: string
          id: string
          record_id: string | null
          table_name: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          id?: string
          record_id?: string | null
          table_name: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          id?: string
          record_id?: string | null
          table_name?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      metadata_dataset_links: {
        Row: {
          created_at: string | null
          dataset_name: string
          id: string
          metadata_field_id: string | null
        }
        Insert: {
          created_at?: string | null
          dataset_name: string
          id?: string
          metadata_field_id?: string | null
        }
        Update: {
          created_at?: string | null
          dataset_name?: string
          id?: string
          metadata_field_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "metadata_dataset_links_metadata_field_id_fkey"
            columns: ["metadata_field_id"]
            isOneToOne: false
            referencedRelation: "metadata_fields"
            referencedColumns: ["id"]
          },
        ]
      }
      metadata_fields: {
        Row: {
          created_at: string | null
          data_type: string
          default_value: string | null
          description: string | null
          field_name: string
          id: string
          last_updated: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          data_type: string
          default_value?: string | null
          description?: string | null
          field_name: string
          id?: string
          last_updated?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          data_type?: string
          default_value?: string | null
          description?: string | null
          field_name?: string
          id?: string
          last_updated?: string | null
          status?: string | null
        }
        Relationships: []
      }
      migration_data: {
        Row: {
          created_at: string | null
          created_by: string | null
          displaced_persons_count: number | null
          id: string
          internal_migration_count: number | null
          international_migration_count: number | null
          region: string
          time_period: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          displaced_persons_count?: number | null
          id?: string
          internal_migration_count?: number | null
          international_migration_count?: number | null
          region: string
          time_period: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          displaced_persons_count?: number | null
          id?: string
          internal_migration_count?: number | null
          international_migration_count?: number | null
          region?: string
          time_period?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      population_distribution: {
        Row: {
          age_groups: Json
          created_at: string | null
          created_by: string | null
          district: string
          female_population: number
          id: string
          locality: string | null
          male_population: number
          other_population: number | null
          region: string
          total_population: number
          updated_at: string | null
        }
        Insert: {
          age_groups: Json
          created_at?: string | null
          created_by?: string | null
          district: string
          female_population: number
          id?: string
          locality?: string | null
          male_population: number
          other_population?: number | null
          region: string
          total_population: number
          updated_at?: string | null
        }
        Update: {
          age_groups?: Json
          created_at?: string | null
          created_by?: string | null
          district?: string
          female_population?: number
          id?: string
          locality?: string | null
          male_population?: number
          other_population?: number | null
          region?: string
          total_population?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      trade_economy: {
        Row: {
          gdp: number | null
          id: string
          inflation_rate: number | null
          major_exports: Json | null
          major_imports: Json | null
          region: string
          updated_at: string | null
        }
        Insert: {
          gdp?: number | null
          id?: string
          inflation_rate?: number | null
          major_exports?: Json | null
          major_imports?: Json | null
          region: string
          updated_at?: string | null
        }
        Update: {
          gdp?: number | null
          id?: string
          inflation_rate?: number | null
          major_exports?: Json | null
          major_imports?: Json | null
          region?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          password: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          password: string
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          password?: string
          role?: string
        }
        Relationships: []
      }
      vital_statistics: {
        Row: {
          birth_rate: number | null
          created_at: string | null
          created_by: string | null
          death_rate: number | null
          divorce_rate: number | null
          fertility_rate: number | null
          id: string
          infant_mortality_rate: number | null
          marriage_rate: number | null
          maternal_mortality_rate: number | null
          region: string
          time_period: string
          updated_at: string | null
        }
        Insert: {
          birth_rate?: number | null
          created_at?: string | null
          created_by?: string | null
          death_rate?: number | null
          divorce_rate?: number | null
          fertility_rate?: number | null
          id?: string
          infant_mortality_rate?: number | null
          marriage_rate?: number | null
          maternal_mortality_rate?: number | null
          region: string
          time_period: string
          updated_at?: string | null
        }
        Update: {
          birth_rate?: number | null
          created_at?: string | null
          created_by?: string | null
          death_rate?: number | null
          divorce_rate?: number | null
          fertility_rate?: number | null
          id?: string
          infant_mortality_rate?: number | null
          marriage_rate?: number | null
          maternal_mortality_rate?: number | null
          region?: string
          time_period?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: {
          uid: string
        }
        Returns: string
      }
      get_user_roles: {
        Args: {
          user_id: string
        }
        Returns: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }[]
      }
      has_role:
        | {
            Args: {
              user_id: string
              required_role: Database["public"]["Enums"]["app_role"]
            }
            Returns: boolean
          }
        | {
            Args: {
              user_id: string
              required_role: string
            }
            Returns: boolean
          }
    }
    Enums: {
      app_role: "admin" | "data_entry" | "enumerator" | "analyst"
      user_role: "admin" | "data_entry" | "enumerator" | "analyst"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
