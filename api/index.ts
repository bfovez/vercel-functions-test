/*
GEMINI
Vercel looks for files in the /api directory. 
Create api/index.ts. 
We will use the NodeHttpServer module to convert our Effect API 
into a handler that Vercel's Node.js runtime understands.
*/

import {
  HttpApi,
  HttpApiBuilder,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiScalar,
  HttpLayerRouter,
  HttpServer,
} from "@effect/platform";
import { Effect, Layer, Schema } from "effect";

const Group = HttpApiGroup.make("group").add(
  HttpApiEndpoint.get("get", "/").addSuccess(Schema.String),
);

const Api = HttpApi.make("myApi").add(Group).prefix("/api");

const GroupLayer = HttpApiBuilder.group(Api, "group", (handlers) =>
  handlers.handle("get", () => Effect.succeed("Hello, world!")),
);

const ApiRoutesLayer = HttpLayerRouter.addHttpApi(Api, {
  openapiPath: "/api/docs/openapi.json",
}).pipe(Layer.provide(GroupLayer), Layer.provide(HttpServer.layerContext));

const DocsRouteLayer = HttpApiScalar.layerHttpLayerRouter({
  api: Api,
  path: "/api/docs",
});

const MainLayer = Layer.mergeAll(ApiRoutesLayer, DocsRouteLayer);

// Convert the API to a web handler
const { dispose, handler } = HttpLayerRouter.toWebHandler(MainLayer);

process.on("SIGTERM", () => {
  dispose();
});

export default {
  fetch: handler,
};
