/** @type {import('next').NextConfig} */
// PREVIEW_EXPORT=1 builds a static, relative-path export for hosted previews.
const preview = process.env.PREVIEW_EXPORT === '1';

const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  ...(preview
    ? { output: 'export', assetPrefix: './', trailingSlash: true }
    : {}),
  env: {
    NEXT_PUBLIC_ASSET_BASE: preview ? '.' : '',
  },
};

export default nextConfig;
