exports = module.exports = function(config) {
  var {deploy} = require('sftp-sync-deploy');
  var mod = {
    wrapper: require("node-promise-wrapper"),
    started: false,
    alwaysOn: function() { setTimeout(mod.alwaysOn, 5000); },
    sync: async function() {
      var hostname = require("os").hostname();
      var sync = false;
      for (var i=0; i<=config.uploaders.length-1; i++) {
        if (typeof config.uploaders[i] === "function" && await config.uploaders[i]() === true) {
          sync = true;
          break;
        }
      }
      if (
        config.uploaders.indexOf(hostname.toLowerCase()) >= 0
        || sync === true
      ) {
        var {error, result} = await mod.wrapper("result", deploy(config.connection, config.options));
        if (mod.started === false) setTimeout(mod.alwaysOn, 5000);
        mod.started = true;
      } else {
        console.log("Skipped syncing to remote because of filters.");
      }
      return mod.started;
    }
  };
  mod.sync();
  return mod;
};