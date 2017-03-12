angular.module('contatooh').factory('Aluno',
  function($resource) {

    return $resource('/alunos/:id');
  });
