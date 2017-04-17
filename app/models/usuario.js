var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
module.exports = function(){
  var schema = mongoose.Schema({
    login: {
      type: String,
      required: true,
      index:{
        unique:true
      }
    },
    nome:{
      type:String,
      required:true,
    },
    password:{
      type:String
    },
    inclusao:{
      type: Date,
      default:Date.now
    },
    permissao:{
      type:String,
      default:'usuario'
    },
    eventosinscritos:[{
        type: mongoose.Schema.ObjectId,
        ref:'Evento'
      }]
  });
  schema.plugin(findOrCreate);

  schema.methods.isAdministrador = function isAdministrador() {
    return this.permissao == "usuario";
  }
  schema.methods.isAluno = function isAluno() {
    return this.permissao == "aluno";
  }

  return mongoose.model('Usuario', schema);
}
