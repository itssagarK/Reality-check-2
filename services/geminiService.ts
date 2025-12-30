import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { RealityCheckResponse } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

// Define the response schema using the @google/genai Type enum
const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    reality_score: {
      type: Type.INTEGER,
      description: "A score from 0 to 100 indicating feasibility.",
    },
    reality_tag: {
      type: Type.STRING,
      description: "One word classification: POSSIBLE, POSSIBLE WITH CHANGES, UNLIKELY, IMPOSSIBLE, or INSUFFICIENT INFORMATION.",
    },
    stop_signal: {
      type: Type.STRING,
      description: "A clear condition defining when to stop.",
    },
    failure_diagnosis: {
      type: Type.OBJECT,
      properties: {
        primary_reasons: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        root_cause_summary: { type: Type.STRING },
      },
      required: ["primary_reasons", "root_cause_summary"],
    },
    alternative_paths: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          path_name: { type: Type.STRING },
          description: { type: Type.STRING },
          why_it_passes_feasibility: { type: Type.STRING },
          key_tradeoffs: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["path_name", "description", "why_it_passes_feasibility", "key_tradeoffs"],
      },
    },
    common_mistakes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    likely_consequences: {
      type: Type.OBJECT,
      properties: {
        short_term: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        long_term: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: ["short_term", "long_term"],
    },
    overengineering_risk: {
      type: Type.OBJECT,
      properties: {
        risk_level: {
          type: Type.STRING,
          enum: ["low", "medium", "high"],
        },
        warning_signs: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        simplification_advice: { type: Type.STRING },
      },
      required: ["risk_level", "warning_signs", "simplification_advice"],
    },
  },
  required: [
    "reality_score",
    "reality_tag",
    "stop_signal",
    "failure_diagnosis",
    "alternative_paths",
    "common_mistakes",
    "likely_consequences",
    "overengineering_risk",
  ],
};

export const analyzePlan = async (userPlan: string): Promise<RealityCheckResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: userPlan }],
        },
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2, // Low temperature for analytical, consistent results
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from AI.");
    }

    return JSON.parse(text) as RealityCheckResponse;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};