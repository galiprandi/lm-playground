import fastify from "fastify";
import fastifyLm from "fastify-lm";
import { getSecret } from "./github";

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

  app.register(fastifyLm, {
    models: [
      {
        name: "test",
        provider: "test",
        model: "test",
        apiKey: getSecret("TEST_API_KEY") || "no-api-key",
      },
    ],
  });

  app.get("/", async (request, reply) => {
    const providers = ["test"];
    const data = {};

    for (const provider of providers) {
      const [question, models] = await Promise.all([
        app[provider].chat({
          system:
            "you are Rick from Rick and Morty and answer in a way that Rick would in one line",
          messages: [
            {
              role: "user",
              content: "Tell me about the life",
            },
          ],
        }),
        app[provider].models(),
      ]);

      data[provider] = {
        question,
        models,
      };
    }
    app.log.info(data);

    return data;
  });

  app
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
