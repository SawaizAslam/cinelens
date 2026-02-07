const API_KEY = "AIzaSyBCUTm4Zp_alKIMded6xUQOCWVtp_J6umc";

async function listModels() {
    try {
        console.log("Fetching available models...\n");

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Available Models:");
        console.log("=".repeat(80));

        if (data.models && data.models.length > 0) {
            data.models.forEach(model => {
                console.log(`\nModel: ${model.name}`);
                console.log(`Display Name: ${model.displayName || "N/A"}`);
                console.log(`Description: ${model.description || "N/A"}`);
                console.log(`Supported Methods: ${model.supportedGenerationMethods?.join(", ") || "N/A"}`);
                console.log(`Version: ${model.version || "N/A"}`);
                console.log("-".repeat(80));
            });

            console.log(`\n\nTotal Models: ${data.models.length}`);

            // Filter for Gemini 3 models
            const gemini3Models = data.models.filter(m =>
                m.name.toLowerCase().includes('gemini-3') ||
                m.displayName?.toLowerCase().includes('gemini 3')
            );

            if (gemini3Models.length > 0) {
                console.log("\n🎯 GEMINI 3 MODELS FOUND:");
                gemini3Models.forEach(m => console.log(`  - ${m.name}`));
            } else {
                console.log("\n⚠️  No Gemini 3 models found in the list.");
            }
        } else {
            console.log("No models found.");
        }
    } catch (error) {
        console.error("Error listing models:", error.message);
    }
}

listModels();
