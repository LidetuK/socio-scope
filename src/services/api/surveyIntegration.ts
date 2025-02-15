
import { supabase } from "@/integrations/supabase/client";

export interface SurveySolutionsConfig {
  id: string;
  platform: string;
  base_url: string;
  api_key: string;
  workspace_id: string;
  created_at: string;
  updated_at: string;
}

export const fetchSurveySolutionsData = async (surveyId: string) => {
  try {
    const { data: config, error: configError } = await supabase
      .from('integration_config')
      .select()
      .eq('platform', 'survey_solutions')
      .maybeSingle();

    if (configError) throw configError;
    if (!config) throw new Error('Survey Solutions configuration not found');

    const response = await fetch(`${config.base_url}/api/v1/surveys/${surveyId}`, {
      headers: {
        'Authorization': `Bearer ${config.api_key}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to fetch survey data');

    return await response.json();
  } catch (error) {
    console.error('Error fetching survey data:', error);
    throw error;
  }
};
