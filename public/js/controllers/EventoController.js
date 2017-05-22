angular.module('contatooh').controller('EventoController',
  function($scope, $routeParams, Evento, Usuario) {

    var marker = null;
    function desenharMapa(myLatLng){

      if (myLatLng) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: myLatLng,
            scrollwheel: false
          });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
      } else {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -16.681270, lng: -49.256299},
          zoom: 11,
          scrollwheel: false
        });
      }

      $scope.map = map;
    
      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['marker'],
          scrollwheel: false
        }

      });
      drawingManager.setMap(map);
      
      google.maps.event.addListener(drawingManager, 'markercomplete', function (_marker) {
        
        $scope.evento.latitude = _marker.getPosition().lat();
        $scope.evento.longitude = _marker.getPosition().lng();

        if (marker) {
          marker.setMap(null);
        }
        marker = _marker;
      });
    }

    var marker = null;
    function desenharMapa(myLatLng){

      if (myLatLng) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: myLatLng
          });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
      } else {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -16.72212155646997, lng: -49.23653841018677},
          zoom: 15
        });
      }

      $scope.map = map;
    
      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['marker']
        }

      });
      drawingManager.setMap(map);
      
      google.maps.event.addListener(drawingManager, 'markercomplete', function (_marker) {
        
        $scope.evento.latitude = _marker.getPosition().lat();
        $scope.evento.longitude = _marker.getPosition().lng();

        if (marker) {
          marker.setMap(null);
        }
        marker = _marker;
      });
    }

    $scope.evento = new Evento();
    $scope.salva = function() {
      console.log($scope.evento);
      $scope.evento.$save().
      then(function() {
          $scope.mensagem = {
            texto: 'Salvo com sucesso.',
            tipo: 'alert alert-success'
          };
          $scope.evento = new Evento();
        })
        .catch(function(erro) {
          $scope.mensagem = {
            texto: 'Nao foi possivel salvar.',
            tipo: 'alert alert-danger'
          };
        });
    };
    Usuario.query(function(usuarios) {
      $scope.usuarios = usuarios;
    });


    Evento.query(function(eventos) {
      console.log(eventos);
      $scope.eventos = eventos;
    });

  if($routeParams.eventoId){
    Evento.get({
        id: $routeParams.eventoId
      },
      function(evento) {
        $scope.evento = evento;

        if (evento.latitude && evento.longitude) {
          var myLatLng = {lat: evento.latitude, lng: evento.longitude};
          desenharMapa(myLatLng);
        }

      },
      function(erro) {
        $scope.mensagem = {
          texto: 'Nao foi possivel obter evento.',
          tipo: 'alert alert-danger'
        };
        console.log(erro);
      }
    );
  }

  
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }
  function showPosition(position) {
    
      x.innerHTML = "lat: " + position.lat() + 
      "<br/>lng: " + position.lng() +
      "<br/>dis: " + getDistanceFromLatLonInKm(position.lat(), position.lng(), -16.681270, -49.256299);
      ;
      
  }
  
  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  if (!$scope.map) {
    desenharMapa(null);
  }

});
