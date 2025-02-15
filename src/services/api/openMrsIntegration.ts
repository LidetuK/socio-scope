
import { supabase } from "@/integrations/supabase/client";

export interface OpenMRSConfig {
  baseUrl: string;
  username: string;
  password: string;
}

export const fetchOpenMRSData = async (resourceType: string) => {
  try {
    const { data: config, error: configError } = await supabase
      .from('integration_config')
      .select('*')
      .eq('platform', 'openmrs')
      .single();

    if (configError) throw configError;

    // Implement OpenMRS API call here
    const response = await fetch(`${config.base_url}/ws/rest/v1/${resourceType}`, {
      headers: {
        'Authorization': `Basic ${btoa(`${config.username}:${config.password}`)}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch OpenMRS data');

    return await response.json();
  } catch (error) {
    console.error('Error fetching OpenMRS data:', error);
    throw error;
  }
};
