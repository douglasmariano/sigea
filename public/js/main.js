angular.module('contatooh', ['ngRoute','ngResource', 'ui.bootstrap.datetimepicker'])
  .config(function($locationProvider, $routeProvider) {

/*$locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
*/

// ************* Cadastro de contatos
$routeProvider.when('/contatos', {
    templateUrl: '/partials/contatos.html',
    controller: 'ContatosController'
  });
$routeProvider.when('/contato/:contatoId', {
    templateUrl: '/partials/contato.html',
    controller: 'ContatoController'
  });
$routeProvider.when('/contato', {
    templateUrl: '/partials/contato.html',
    controller: 'ContatoController'
});

// ************* Cadastro de usuarios
$routeProvider.when('/usuarios', {
    templateUrl: '/partials/usuarios.html',
    controller: 'UsuariosController'
  });
$routeProvider.when('/usuario/:usuarioId', {
    templateUrl: '/partials/usuario.html',
    controller: 'UsuarioController'
  });
$routeProvider.when('/usuario_por_login/:login', {
    templateUrl: '/partials/usuario.html',
    controller: 'UsuarioController'
  });
$routeProvider.when('/usuario', {
    templateUrl: '/partials/usuario.html',
    controller: 'UsuarioController'
});

// ************* Cadastro de faculdades
$routeProvider.when('/faculdades', {
    templateUrl: '/partials/faculdades.html',
    controller: 'FaculdadesController'
  });
$routeProvider.when('/faculdade/:faculdadeId', {
    templateUrl: '/partials/faculdade.html',
    controller: 'FaculdadeController'
  });
$routeProvider.when('/faculdade', {
    templateUrl: '/partials/faculdade.html',
    controller: 'FaculdadeController'
});

// ************* Cadastro de Evento
$routeProvider.when('/eventos', {
    templateUrl: '/partials/eventos.html',
    controller: 'EventosController'
  });
$routeProvider.when('/evento/:eventoId', {
    templateUrl: '/partials/evento.html',
    controller: 'EventoController'
  });
$routeProvider.when('/evento', {
    templateUrl: '/partials/evento.html',
    controller: 'EventoController'
});

// ************* Cadastro de Cursos
$routeProvider.when('/cursos', {
    templateUrl: '/partials/cursos.html',
    controller: 'CursosController'
  });
$routeProvider.when('/curso/:cursoId', {
    templateUrl: '/partials/curso.html',
    controller: 'CursoController'
  });
$routeProvider.when('/curso', {
    templateUrl: '/partials/curso.html',
    controller: 'CursoController'
});

// ************* Página Inicial
$routeProvider.when('/paginainicial', {
    templateUrl: '/partials/paginaInicial.html',
    controller: 'PaginaInicialController'
});

$routeProvider.otherwise({redirectTo: '/paginainicial'});
});
