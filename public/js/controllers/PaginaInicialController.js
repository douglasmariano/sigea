angular.module('contatooh').controller('PaginaInicialController',
  function ($http, $scope, $route, Evento, Usuario) {
    $scope.filtro = '';
    /*
    tipos de mensagem disponíveis. Cada um tem uma cor.
    Quando for inserir uma mensagem, insira um tipo também

    alert alert-success
    alert alert-danger
    alert alert-info
    alert alert-warning
    */
    function buscaEventos() {

      Evento.query(
        function (eventos) {

          $http.get("/usuario_logado").then(function (success) {
            Usuario.get({
              id: success.data._id
            }, function (usuario) {

              var todos_os_eventos = eventos;
              var eventos_do_usuario = usuario.eventosinscritos;
              var lista_final = [];

              for (var i = 0; i < todos_os_eventos.length; i++) {
                var evento = todos_os_eventos[i];
                var encontrou = false;

                for (var j = 0; j < eventos_do_usuario.length; j++) {
                  var evento_usuario = eventos_do_usuario[j];
                  if (evento.codigo == evento_usuario.codigo) {

                    encontrou = true;

                  }
                }
                if (!encontrou) {
                  if (new Date(evento.data) >= new Date()) {
                    lista_final.push(evento);
                  }
               }
              }
              $scope.eventos = lista_final;
            }, function (erro) {
              console.log(erro);
            });

          }, function (error) {
            console.log("erro");
          });

          0
        },
        function (erro) {
          console.log(erro)
        }
      );
    }

    buscaEventos();

    function carregarEventosUsuario() {
      $http.get("/usuario_logado").then(function (success) {

        Usuario.get({
          id: success.data._id
        }, function (usuario) {

          $scope.usuario = usuario;
        }, function (erro) {
          console.log(erro);
        });

      }, function (error) {
        console.log("erro");
      });
    }
    carregarEventosUsuario();


    $scope.participarEvento = function (evento) {
      $http.get("/usuario_logado").then(function (success) {

        Usuario.get({
          id: success.data._id
        }, function (usuario) {

          usuario.eventosinscritos.push(evento);
          usuario.$save()
            .then(function () {
              $scope.mensagem = {
                texto: 'Inscrito com sucesso.',
                tipo: 'alert alert-success'
              };
            })
            .catch();

          carregarEventosUsuario();
          buscaEventos();

        }, function (erro) {
          console.log(erro);
        });


        Evento.get({
          id: evento._id
        }, function (eventoBuscado) {

          Usuario.get({
            id: success.data._id
          }, function (usuario) {

            eventoBuscado.usuariosinscritos.push(usuario);
            if (eventoBuscado.quantidade > 0) {
              eventoBuscado.quantidadedisponivel++;
              console.log(eventoBuscado.quantidadedisponivel);
            }
            eventoBuscado.$save()
              .then(function () { console.log("usuario no evento") })
              .catch();
          });

        }, function (erro) {
          console.log(erro);
        });

      }, function (error) {
        console.log("erro");
      });


    }

    $scope.removerEvento = function (evento) {
      $http.get("/usuario_logado").then(function (success) {

        Usuario.get({
          id: success.data._id
        }, function (usuario) {

          var eventosRestantes = usuario.eventosinscritos.filter(function (el) {
            return el._id !== evento._id;
          });

          usuario.eventosinscritos = eventosRestantes;
          usuario.$save()
            .then(function () {
              $scope.mensagem = {
                texto: 'Removido com sucesso.',
                tipo: 'alert alert-success'
              };
            })
            .catch();


        }, function (erro) {
          console.log(erro);
        });

        Evento.get({
          id: evento._id
        }, function (evento) {
          usuario = success.data._id;
          var usuariosRestantes = evento.usuariosinscritos.filter(function (el) {
            return el._id !== usuario._id;
          });

          evento.usuariosinscritos = usuariosRestantes;
          if (evento.quantidade > 0) {
            if (evento.quantidadedisponivel > 0) {
              evento.quantidadedisponivel--;
            }
            console.log(evento.quantidadedisponivel);
          }
          evento.$save()
            .then(function () { })
            .catch();

          carregarEventosUsuario();
          buscaEventos();
        }
        )

      }, function (error) {
        console.log("erro");
      });
    }

    $scope.mensagem = {
      texto: '',
      tipo: ''
    };

    // Alimenta a tabela de rotas da primeira página
    $scope.routes = $route.routes;
    $scope.logout = function () {
      delete $sessionStorage.sessname; //sessname is get sessionStorage username
      $location.path('/login');
    };

  });
