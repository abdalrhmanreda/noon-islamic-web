import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = "";

if (isGithubActions) {
  const repository = process.env.GITHUB_REPOSITORY || "";
  repo = repository.replace(/.*?\//, "");
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: repo ? `/${repo}` : "",
  assetPrefix: repo ? `/${repo}/` : "",
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
