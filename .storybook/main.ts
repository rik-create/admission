import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    // Including MDX and other story file types
    "../src/**/*.mdx", 
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    // Essential add-ons for Storybook
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",  // Chromatic for UI testing and visual regression
    "@storybook/experimental-addon-test", // If you're using experimental features for testing
  ],
  framework: {
    name: "@storybook/nextjs",  // Use the Next.js Storybook framework
    options: {},
  },
  staticDirs: [
    // Serve static files (e.g., images, styles) from the public directory
    "../public",
  ],
  typescript: {
    // You can specify how typescript should behave during the build
    reactDocgen: 'react-docgen',  // Recommended setting for better type extraction in stories
  },
  docs: {
    // You can customize the docs addon if needed
    autodocs: true,  // Automatically generate documentation for your components from JSDoc or TypeScript annotations
  },
};

export default config;
