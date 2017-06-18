angular.module('contatooh').factory('Faculdade',
  function($resource) {

    return $resource('/faculdades/:id');
  });
