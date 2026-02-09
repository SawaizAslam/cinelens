import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize the API Client
// We use the key you added to the .env file
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Define the structure of our AI response
export interface MovieResult {
    title: string;
    year: number;
    description: string;
    director: string;
    cast: string;
    rating: number;
    matchScore: number;
}

// 2. The Main Function
export const identifyImage = async (base64Image: string): Promise<MovieResult | null> => {
    if (!API_KEY) {
        throw new Error("API Key is missing. Please check .env file.");
    }

    try {
        // 3. Select the Model
        // Using Gemini 3 Pro Image Preview - optimized for image/vision tasks
        const model = genAI.getGenerativeModel({ model: "gemini-3-pro-image-preview" });

        // 4. Prepare the Image
        // Remove the "data:image/jpeg;base64," prefix if present
        const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|webp);base64,/, "");

        const imagePart = {
            inlineData: {
                data: cleanBase64,
                mimeType: "image/jpeg",
            },
        };

        // 5. Construct the Prompt
        // We explicitly ask for JSON so we can parse it easily
        const prompt = `
      Analyze this image and identify if it is a movie scene.
      Return ONLY a valid JSON object with these fields:
      {
        "title": "Movie Title",
        "year": 2024,
        "description": "A brief description of the specific scene shown.",
        "director": "Director Name",
        "cast": "Main Actor 1, Main Actor 2",
        "rating": 8.5,
        "matchScore": 95
      }
      
      If it is NOT a movie scene or you cannot identify it, return null.
      Do not include markdown formatting like \`\`\`json.
    `;

        // 6. Call the API
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        console.log("Gemini Raw Response:", text);

        // 7. Parse and Return
        if (text.trim() === "null") return null;

        // Remove any accidental markdown code blocks
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            return JSON.parse(cleanJson);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            throw new Error(`Failed to parse AI response: ${text.substring(0, 50)}...`);
        }

    } catch (error: any) {
        console.error("Error identifying image:", error);
        throw new Error(error.message || "Unknown AI Error");
    }
};

// 8. Identify by Dialogue
export const identifyDialogue = async (dialogue: string): Promise<MovieResult | null> => {
    if (!API_KEY) {
        throw new Error("API Key is missing. Please check .env file.");
    }

    try {
        // Using Gemini 3 Flash Preview - fast for text-based dialogue identification
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const prompt = `
      Analyze this quote/dialogue and identify the movie it is from.
      Dialogue: "${dialogue}"
      
      Return ONLY a valid JSON object with these fields:
      {
        "title": "Movie Title",
        "year": 2024,
        "description": "Context about when this line is said in the movie.",
        "director": "Director Name",
        "cast": "Main Actor 1, Main Actor 2",
        "rating": 8.5,
        "matchScore": 95
      }
      
      If you cannot identify it, return specific JSON saying null or describing why, but prefer trying to guess if close.
      If absolutely unknown, return {"error": "Unknown Code"}. 
      Do not include markdown formatting like \`\`\`json.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Raw Dialogue Response:", text);

        if (text.trim() === "null") return null;

        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            return JSON.parse(cleanJson);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            throw new Error(`Failed to parse AI response: ${text.substring(0, 50)}...`);
        }

    } catch (error: any) {
        console.error("Error identifying dialogue:", error);
        throw new Error(error.message || "Unknown AI Error");
    }
};
