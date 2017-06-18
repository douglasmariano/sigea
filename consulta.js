var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var _idProcurado = new ObjectID('588116345f3f7d04bdad801d');

MongoClient.connect('mongodb://127.0.0.1:27017/contatooh',
    function(erro,db){
      if(erro) throw err;
      db.collection('contatos').findOne({_id :_idProcurado},
        function(erro,contato){
          if(erro) throw err;
          console.log(contato);
        }
      );
    }
  );
