import { routes, type VercelConfig } from "@vercel/config/v1"

export const config: VercelConfig = {
	regions: ["cdg1"],
	//rewrites: [routes.rewrite("/api/(.*)", "/api")],
	rewrites: [routes.rewrite("/api/(.*)", "/api")],
	//functions: { "api/index.js": { supportsCancellation: true } },
	//outputDirectory: "/api",
	//buildCommand: "bun run build"
	outputDirectory: "api"
}
