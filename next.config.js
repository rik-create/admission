/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure CSS modules are correctly processed
  webpack: (config, { isServer }) => {
    // Fix CSS modules loading
    const rules = config.module.rules;
    const cssRules = rules.find(rule => 
      rule.oneOf && Array.isArray(rule.oneOf) && 
      rule.oneOf.some(oneOf => 
        oneOf.test && oneOf.test.toString().includes('css')
      )
    );

    if (cssRules) {
      const cssLoaders = cssRules.oneOf.filter(rule => 
        rule.test && rule.test.toString().includes('css')
      );
      cssLoaders.forEach(loader => {
        if (Array.isArray(loader.use)) {
          loader.use.forEach(item => {
            if (item.loader && item.loader.includes('css-loader')) {
              // Ensure CSS loader is compatible with ES modules
              if (!item.options) item.options = {};
              item.options.esModule = true;
            }
          });
        }
      });
    }

    return config;
  },
}

module.exports = nextConfig
