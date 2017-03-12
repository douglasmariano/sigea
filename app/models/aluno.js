var mongoose = require('mongoose');

module.exports = function(){
  var schema = mongoose.Schema({
    nome: {
      type: String,
      required: true
    },
    telefone: {
      type: Number
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
    }

  });


  return mongoose.model('Aluno', schema);
};
