import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    viewTransition: true,
    swcPlugins: [
      ["@swc-contrib/plugin-graphql-codegen-client-preset", { artifactDirectory: "./gql", gqlTagName: "graphql" }],
    ],
    authInterrupts: true,
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
