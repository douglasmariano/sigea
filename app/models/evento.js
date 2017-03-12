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
      required: true
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
      type: Boolean,
      required: true
    },
    tipoEvento: {
      type: String,
      required: true
    },    
    faculdade:{
      type: mongoose.Schema.ObjectId,
      ref:'Faculdade'
    }

  });


  return mongoose.model('Evento', schema);
};