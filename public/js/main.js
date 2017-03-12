angular.module('contatooh', ['ngRoute','ngResource'])
  .config(function($locationProvider, $routeProvider) {

$locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

// ************* Cadastro de contatos
$routeProvider.when('/contatos', {
    templateUrl: 'partials/contatos.html',
    controller: 'ContatosController'
  });
$routeProvider.when('/contato/:contatoId', {
    templateUrl: 'partials/contato.html',
    controller: 'ContatoController'
  });
$routeProvider.when('/contato', {
    templateUrl: 'partials/contato.html',
    controller: 'ContatoController'
});

// ************* Cadastro de alunos
$routeProvider.when('/alunos', {
    templateUrl: 'partials/alunos.html',
    controller: 'AlunosController'
  });
$routeProvider.when('/aluno/:alunoId', {
    templateUrl: 'partials/aluno.html',
    controller: 'AlunoController'
  });
$routeProvider.when('/aluno', {
    templateUrl: 'partials/aluno.html',
    controller: 'AlunoController'
});

// ************* Cadastro de faculdades
$routeProvider.when('/faculdades', {
    templateUrl: 'partials/faculdades.html',
    controller: 'FaculdadeController'
  });
$routeProvider.when('/faculdade/:faculdadeId', {
    templateUrl: 'partials/faculdade.html',
    controller: 'FaculdadeController'
  });
$routeProvider.when('/faculdade', {
    templateUrl: 'partials/faculdade.html',
    controller: 'FaculdadeController'
});

// ************* Página Inicial
$routeProvider.when('/paginainicial', {
    templateUrl: 'partials/paginaInicial.html',
    controller: 'PaginaInicialController'
});

$routeProvider.otherwise({redirectTo: '/paginainicial'});
});
