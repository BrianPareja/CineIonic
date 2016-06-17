angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$stateParams, $sce) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('PagPrincipalCtrl', function($scope, $stateParams) {
})

.controller('VideosCtrl', function($scope, $stateParams, $ionicModal, $sce) {
  $scope.peliculas = [
    { titulo: 'Lucy', url:'https://www.youtube.com/embed/MVt32qoyhi0', imagen:'img/peliculas/6lucy.jpe', id: 1},
    { titulo: 'Focus', url:'https://www.youtube.com/embed/MxCRgtdAuBo', imagen:'img/peliculas/1Focus.jpe', id: 2},
    { titulo: 'Piratas del Caribe', url:'https://www.youtube.com/embed/3LioCI-QTPE', imagen:'img/peliculas/2PiratasdelCaribe.jpe', id: 3},
    { titulo: 'Pixels', url:'https://www.youtube.com/embed/XAHprLW48no', imagen:'img/peliculas/4pixeles.jpe', id: 4},
    { titulo: 'La Mascara', url:'https://www.youtube.com/embed/DhP0P4q8jLk', imagen:'img/peliculas/10LaMascara.jpe', id: 5},
    { titulo: 'Kick Ass', url:'https://www.youtube.com/embed/mpfiRpotHEg', imagen:'img/peliculas/11kick-ass.jpe', id: 6}
  ];
  $scope.pelicula_act = {};

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalVideo = modal;
  });

  $scope.showVideo = function (id) {
    var pos = searchPelicula(id);
    if (pos >= 0) {
      $scope.pelicula_act = $scope.peliculas[pos];
      $scope.modalVideo.show();
    }
  };

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  searchPelicula = function (id) {
    for (var i = 0; i < $scope.peliculas.length; i++) {
      if ($scope.peliculas[i].id==id) {
        return i;
      }
    }
    return -1;
  };
})

.controller('VideoCtrl', function($scope, $stateParams, $ionicModal, $sce) {
  var id = $stateParams['videoId'];

  $scope.peliculas = [
    { titulo: 'Lucy', url:'https://www.youtube.com/embed/MVt32qoyhi0', imagen:'img/peliculas/6lucy.jpe', id: 1},
    { titulo: 'Focus', url:'https://www.youtube.com/embed/MxCRgtdAuBo', imagen:'img/peliculas/1Focus.jpe', id: 2},
    { titulo: 'Piratas del Caribe', url:'https://www.youtube.com/embed/3LioCI-QTPE', imagen:'img/peliculas/2PiratasdelCaribe.jpe', id: 3},
    { titulo: 'Pixels', url:'https://www.youtube.com/embed/XAHprLW48no', imagen:'img/peliculas/4pixeles.jpe', id: 4},
    { titulo: 'La Mascara', url:'https://www.youtube.com/embed/DhP0P4q8jLk', imagen:'img/peliculas/10LaMascara.jpe', id: 5},
    { titulo: 'Kick Ass', url:'https://www.youtube.com/embed/mpfiRpotHEg', imagen:'img/peliculas/11kick-ass.jpe', id: 6}
  ];
  $scope.pelicula_act = {};

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalVideo = modal;
  });

  $scope.showVideo = function (id) {
    var pos = searchPelicula(id);
    if (pos >= 0) {
      $scope.pelicula_act = $scope.peliculas[pos];
      $scope.modalVideo.show();
    }
  };

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  searchPelicula = function (id) {
    for (var i = 0; i < $scope.peliculas.length; i++) {
      if ($scope.peliculas[i].id==id) {
        return i;
      }
    }
    return -1;
  };


  /// buscamos la pelicula por su ID
  var pos = searchPelicula(id);
  $scope.pelicula = $scope.peliculas[0];
  if (pos>=0) {
    $scope.pelicula = $scope.peliculas[pos];
  }

})

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
      function initialize() {
        var myLatlng = new google.maps.LatLng(-16.404054478065266,-71.53901144999998);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      
    });