
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pzgwavjonzjliacwdwka.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6Z3dhdmpvbnpqbGlhY3dkd2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzNTkyMDQsImV4cCI6MjA1MzkzNTIwNH0.c5of4wyeE0M60WBFRcnp7k_NLR2z_nXivL17kgV28tM";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});
