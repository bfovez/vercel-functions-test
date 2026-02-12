import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  functions: {
    "api/*": { supportsCancellation: true },
  },
  regions: ["cdg1"],
  rewrites: [routes.rewrite("/api/(.*)", "/api")],
};
