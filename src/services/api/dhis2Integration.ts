
import { supabase } from "@/integrations/supabase/client";

export interface DHIS2Config {
  id: string;
  platform: string;
  base_url: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export const fetchDHIS2Data = async (dataSetId: string) => {
  try {
    const { data: config, error: configError } = await supabase
      .from('integration_config')
      .select()
      .eq('platform', 'dhis2')
      .maybeSingle();

    if (configError) throw configError;
    if (!config) throw new Error('DHIS2 configuration not found');

    const response = await fetch(`${config.base_url}/api/dataSets/${dataSetId}`, {
      headers: {
        'Authorization': `Basic ${btoa(`${config.username}:${config.password}`)}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch DHIS2 data');

    return await response.json();
  } catch (error) {
    console.error('Error fetching DHIS2 data:', error);
    throw error;
  }
};
