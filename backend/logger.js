const log4js = require('log4js'),
  Settings = require('./settings');

let setupDone = false;


function setup() {
  if (setupDone) {
    return;
  }

  const log4jsOptions = {
    appenders: [
      {
          type: 'console',
      },
    ],
    levels: {
        "[all]": Settings.logLevel.toUpperCase(),
    }
  };

  log4js.configure(log4jsOptions);

  setupDone = true;
}


exports.create = function(category) {
  setup();

  let logger = log4js.getLogger(category);

  // Allow for easy creation of sub-categories.
  logger.create = function(subCategory) {
      return exports.create(`${category}/${subCategory}`);
  }

  return logger;
};
