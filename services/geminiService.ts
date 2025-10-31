import { GoogleGenAI, Type, GenerateContentResponse, Chat } from "@google/genai";
import { Product } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
let chat: Chat | null = null;

function getChatSession(): Chat {
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: 'You are Foodie, a friendly and helpful chatbot for the FoodHub website. You can answer questions about food, recipes, and help users navigate the site. Keep your answers concise and cheerful.',
            },
        });
    }
    return chat;
}

export async function getChatResponse(message: string): Promise<string> {
    try {
        const chatSession = getChatSession();
        const response: GenerateContentResponse = await chatSession.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Gemini chat error:", error);
        return "Oops! I'm having a little trouble connecting. Please try again later.";
    }
}

export async function identifyFood(base64Image: string): Promise<{ name: string; description: string }> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { text: "Identify the food item in this image. Provide a creative, appealing name and a short, enticing description suitable for a marketplace listing. Format the output as JSON." },
                    { inlineData: { mimeType: 'image/jpeg', data: base64Image } }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING, description: 'A creative and appealing name for the food item.' },
                        description: { type: Type.STRING, description: 'A short, enticing description for a marketplace.' }
                    },
                    required: ['name', 'description']
                }
            }
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Gemini image recognition error:", error);
        throw new Error("Could not identify the food item from the image.");
    }
}


export async function getRecommendations(productName: string, productDescription: string): Promise<Product[]> {
    try {
        const prompt = `Based on the item "${productName}" with description "${productDescription}", suggest 3 similar food items. For each item, provide a name, a short description, a plausible price (as a number), and a seed word for a placeholder image URL. Format the output as a JSON array.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                            price: { type: Type.NUMBER },
                            imageSeed: { type: Type.STRING, description: 'A single, simple word to use as a seed for an image URL.' },
                        },
                        required: ['name', 'description', 'price', 'imageSeed']
                    }
                }
            }
        });
        
        const jsonString = response.text.trim();
        const rawRecs = JSON.parse(jsonString);

        return rawRecs.map((rec: any, index: number) => ({
            id: Date.now() + index,
            name: rec.name,
            description: rec.description,
            price: rec.price,
            imageUrl: `https://picsum.photos/seed/${rec.imageSeed || 'food'}/400/300`,
        }));
        
    } catch (error) {
        console.error("Gemini recommendation error:", error);
        throw new Error("Could not fetch recommendations.");
    }
}
