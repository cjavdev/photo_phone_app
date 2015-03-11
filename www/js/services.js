angular.module('starter.services', [])

.factory('Photo', function($q, $http) {
  return {
    nextDescribable: function () {
      var dfd = $q.defer();
      $http.get("http://localhost:3000/api/photos/next")
        .success(function (photo) {
          dfd.resolve(photo);
        })
        .error(function (data) {
          dfd.reject(data);
        });
      return dfd.promise;
    }
  };
})
.factory('Description', function($q, $http) {
  return {
    nextPhotoable: function() {
      var dfd = $q.defer();
      $http.get("http://localhost:3000/api/descriptions/next")
        .success(function (description) {
          dfd.resolve(description);
        })
        .error(function (data) {
          dfd.reject(data);
        });
      return dfd.promise;
    }
  };
})
.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  };
}]);
