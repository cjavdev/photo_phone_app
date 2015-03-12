var base = "https://photophone.herokuapp.com/api";
// var base = base + "";

angular.module('starter.services', [])
  .factory('User', function ($q, $http, $localstorage) {
    return {
      loggedIn: function () {
        var _user = $localstorage.getObject('user');
        if (JSON.stringify(_user) === '{}') {
          return false;
        }
        $http.defaults.headers.common['X-USER-EMAIL'] = _user.email;
        return true;
      },
      email: function () {
        return $localstorage.getObject('user').email;
      },
      login: function (params) {
        var dfd = $q.defer();
        $http.post(base + "/users", params)
          .success(function (user) {
            dfd.resolve(user);
            $localstorage.setObject('user', user);
            $http.defaults.headers.common['X-USER-EMAIL'] = user.email;
          })
          .error(function (data) {
            dfd.reject(data);
          });
        return dfd.promise;
      }
    };
  })
  .factory('Photo', function ($q, $http) {
    return {
      nextDescribable: function () {
        var dfd = $q.defer();
        $http.get(base + "/photos/next")
          .success(function (photo) {
            dfd.resolve(photo);
          })
          .error(function (data) {
            dfd.reject(data);
          });
        return dfd.promise;
      },
      describe: function (params) {
        var dfd = $q.defer();
        $http.post(base + "/descriptions", params)
          .success(function (photo) {
            dfd.resolve(photo);
          })
          .error(function (data) {
            dfd.reject(data);
          });
        return dfd.promise;
      },
      get: function (id) {
        var dfd = $q.defer();
        $http.get(base + "/photos/" + id)
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
  .factory('PhotoDescription', function ($q, $http) {
    return {
      all: function () {
        var dfd = $q.defer();
        $http.get(base + "/photo_descriptions")
          .success(function (photos) {
            dfd.resolve(photos);
          })
          .error(function (data) {
            dfd.reject(data);
          });
        return dfd.promise;
      }
    };
  })
  .factory('Description', function ($q, $http) {
    return {
      nextPhotoable: function () {
        var dfd = $q.defer();
        $http.get(base + "/descriptions/next")
          .success(function (description) {
            dfd.resolve(description);
          })
          .error(function (data) {
            dfd.reject(data);
          });
        return dfd.promise;
      },
      get: function (id) {
        var dfd = $q.defer();
        $http.get(base + "/descriptions/" + id)
          .success(function (description) {
            dfd.resolve(description);
          })
          .error(function (data) {
            dfd.reject(data);
          });
        return dfd.promise;
      },
      photograph: function (params) {
        var dfd = $q.defer();
        $http.post(base + "/photos", params)
          .success(function (photo) {
            dfd.resolve(photo);
          })
          .error(function (data) {
            dfd.reject(data);
          });
        return dfd.promise;
      },
    };
  })
  .factory('Camera', ['$q',
    function ($q) {
      return {
        getPicture: function () {
          var q = $q.defer();
          navigator.camera.getPicture(function (result) {
            // Do any magic you need
            q.resolve(result);
          }, function (err) {
            q.reject(err);
          }, {
            quality: 40,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false,
            destinationType: Camera.DestinationType.DATA_URL
          });

          return q.promise;
        }
      };
    }
  ])
  .factory('$localstorage', ['$window',
    function ($window) {
      return {
        set: function (key, value) {
          $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
          return $window.localStorage[key] || defaultValue;
        },
        setObject: function (key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
          return JSON.parse($window.localStorage[key] || '{}');
        }
      };
    }
  ])
  .factory('authHttpResponseInterceptor', ['$q', '$location',
    function ($q, $location) {
      return {
        responseError: function (rejection) {
          if (rejection.status === 401) {
            $location.path('/login');
            return $q.reject(rejection);
          }
          return $q.reject(rejection);
        }
      };
    }
  ]);
