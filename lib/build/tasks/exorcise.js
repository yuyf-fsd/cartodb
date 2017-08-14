var browserifyBundles = require('../files/browserify_files');
var _ = require('underscore');

/**
 * Extracts inlined source map from files (browserify bundles in this case).
 *
 * Expected to be run after copy:js task
 */
exports.task = function() {
  var excludedBundles = ['test_specs_for_browserify_modules'];
  var files = {};

  for (var bundleName in browserifyBundles) {
    if (!_.contains(excludedBundles, bundleName)) {
      var filePath = '<%= tmp_dir %>/javascripts/' + bundleName + '.uncompressed.js';
      files[filePath + '.map'] = filePath;
    }
  }

  return {
    bundle: {
      options: {
        strict: true // fail task if sourcemaps are missing
      },
      files: files
    }
  };
};