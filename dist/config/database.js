var mongoose = require('mongoose');

module.exports = function(uri) {
  mongoose.connect(uri);
  mongoose.set('debug', true);

  mongoose.connection.on('connected', function(){
    console.log('Mongoose! Conectado em '+ uri);
  });
  mongoose.connection.on('disconnected', function(){
    console.log('Mongoose! Desconectado em '+ uri);
  });
  mongoose.connection.on('error', function(){
    console.log('Mongoose! erro na conexao '+ erro);
  });

  process.on('SIGINT', function(){
      mongoose.connection.close(function(){
        console.log('Mongoose! desconectado pelo termino da aplicação');
        process.exit(0);
      });
  });
}
