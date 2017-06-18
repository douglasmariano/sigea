var mongoose = require('mongoose');

module.exports = function(){
  var schema = mongoose.Schema({
    nome: {
      type: String,
      required: true
    },
    faculdade:{
      type: mongoose.Schema.ObjectId,
      ref:'Faculdade'
    }

  });


  return mongoose.model('Curso', schema);
};
