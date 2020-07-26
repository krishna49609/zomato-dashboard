/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  let ENV = {
    build: {
      environment: deployTarget
    },
    // include other plugin configuration that applies to all deploy targets here
    'revision-data': {
      type: 'git-commit'
    },
    's3-index': {
      accessKeyId: "AKIAIFD7W3RT4B6KJUPQ",
      secretAccessKey: "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",
      bucket: "zomato-dashboard",
      region: "ap-southeast-2",
      allowOverwrite: true
    },
    's3': {
      accessKeyId: "AKIAIFD7W3RT4B6KJUPQ",
      secretAccessKey: "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",
      bucket: "zomato-dashboard",
      region: "ap-southeast-2"
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
