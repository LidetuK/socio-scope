import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { region, gender, ageGroup, timePeriod, data } = await req.json();

    // Format the data for the email
    const reportHtml = `
      <h1>Demographic Report</h1>
      <h2>Filters Applied:</h2>
      <ul>
        <li>Region: ${region}</li>
        <li>Gender: ${gender}</li>
        <li>Age Group: ${ageGroup}</li>
        <li>Time Period: ${timePeriod}</li>
      </ul>
      <h2>Summary:</h2>
      <p>Total Population: ${data.population?.reduce((sum: number, item: any) => sum + item.total_population, 0) || 0}</p>
      <p>Total Households: ${data.households?.length || 0}</p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Digital Census <onboarding@resend.dev>",
      to: "lidetu@godigitalafrica.com",
      subject: "Demographic Report",
      html: reportHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-report function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});