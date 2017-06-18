var mongoose = require('mongoose');

module.exports = function(){
  var schema = mongoose.Schema({
    nome: {
      type: String,
      required: true
    },
    telefone: {
      type: String
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    faculdade:{
      type: mongoose.Schema.ObjectId,
      ref:'Faculdade'
    },
    usuario:{
      type: mongoose.Schema.ObjectId,
      ref:'Usuario'
    }

  });


  return mongoose.model('Aluno', schema);
};
