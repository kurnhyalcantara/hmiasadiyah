/* eslint-env node */

const { development, compileTemplate, isTemplate } = require('./build-utils.js');

if (!development) {
  throw new Error('npm start hanya bisa dilakukan dengan argument NODE_ENV=development');
}

module.exports = {
  appIndex: 'index.html',
  fileExtensions: ['.ts'],
  nodeResolve: true,
  port: 5000,
  watch: true,
  open: true,
  responseTransformers: [
    ({ url, status: _, contentType, body }) => {
      if (isTemplate({ url, contentType })) {
        return { body: compileTemplate(body) };
      } else {
        return { body };
      }
    },
  ],
  middlewares: [
    function rewriteIndex(context, next) {
      // node_modules are deployed as node_assets
      if (context.url.startsWith('/node_assets/')) {
        context.url = context.url.replace('/node_assets/', '/node_modules/');
      }

      return next();
    },
  ],
};
