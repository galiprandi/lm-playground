# LM Playground

A simple playground for testing and comparing different language models using the Fastify framework and fastify-lm plugin.

## Description

LM Playground is a Node.js application that allows you to:
- Test multiple language model providers (OpenAI, Google, Claude, Deepseek, Llama, Mistral)
- Compare responses from different models to the same prompt
- Access results via a simple HTTP endpoint

## Features

- Support for multiple LLM providers
- Easy configuration via environment variables
- Simple REST API to retrieve model responses
- Development mode with hot reloading

## Prerequisites

- Node.js
- pnpm (Package Manager)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file with your API keys:

```
OPENAI_KEY=your_openai_key
CLAUDE_KEY=your_claude_key
DEEPSEEK_KEY=your_deepseek_key
LLAMA_KEY=your_llama_key
MISTRAL_KEY=your_mistral_key
```

## Usage

Start the development server:

```bash
pnpm dev
```

The server will run at http://localhost:3333

You can test the API with curl:

```bash
pnpm curl
```

## Customization

You can modify the following in `src/play.ts`:
- Available models and providers
- System prompt
- Test question

## Dependencies

- fastify - Web framework
- fastify-lm - Plugin for language model integration
- dotenv - Environment variable management
- pino - Logging
- TypeScript - Type safety

## License

ISC
