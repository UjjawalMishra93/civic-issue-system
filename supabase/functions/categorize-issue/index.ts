import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

  // These should match the options in your frontend
  const DEPARTMENTS = ["Roads & Transport", "Water & Sanitation", "Electricity", "Public Health", "Law & Order", "Urban Development", "Others"];
  const CATEGORIES = ["Road Maintenance", "Waste Management", "Water Supply", "Public Safety", "Other"];

  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in Edge Function secrets.");
    }

    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    const { description, location } = await req.json();

    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    const fullPrompt = `
      Analyze the following civic issue and determine the most appropriate department and category.

      Issue Description: ${description}
      Issue Location: ${location}

      Available Departments: ${DEPARTMENTS.join(", ")}
      Available Categories: ${CATEGORIES.join(", ")}

      Respond with ONLY a valid JSON object in the format: {"department": "<best department>", "category": "<best category>"}.
      For example: {"department": "Water & Sanitation", "category": "Water Supply"}.
      Do not include any other text or markdown formatting.
    `;

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        // Adding generation config to ensure JSON output
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Gemini API request failed: ${response.statusText} - ${errorBody}`);
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      throw new Error("Invalid response structure from Gemini API.");
    }

    // The response is expected to be a JSON string, so we parse it.
    const resultJson = JSON.parse(data.candidates[0].content.parts[0].text);

    return new Response(JSON.stringify(resultJson), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in Edge Function:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
