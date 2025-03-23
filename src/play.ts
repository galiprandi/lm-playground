import fastifyLm from "fastify-lm";
import dotenv from "dotenv";

dotenv.config();

export const availableModels: Parameters<typeof fastifyLm>[1]["models"] = [
  {
    name: "test",
    provider: "test",
    model: "test",
    apiKey: "test",
  },
  {
    name: "openai",
    provider: "openai",
    model: "gpt-3.5-turbo",
    apiKey: process.env.OPENAI_KEY!,
  },
  {
    name: 'google',
    provider: 'google',
    model: 'gemini-2.0-flash-lite',
    apiKey: 'AIzaSyBAM89oxzwOzkMC9Mf82BGQGIZJrZmrC1Y',
  },
  {
    name: 'claude',
    provider: 'claude',
    model: 'claude-3-5-sonnet-20240620',
    apiKey: process.env.CLAUDE_KEY!,
  },
  {
    name: 'deepseek',
    provider: 'deepseek',
    model: 'deepseek-chat',
    apiKey: process.env.DEEPSEEK_KEY!,
  },
  {
    name: 'llama',
    provider: 'llama',
    model: 'llama3.3-70b',
    apiKey: process.env.LLAMA_KEY!,
  },
  {
    name: 'mistral',
    provider: 'mistral',
    model: 'open-mistral-7b',
    apiKey: process.env.MISTRAL_KEY!,
  },
];

export const providers = ["test", "mistral", "openai"];
export const system = "Eres Rick, el personaje de Rick and Morty. Responde en una sola línea";
export const question = "Morty: ¿Qué es la vida?";