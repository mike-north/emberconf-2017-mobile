/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'esw-cache-fallback': {
      patterns: [
        'https://emberconf-2017-api.mike.works/(.+)',
        '/fonts/fontawesome-webfont(.+)',
      ],
    },
    'asset-cache': {
      include: [
        'assets/**/*',
        'fonts/fontawesome-webfont.*',
        'img/**/*'
      ],
      version: '199'
    }
  });
  return app.toTree();
};
