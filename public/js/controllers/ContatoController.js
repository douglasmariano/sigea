angular.module('contatooh').controller('ContatoController',
function($scope, $routeParams, Contato) {


  $scope.contato = new Contato();
  $scope.salva = function(){
  $scope.contato.$save().
    then(function(){
      $scope.mensagem = {texto: 'Salvo com sucesso.'};
      $scope.contato = new Contato();
    })
    .catch(function(erro){
      $scope.mensagem = {texto: 'Nao foi possivel salvar.'};
    });
};

  Contato.get({id: $routeParams.contatoId},
  function(contato) {
    $scope.contato = contato;
  },
  function(erro){
    $scope.mensagem = {
      texto:'Nao foi possivel obter contato.'
    };
    console.log(erro);
    }
  );
});
