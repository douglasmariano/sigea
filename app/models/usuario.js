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
    }
  });
  schema.plugin(findOrCreate);

  schema.methods.isAdministrador = function isAdministrador() {
    return this.nome != "1";
  }

  return mongoose.model('Usuario', schema);
}
