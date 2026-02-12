/*
GEMINI
Vercel looks for files in the /api directory. 
Create api/index.ts. 
We will use the NodeHttpServer module to convert our Effect API 
into a handler that Vercel's Node.js runtime understands.
*/

import { HttpLayerRouter } from "@effect/platform"
import { MainLayer } from "../src/test"

// Convert the API to a web handler
const { dispose, handler } = HttpLayerRouter.toWebHandler(MainLayer)

process.on("SIGTERM", () => {
	dispose()
})

export default { fetch: handler }
