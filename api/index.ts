import { HttpLayerRouter } from "@effect/platform"
import { MainLayer } from "./toto"

const { dispose, handler } = HttpLayerRouter.toWebHandler(MainLayer)

process.on("SIGTERM", () => {
	dispose()
})

export default { fetch: handler }
