// import { HttpLayerRouter } from "@effect/platform"
// import { MainLayer } from "./toto.ts"

// const { dispose, handler } = HttpLayerRouter.toWebHandler(MainLayer)

// process.on("SIGTERM", () => {
// 	dispose()
// })

// export default { fetch: handler }

export default {
  fetch(request: Request) {
    return new Response('Hello from Vercel!');
  },
};