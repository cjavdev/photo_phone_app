angular.module('starter.controllers', [])
  .controller('DescriptionCtrl', function ($scope, $stateParams, Description) {
    $scope.description = {};
    Description.get($stateParams.id).then(function (description) {
      $scope.description = description;
    });
  })
  .controller('PhotoCtrl', function ($scope, $stateParams, Photo) {
    $scope.photo = {};

    Photo.get($stateParams.id).then(function (photo) {
      $scope.photo = photo;
    });
  })
  .controller('DashCtrl', function ($scope, PhotoDescription) {
    $scope.photos = [];
    PhotoDescription.all().then(function (photos) {
      $scope.photos = photos;
    });
  })
  .controller('LoginCtrl', function ($scope, $location, User) {
    function checkLogin() {
      if (User.loggedIn()) {
        $location.path("/");
      }
    }
    checkLogin();

    $scope.user = {};
    $scope.login = function () {
      User.login($scope.user).then(checkLogin);
    };
  })
  .controller('ShootCtrl', function ($scope, $location, Camera, Description) {
    $scope.description = {};
    $scope.photo = {};

    function next() {
      Description.nextPhotoable().then(function (description) {
        $scope.description = description;
        $scope.photo.description_id = description.id;
      });
    }
    next();

    $scope.nextDescription = function () {
      next();
    };

    $scope.getPhoto = function () {
      Camera.getPicture().then(function (image) {
        $scope.photo.image = "data:image/jpeg;base64," + image;
        Description.photograph($scope.photo)
          .then(function () {
            $location.path("/tab/describe");
          });
      }, function (err) {
        console.err(err);
      });
    };
  })
  .controller('DescribeCtrl', function ($scope, $location, Photo) {
    $scope.description = {};

    Photo.nextDescribable().then(function (photo) {
      $scope.photo = photo;
      $scope.description.photo_id = photo.id;
    });

    $scope.saveDescription = function () {
      Photo.describe($scope.description)
        .then(function () {
          $location.path("/tab/shoot");
        });
    };
  });
