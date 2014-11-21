angular.module('stellarClient').controller('SettingsEmailCtrl', function($scope, $http, $state, $q, session, singletonPromise) {
  $scope.loading = true;
  $scope.error = null;

  $scope.$on('settings-refresh', function () {
    $scope.refresh();
  });

  $scope.refresh = function() {
    $scope.loading = true;
    $scope.error = null;

    session.getUserInfo()
      .then(function(userInfo) {
        $scope.loading = false;

        $scope.email = session.getUser().getEmailAddress();
        $scope.emailVerified = session.getUser().isEmailVerified();
        $scope.verifyToken = null;
        $scope.resetEmailState();
      })
      .catch(function(err) {
        $scope.error = "Unable to contact server!";
      });
  };

  $scope.resetEmailState = function () {
    if ($scope.email) {
      $scope.emailState = 'added';
    } else {
      $scope.emailState = 'none';
    }
  };

  $scope.getEmailState = function () {
    return $scope.emailState;
  };

  $scope.setEmailState = function (state) {
    $scope.emailState = state;
  };

  $scope.emailAction = singletonPromise(function () {
    if ($scope.emailState === 'change') {
      return changeEmail();
    } else if ($scope.emailState === 'verify') {
      return verifyEmail().catch($scope.handleServerError($('#verify-input')));
    }
  });


  function verifyEmail () {
    return session.getUser().verifyEmail($scope.verifyToken)
        .then(function () {
          return $scope.refreshAndInitialize();
        })
        .then(function () {
          $scope.verifyToken = null;
        });
  }


  function changeEmail () {
    return session.getUser().changeEmail($scope.newEmail)
        .then(function () {
          return $scope.refreshAndInitialize();
        })
        .then(function () {
          $scope.newEmail = null;
        })
        .catch($scope.handleServerError($('#email-input')));
  }
});