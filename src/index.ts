import fastify from "fastify";
import fastifyLm from "fastify-lm";
import { availableModels, providers, question, system } from "./play";

const start = async () => {
  const app = fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
  });

  await app.register(fastifyLm, { models: availableModels });

  const data = {};
  for (const provider of providers) {
    const answer = await app[provider].chat({
      system,
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    });
    data[provider] = { answer };

    // get models
    // const models = await app[provider].models();
    // data[provider].models = models;
  }

  console.log(data);

  app.get("/", async () => {
    return data;
  });

  await app
    .listen({
      port: 3333,
      host: "0.0.0.0",
    })
    .then(() => {
      app.log.info("Server running on http://0.0.0.0:3333");
    })
    .catch((err) => {
      app.log.error(err);
    });
};

start();
