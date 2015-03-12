angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope) {})
.controller('LoginCtrl', function($scope, $location, User) {
  function checkLogin () {
    if(User.loggedIn()) {
      $location.path("/");
    }
  }
  checkLogin();

  $scope.user = {};
  $scope.login = function () {
    User.login($scope.user).then(checkLogin);
  };
})
.controller('ShootCtrl', function($scope, Camera, Description) {
  $scope.description = {};

  function next() {
    Description.nextPhotoable().then(function (description) {
      $scope.description = description;
    });
  }
  next();

  $scope.nextDescription = function () {
    next();
  };

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    });
  };
})
.controller('DescribeCtrl', function($scope, Photo) {
  $scope.description = {};

  Photo.nextDescribable().then(function (photo) {
    $scope.photo = photo;
    $scope.description.photo_id = photo.id;
  });

  $scope.saveDescription = function () {
    Photo.describe($scope.description);
  };
});
