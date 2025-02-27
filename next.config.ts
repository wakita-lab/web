import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(vert|frag)$/,
      use: 'raw-loader',
    });
    config.module.rules.push({
      test: /\.yaml$/,
      use: 'js-yaml-loader',
    });
    return config;
  },
};

export default nextConfig;
