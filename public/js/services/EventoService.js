angular.module('contatooh').factory('Evento',
  function($resource) {

    return $resource('/eventos/:id');
  });
