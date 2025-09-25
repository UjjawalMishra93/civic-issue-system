import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in Edge Function secrets.");
    }

    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    const { issue, prompt } = await req.json();

    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    const fullPrompt = `
      Analyze the following civic issue and respond to the user'''s request.
      Format your response using Markdown. Use headings, bullet points, and bold text to make the analysis clear and readable.

      Issue Details:
      - Title: ${issue.title}
      - Description: ${issue.description}
      - Location: ${issue.location}
      
      User'''s Request: ${prompt}
      
      Provide a detailed and helpful analysis based on the user'''s request.
    `;

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
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
    
    const analysis = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ analysis }), {
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
