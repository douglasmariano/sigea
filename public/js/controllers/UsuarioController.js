angular.module('contatooh').controller('UsuarioController',
  function($http, $scope, $routeParams, Usuario) {

    $scope.usuario = new Usuario();

    $scope.salva = function() {
      $scope.usuario.$save().
      then(function() {
          $scope.mensagem = {
            texto: 'Salvo com sucesso.',
            tipo: 'alert alert-success'
          };
          $scope.usuario = new Usuario();
        })
        .catch(function(erro) {
          $scope.mensagem = {
            texto: 'Nao foi possivel salvar.',
            tipo: 'alert alert-danger'
          };
        });
    };
    
    if($routeParams.usuarioId){
    Usuario.get({
        id: $routeParams.usuarioId
      },
      function(usuario) {
        $scope.usuario = usuario;
      },
      function(erro) {
        $scope.mensagem = {
          texto: 'Nao foi possivel obter usuario.',
          tipo: 'alert alert-danger'
        };
        console.log(erro);
      }
    );
  }

  if($routeParams.login){

    $http.get("/usuario_por_login/" + $routeParams.login).then(function (success) {

      $scope.desabilitar = true;
      
    Usuario.get({
           login:success.data.login
    },function(usuario)
      {$scope.usaurio = success.data}
    )

    }, function (erro) {
      $scope.mensagem = {
          texto: 'Nao foi possivel obter usuario.',
          tipo: 'alert alert-danger'
        };
    });
  }
  });
