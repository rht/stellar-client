'use strict';

angular.module('mockSession', [])
  .factory('session', [function() {
    var session_data = {
      keychainData : {
        updateToken: true
      }, 
      mainData: {
        email: '', 
        gateways: {
          'test-gateway': {
            domain: 'test-gateway', 
            currencies: [{currency: 'usd'}, {currency: 'cny'}]
          },
          'removing-gateway': {
            domain: 'removing-gateway', 
            currencies: [{currency: 'usd'}, {currency: 'cny'}]
          }
        }
      }
    };
    return {get: function () {return session_data}, syncWallet: function () {}}
  }]);