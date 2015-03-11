angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope) {})
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
    console.log($scope.description);
  };
});
