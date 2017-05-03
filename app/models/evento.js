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
    quantidadedisponivel: {
      type: Number,
      required: false,
      default:0
    },
    certificado: {
      type: String,
      required: false
    },
    tipoEvento: {
      type: String,
      required: true
    },    
    usuariosinscritos:[{
      type: mongoose.Schema.ObjectId,
      ref:'Usuario'
    }],
    usuariospresentes:[{
      type: mongoose.Schema.ObjectId,
      ref:'Usuario'
    }]

  });
  schema.methods.isExibirvagas = function isExibirvagas() {
    return this.quantidade > 0;
  }
  schema.methods.isExibirparticipar = function isExibirvagas() {
    return this.quantidade == this.quantidadedisponivel;
  }

  return mongoose.model('Evento', schema);
};
