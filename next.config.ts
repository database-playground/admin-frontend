import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  reactCompiler: true,
  experimental: {
    viewTransition: true,
    swcPlugins: [
      ["@swc-contrib/plugin-graphql-codegen-client-preset", { artifactDirectory: "./gql", gqlTagName: "graphql" }],
    ],
    cacheComponents: true,
    authInterrupts: true,
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
