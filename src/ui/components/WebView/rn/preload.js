import IPC from '../../../../../common/constants/ipc'
import { isAndroid } from '../../../../utils/deviceInfo'

export default () => `
(function () {
  var pendingRequests = {};

  var sendIpc = function (type, payload, callback) {
    var id = Date.now() + '-' + Math.random();

    pendingRequests[id] = callback;

    try {
      var msg = JSON.stringify({ id, type, payload });

      if (${isAndroid}) {
        window.postMessage(msg, '*');
      } else {
        window.webkit.messageHandlers.reactNative.postMessage(msg, '*');
      }
    } catch (err) {
      console.error(err);
    }
  };

  window.receivedMessageFromReactNative = function (obj) {
    try {
      var id = obj.id;
      var error = obj.error;
      var response = obj.response;

      var callback = pendingRequests[id];

      if (callback) {
        pendingRequests[id] = null;

        if (error) {
          callback(error);
        } else {
          callback(null, response);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  window.web3 = {
    currentProvider: {
      isConnected: function () {
        return true;
      },
      send: function () {
        throw new Error('Synchronous web3 calls are not supported.');
      },
      sendAsync: function (payload, callback) {
        sendIpc('${IPC.WEB3}', payload, function (err, response) {
          if (err) {
            callback(err);
          } else {
            var hasError = [].concat(response).find(function (r) {
              return !!(r.error)
            });

            if (hasError) {
              callback(response);
            } else {
              callback(null, response);
            }
          }
        });
      }
    }
  };
})();
`
