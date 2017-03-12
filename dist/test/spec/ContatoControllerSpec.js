describe("AlunoController", function() {
  var $scope, $httpBackend;
  beforeEach(function() {
    module('alunooh');
    inject(function($injector, _$httpBackend_){
      $scope = $injector.get('$rootScope').$new();
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', '/alunos/1')
      .respond({_id: '1'});
      $httpBackend.when('GET', '/alunos')
      .respond([{}]);
    });
  });
  it("Deve criar um Aluno vazio quando nenhum parâmetro de rota for passado",
  inject(function($controller) {
    $controller('AlunoController', {
      '$scope': $scope
    });
    expect($scope.aluno._id).toBeUndefined();
  }));
    
  it("Deve preencher o Aluno quando parâmetro de rota for passado",
  inject(function($controller) {
    $controller('AlunoController', {
      $routeParams: {alunoId: 1},
      '$scope': $scope
    });
    $httpBackend.flush();
    expect($scope.aluno._id).toBeDefined();
  }));
});
