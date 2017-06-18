angular.module('contatooh').controller('FaculdadesController',
  function(Faculdade, $scope) {
    $scope.faculdades = [];
    $scope.filtro = '';
    $scope.mensagem = {
      texto: '',
      tipo: ''
    };

    function buscaFaculdades() {

      Faculdade.query(
        function(faculdades) {
          $scope.faculdades = faculdades;
        },
        function(erro) {
          console.log(erro)
        }
      );
    }
    buscaFaculdades();

    $scope.remove = function(faculdade) {
      Faculdade.delete({
          id: faculdade._id
        },
        function(){
          $scope.mensagem = {
            texto: 'Faculdade removido com sucesso.',
            tipo: 'alert alert-success'
          };
          buscaFaculdades()
        },
        function(erro) {

          $scope.mensagem = {
            texto: 'Não foi possível remover o faculdade.',
            tipo: 'alert alert-danger'
          };
          console.log(erro);
        }
      );
    };
  });
