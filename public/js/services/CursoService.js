angular.module('contatooh').factory('Curso',
  function($resource) {

    return $resource('/cursos/:id');
  });
