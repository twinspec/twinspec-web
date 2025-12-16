import nextMDX from "@next/mdx";

const withMDX = nextMDX({
  extension: /\.(md|mdx)$/
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

export default withMDX({
  ...nextConfig,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"]
});