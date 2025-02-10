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
      agriculture_summary: {
        Row: {
          created_at: string
          created_by: string | null
          crop_production: Json
          id: string
          irrigation_coverage: number
          land_under_cultivation: number
          total_farmers: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          crop_production?: Json
          id?: string
          irrigation_coverage?: number
          land_under_cultivation?: number
          total_farmers?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          crop_production?: Json
          id?: string
          irrigation_coverage?: number
          land_under_cultivation?: number
          total_farmers?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agriculture_summary_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      data_entries: {
        Row: {
          category: Database["public"]["Enums"]["data_category"]
          created_at: string
          created_by: string
          entry_type: string
          id: string
        }
        Insert: {
          category: Database["public"]["Enums"]["data_category"]
          created_at?: string
          created_by: string
          entry_type: string
          id?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["data_category"]
          created_at?: string
          created_by?: string
          entry_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_entries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      demographics_summary: {
        Row: {
          created_at: string
          created_by: string | null
          female_population: number
          household_count: number
          id: string
          literacy_rate: number
          male_population: number
          population: number
          poverty_rate: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          female_population?: number
          household_count?: number
          id?: string
          literacy_rate?: number
          male_population?: number
          population?: number
          poverty_rate?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          female_population?: number
          household_count?: number
          id?: string
          literacy_rate?: number
          male_population?: number
          population?: number
          poverty_rate?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "demographics_summary_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      districts: {
        Row: {
          created_at: string
          id: string
          name: string
          region_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          region_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          region_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "districts_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      education_enrollment: {
        Row: {
          attendance_rate: number
          created_at: string
          created_by: string
          district_id: string
          dropout_rate: number
          education_level: Database["public"]["Enums"]["education_level"]
          female_enrollment: number
          id: string
          male_enrollment: number
          region_id: string
          updated_at: string
        }
        Insert: {
          attendance_rate: number
          created_at?: string
          created_by: string
          district_id: string
          dropout_rate: number
          education_level: Database["public"]["Enums"]["education_level"]
          female_enrollment: number
          id?: string
          male_enrollment: number
          region_id: string
          updated_at?: string
        }
        Update: {
          attendance_rate?: number
          created_at?: string
          created_by?: string
          district_id?: string
          dropout_rate?: number
          education_level?: Database["public"]["Enums"]["education_level"]
          female_enrollment?: number
          id?: string
          male_enrollment?: number
          region_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_enrollment_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_enrollment_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_enrollment_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      education_infrastructure: {
        Row: {
          classroom_count: number
          created_at: string
          created_by: string
          district_id: string
          has_electricity: boolean
          has_internet: boolean
          id: string
          region_id: string
          school_type: Database["public"]["Enums"]["school_type"]
          toilet_count: number
          updated_at: string
        }
        Insert: {
          classroom_count: number
          created_at?: string
          created_by: string
          district_id: string
          has_electricity: boolean
          has_internet: boolean
          id?: string
          region_id: string
          school_type: Database["public"]["Enums"]["school_type"]
          toilet_count: number
          updated_at?: string
        }
        Update: {
          classroom_count?: number
          created_at?: string
          created_by?: string
          district_id?: string
          has_electricity?: boolean
          has_internet?: boolean
          id?: string
          region_id?: string
          school_type?: Database["public"]["Enums"]["school_type"]
          toilet_count?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_infrastructure_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_infrastructure_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_infrastructure_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      education_summary: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          literacy_rate: number
          total_schools: number
          total_students: number
          total_teachers: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          literacy_rate?: number
          total_schools?: number
          total_students?: number
          total_teachers?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          literacy_rate?: number
          total_schools?: number
          total_students?: number
          total_teachers?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_summary_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      file_uploads: {
        Row: {
          created_at: string
          data_type: string
          file_path: string
          file_type: string
          filename: string
          id: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          data_type: string
          file_path: string
          file_type: string
          filename: string
          id?: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          data_type?: string
          file_path?: string
          file_type?: string
          filename?: string
          id?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "file_uploads_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      health_facilities: {
        Row: {
          bed_count: number
          created_at: string
          created_by: string
          district_id: string
          facility_type: Database["public"]["Enums"]["facility_type"]
          has_icu: boolean
          has_maternity_ward: boolean
          has_surgery: boolean
          id: string
          region_id: string
          updated_at: string
        }
        Insert: {
          bed_count: number
          created_at?: string
          created_by: string
          district_id: string
          facility_type: Database["public"]["Enums"]["facility_type"]
          has_icu: boolean
          has_maternity_ward: boolean
          has_surgery: boolean
          id?: string
          region_id: string
          updated_at?: string
        }
        Update: {
          bed_count?: number
          created_at?: string
          created_by?: string
          district_id?: string
          facility_type?: Database["public"]["Enums"]["facility_type"]
          has_icu?: boolean
          has_maternity_ward?: boolean
          has_surgery?: boolean
          id?: string
          region_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_facilities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "health_facilities_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "health_facilities_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      health_summary: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          life_expectancy: number
          total_clinics: number
          total_doctors: number
          total_hospitals: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          life_expectancy?: number
          total_clinics?: number
          total_doctors?: number
          total_hospitals?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          life_expectancy?: number
          total_clinics?: number
          total_doctors?: number
          total_hospitals?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_summary_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      healthcare_workforce: {
        Row: {
          community_workers_count: number
          created_at: string
          created_by: string
          district_id: string
          doctors_count: number
          id: string
          midwives_count: number
          nurses_count: number
          region_id: string
          updated_at: string
        }
        Insert: {
          community_workers_count: number
          created_at?: string
          created_by: string
          district_id: string
          doctors_count: number
          id?: string
          midwives_count: number
          nurses_count: number
          region_id: string
          updated_at?: string
        }
        Update: {
          community_workers_count?: number
          created_at?: string
          created_by?: string
          district_id?: string
          doctors_count?: number
          id?: string
          midwives_count?: number
          nurses_count?: number
          region_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "healthcare_workforce_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "healthcare_workforce_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "healthcare_workforce_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      household_data: {
        Row: {
          created_at: string
          created_by: string
          district_id: string
          head_age: number
          head_employed: boolean
          head_gender: string
          head_literacy: boolean
          household_size: number
          household_type: Database["public"]["Enums"]["household_type"]
          id: string
          region_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          district_id: string
          head_age: number
          head_employed: boolean
          head_gender: string
          head_literacy: boolean
          household_size: number
          household_type: Database["public"]["Enums"]["household_type"]
          id?: string
          region_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          district_id?: string
          head_age?: number
          head_employed?: boolean
          head_gender?: string
          head_literacy?: boolean
          household_size?: number
          household_type?: Database["public"]["Enums"]["household_type"]
          id?: string
          region_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "household_data_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "household_data_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "household_data_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      infrastructure_data: {
        Row: {
          created_at: string
          created_by: string
          district_id: string
          id: string
          public_transport_coverage: number
          region_id: string
          road_length_km: number
          road_type: Database["public"]["Enums"]["road_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          district_id: string
          id?: string
          public_transport_coverage: number
          region_id: string
          road_length_km: number
          road_type: Database["public"]["Enums"]["road_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          district_id?: string
          id?: string
          public_transport_coverage?: number
          region_id?: string
          road_length_km?: number
          road_type?: Database["public"]["Enums"]["road_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "infrastructure_data_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "infrastructure_data_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "infrastructure_data_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      infrastructure_summary: {
        Row: {
          created_at: string
          created_by: string | null
          electricity_coverage: number
          id: string
          total_hospitals: number
          total_roads_km: number
          total_schools: number
          updated_at: string
          water_access_rate: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          electricity_coverage?: number
          id?: string
          total_hospitals?: number
          total_roads_km?: number
          total_schools?: number
          updated_at?: string
          water_access_rate?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          electricity_coverage?: number
          id?: string
          total_hospitals?: number
          total_roads_km?: number
          total_schools?: number
          updated_at?: string
          water_access_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "infrastructure_summary_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      labor_employment_summary: {
        Row: {
          average_income: number
          created_at: string
          created_by: string | null
          employment_rate: number
          id: string
          industry_distribution: Json
          total_workforce: number
          unemployment_rate: number
          updated_at: string
        }
        Insert: {
          average_income?: number
          created_at?: string
          created_by?: string | null
          employment_rate?: number
          id?: string
          industry_distribution?: Json
          total_workforce?: number
          unemployment_rate?: number
          updated_at?: string
        }
        Update: {
          average_income?: number
          created_at?: string
          created_by?: string | null
          employment_rate?: number
          id?: string
          industry_distribution?: Json
          total_workforce?: number
          unemployment_rate?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "labor_employment_summary_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      livestock_statistics: {
        Row: {
          cattle_count: number
          created_at: string
          created_by: string
          district_id: string
          goat_count: number
          id: string
          meat_production: number
          milk_yield: number
          poultry_count: number
          region_id: string
          sheep_count: number
          updated_at: string
        }
        Insert: {
          cattle_count: number
          created_at?: string
          created_by: string
          district_id: string
          goat_count: number
          id?: string
          meat_production: number
          milk_yield: number
          poultry_count: number
          region_id: string
          sheep_count: number
          updated_at?: string
        }
        Update: {
          cattle_count?: number
          created_at?: string
          created_by?: string
          district_id?: string
          goat_count?: number
          id?: string
          meat_production?: number
          milk_yield?: number
          poultry_count?: number
          region_id?: string
          sheep_count?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "livestock_statistics_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "livestock_statistics_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "livestock_statistics_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      maternal_child_health: {
        Row: {
          antenatal_care_coverage: number
          created_at: string
          created_by: string
          district_id: string
          id: string
          neonatal_mortality: number
          region_id: string
          skilled_birth_attendance: number
          stunting_rate: number
          under_five_mortality: number
          underweight_rate: number
          updated_at: string
          wasting_rate: number
        }
        Insert: {
          antenatal_care_coverage: number
          created_at?: string
          created_by: string
          district_id: string
          id?: string
          neonatal_mortality: number
          region_id: string
          skilled_birth_attendance: number
          stunting_rate: number
          under_five_mortality: number
          underweight_rate: number
          updated_at?: string
          wasting_rate: number
        }
        Update: {
          antenatal_care_coverage?: number
          created_at?: string
          created_by?: string
          district_id?: string
          id?: string
          neonatal_mortality?: number
          region_id?: string
          skilled_birth_attendance?: number
          stunting_rate?: number
          under_five_mortality?: number
          underweight_rate?: number
          updated_at?: string
          wasting_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "maternal_child_health_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maternal_child_health_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maternal_child_health_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      metadata_dataset_links: {
        Row: {
          created_at: string
          dataset_name: string
          id: string
          metadata_field_id: string | null
        }
        Insert: {
          created_at?: string
          dataset_name: string
          id?: string
          metadata_field_id?: string | null
        }
        Update: {
          created_at?: string
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
          created_at: string
          data_type: string
          default_value: string | null
          description: string | null
          field_name: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_type: string
          default_value?: string | null
          description?: string | null
          field_name: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_type?: string
          default_value?: string | null
          description?: string | null
          field_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      migration_data: {
        Row: {
          created_at: string
          created_by: string
          district_id: string
          emigration: number
          id: string
          idp_count: number
          immigration: number
          refugee_count: number
          region_id: string
          rural_to_urban: number
          updated_at: string
          urban_to_rural: number
        }
        Insert: {
          created_at?: string
          created_by: string
          district_id: string
          emigration: number
          id?: string
          idp_count: number
          immigration: number
          refugee_count: number
          region_id: string
          rural_to_urban: number
          updated_at?: string
          urban_to_rural: number
        }
        Update: {
          created_at?: string
          created_by?: string
          district_id?: string
          emigration?: number
          id?: string
          idp_count?: number
          immigration?: number
          refugee_count?: number
          region_id?: string
          rural_to_urban?: number
          updated_at?: string
          urban_to_rural?: number
        }
        Relationships: [
          {
            foreignKeyName: "migration_data_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "migration_data_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "migration_data_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      population_data: {
        Row: {
          age_0_4_years: number
          age_5_9_years: number
          created_at: string
          created_by: string
          district_id: string
          female_count: number
          id: string
          male_count: number
          other_count: number
          region_id: string
          total_population: number
          updated_at: string
        }
        Insert: {
          age_0_4_years: number
          age_5_9_years: number
          created_at?: string
          created_by: string
          district_id: string
          female_count: number
          id?: string
          male_count: number
          other_count: number
          region_id: string
          total_population: number
          updated_at?: string
        }
        Update: {
          age_0_4_years?: number
          age_5_9_years?: number
          created_at?: string
          created_by?: string
          district_id?: string
          female_count?: number
          id?: string
          male_count?: number
          other_count?: number
          region_id?: string
          total_population?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "population_data_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "population_data_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "population_data_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      trade_economy_summary: {
        Row: {
          created_at: string
          created_by: string | null
          gdp: number
          id: string
          inflation_rate: number
          major_exports: Json
          major_imports: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          gdp?: number
          id?: string
          inflation_rate?: number
          major_exports?: Json
          major_imports?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          gdp?: number
          id?: string
          inflation_rate?: number
          major_exports?: Json
          major_imports?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trade_economy_summary_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vital_statistics: {
        Row: {
          birth_rate: number
          created_at: string
          created_by: string
          death_rate: number
          district_id: string
          divorce_rate: number
          fertility_rate: number
          id: string
          infant_mortality_rate: number
          marriage_rate: number
          maternal_mortality_rate: number
          region_id: string
          updated_at: string
        }
        Insert: {
          birth_rate: number
          created_at?: string
          created_by: string
          death_rate: number
          district_id: string
          divorce_rate: number
          fertility_rate: number
          id?: string
          infant_mortality_rate: number
          marriage_rate: number
          maternal_mortality_rate: number
          region_id: string
          updated_at?: string
        }
        Update: {
          birth_rate?: number
          created_at?: string
          created_by?: string
          death_rate?: number
          district_id?: string
          divorce_rate?: number
          fertility_rate?: number
          id?: string
          infant_mortality_rate?: number
          marriage_rate?: number
          maternal_mortality_rate?: number
          region_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vital_statistics_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vital_statistics_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vital_statistics_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      wage_statistics: {
        Row: {
          average_wage: number
          created_at: string
          created_by: string
          district_id: string
          gender_pay_gap: number
          id: string
          occupation: string
          region_id: string
          updated_at: string
        }
        Insert: {
          average_wage: number
          created_at?: string
          created_by: string
          district_id: string
          gender_pay_gap: number
          id?: string
          occupation: string
          region_id: string
          updated_at?: string
        }
        Update: {
          average_wage?: number
          created_at?: string
          created_by?: string
          district_id?: string
          gender_pay_gap?: number
          id?: string
          occupation?: string
          region_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "wage_statistics_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wage_statistics_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wage_statistics_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      workforce_statistics: {
        Row: {
          created_at: string
          created_by: string
          district_id: string
          female_participation_rate: number
          id: string
          male_participation_rate: number
          region_id: string
          sector: Database["public"]["Enums"]["employment_sector"]
          updated_at: string
          youth_employment_rate: number
          youth_unemployment_rate: number
        }
        Insert: {
          created_at?: string
          created_by: string
          district_id: string
          female_participation_rate: number
          id?: string
          male_participation_rate: number
          region_id: string
          sector: Database["public"]["Enums"]["employment_sector"]
          updated_at?: string
          youth_employment_rate: number
          youth_unemployment_rate: number
        }
        Update: {
          created_at?: string
          created_by?: string
          district_id?: string
          female_participation_rate?: number
          id?: string
          male_participation_rate?: number
          region_id?: string
          sector?: Database["public"]["Enums"]["employment_sector"]
          updated_at?: string
          youth_employment_rate?: number
          youth_unemployment_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "workforce_statistics_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workforce_statistics_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workforce_statistics_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      households: {
        Row: {
          created_at: string | null
          created_by: string | null
          district_id: string | null
          head_age: number | null
          head_employed: boolean | null
          head_gender: string | null
          head_literacy: boolean | null
          household_size: number | null
          household_type: Database["public"]["Enums"]["household_type"] | null
          id: string | null
          region_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          district_id?: string | null
          head_age?: number | null
          head_employed?: boolean | null
          head_gender?: string | null
          head_literacy?: boolean | null
          household_size?: number | null
          household_type?: Database["public"]["Enums"]["household_type"] | null
          id?: string | null
          region_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          district_id?: string | null
          head_age?: number | null
          head_employed?: boolean | null
          head_gender?: string | null
          head_literacy?: boolean | null
          household_size?: number | null
          household_type?: Database["public"]["Enums"]["household_type"] | null
          id?: string | null
          region_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "household_data_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "household_data_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "household_data_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      population_distribution: {
        Row: {
          age_0_4_years: number | null
          age_5_9_years: number | null
          age_groups: Json | null
          created_at: string | null
          created_by: string | null
          district_id: string | null
          female_count: number | null
          id: string | null
          male_count: number | null
          other_count: number | null
          region_id: string | null
          total_population: number | null
          updated_at: string | null
        }
        Insert: {
          age_0_4_years?: number | null
          age_5_9_years?: number | null
          age_groups?: never
          created_at?: string | null
          created_by?: string | null
          district_id?: string | null
          female_count?: number | null
          id?: string | null
          male_count?: number | null
          other_count?: number | null
          region_id?: string | null
          total_population?: number | null
          updated_at?: string | null
        }
        Update: {
          age_0_4_years?: number | null
          age_5_9_years?: number | null
          age_groups?: never
          created_at?: string | null
          created_by?: string | null
          district_id?: string | null
          female_count?: number | null
          id?: string | null
          male_count?: number | null
          other_count?: number | null
          region_id?: string | null
          total_population?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "population_data_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "population_data_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "population_data_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string | null
          role: Database["public"]["Enums"]["app_role"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_user_role: {
        Args: {
          uid: string
        }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_user_roles: {
        Args: {
          user_id?: string
        }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      has_role:
        | {
            Args: {
              _role: Database["public"]["Enums"]["app_role"]
              _user_id?: string
            }
            Returns: boolean
          }
        | {
            Args: {
              _user_id: string
              _role: Database["public"]["Enums"]["app_role"]
            }
            Returns: boolean
          }
    }
    Enums: {
      app_role: "admin" | "statistician" | "data_entry_officer" | "policy_maker"
      data_category:
        | "demographic"
        | "health"
        | "education"
        | "labor_and_employment"
        | "agriculture"
        | "trade_and_economy"
        | "infrastructure"
      education_level: "primary" | "secondary" | "tertiary"
      employment_sector: "formal" | "informal"
      facility_type: "hospital" | "clinic" | "mobile_unit"
      household_type: "single_family" | "multi_family"
      road_type: "paved" | "unpaved"
      school_type: "public" | "private" | "community_based"
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
