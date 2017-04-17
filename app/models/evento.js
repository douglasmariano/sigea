var mongoose = require('mongoose');

module.exports = function(){
  var schema = mongoose.Schema({
    nome: {
      type: String,
      required: true
    },
    codigo: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    data: {
      type: Date,
      required: false
    },
    local: {
      type: String,
      required: true
    },
    valor: {
      type: Number,
      required: false
    },
    quantidade: {
      type: Number,
      required: false
    },
    certificado: {
      type: String,
      required: false
    },
    tipoEvento: {
      type: String,
      required: true
    },
    faculdade:{
      type: mongoose.Schema.ObjectId,
      ref:'Faculdade'
    },
    alunosinscritos:[{
      type: mongoose.Schema.ObjectId,
      ref:'Aluno'
    }],
    alunospresentes:[{
      type: mongoose.Schema.ObjectId,
      ref:'Aluno'
    }]

  });


  return mongoose.model('Evento', schema);
};
