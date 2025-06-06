const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const safeBasePath = basePath && basePath.startsWith("/") ? basePath : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: safeBasePath,
  assetPrefix: safeBasePath,
  logging: {
    env: {
      NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    },
    source: "/(.*)",
    headers: [
      {
        key: "Content-Security-Policy",
        value: `
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval';
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: https:;
          connect-src 'self';
          font-src 'self' https://fonts.gstatic.com;
          object-src 'none';
          frame-ancestors 'none';
        `.replace(/\n/g, ""),
      },
    ],
  },
};

export default nextConfig;
