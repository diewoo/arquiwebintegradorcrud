'use strict'
//Ruta: controllers/consumo.js
var mongoose=require('mongoose');
var Consumo=mongoose.model('usuarioss');
var Queue = require('queuejs');
var queue = new Queue();


var rptaregistroUsuario = function (mensaje,codigo) {
    
    return {
        status: {
            msg: mensaje,
            cod:codigo
        }
    }

};
//obtener todos llos usuarios de la bd
exports.obtenerUsuarios=function(req,res){
    

  
  //var db = mongoose.connection;
  Consumo.find(function(err,usuario){
    if(err) res.send(500,err.message);
    console.log(usuario);
    console.log('GET/usuarios')
        res.status(200).jsonp(usuario);
        
      });
};
//obtener un usuario por id
  
exports.obtenerUsuario=function(req,res){
    

  
  //var db = mongoose.connection;
  Consumo.findById({_id:req.params.id},function(err,usuario){
    if(err) res.send(500,err.message);
    console.log(usuario);
    console.log('GET/usuario')
        res.status(200).jsonp(usuario);
        
      });
};
//respuesta del login
var rptalogin = function (userid,user, mensaje, codigo,tipo,password) {
  return {
    status: {
      msg: mensaje,
      cod: codigo
    },
    user: {
      userid:userid,
      username: user,
      password:password,
      tipo: tipo
    }
  }

};
//respuesta del registro al agregar un usuario
var rptaregistro = function (mensaje, codigo) {
  return {
    status: {
      msg: mensaje,
      cod: codigo
    }
  }

};

var rptaregistroConsumoPorUsuario = function (mensaje,codigo,nrosuministro,nombre) {
    
    return {
        status: {
            msg: mensaje,
            cod:codigo,
            nrosuministro:nrosuministro,
            nombre:nombre
        }
    }

};
var Cola = function (nrosuministro,fechamedicion,consumo) {
    
    return {
                nrosuministro:nrosuministro,
                fechamedicion: fechamedicion,
                consumo:consumo
                   
            
    }

};


//método para validar el login
exports.validLogin=function(req,res){
  var username=req.body.username;
  var password=req.body.password;

  
  
  var passEncriptada = encriptar(username,password)

  //var passdesEncriptada=desencriptar(username,passdesEncriptada)
  Consumo.findOne({username:username},(err,user)=>{
    var rpta={}

    //console.log(passdesEncriptada)
    
    if(user){
      if(user.password==passEncriptada){
        if(err) return res.status(500).send(err.message);
        var tipo=user.tipo; 
        var id=user._id;
        rpta=rptalogin(id,req.body.username,"Login exitoso",1,tipo,password)
        res.status(200).jsonp(rpta);  
      }else{
        
        if(err) return res.status(500).send(err.message);
        rpta=rptalogin(req.body.username,"Contraseña incorrecta",0,'I')
        res.status(200).jsonp(rpta);  
      }
      
    }else{
      
      rpta=rptalogin(req.body.username,"No existe el usuario ",0,'ND')
      res.status(200).jsonp(rpta);
  
      

    }
    

  });
      

};


//funcion para encriptar
function encriptar(user, pass) {
   var crypto = require('crypto')
   // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
   var hmac = crypto.createHmac('sha512', user).update(pass).digest('hex')
   return hmac
}
/*function desencriptar(user,password){
 var crypto = require('crypto')
  var decipher = crypto.createDecipher('sha512',user).update(password).digest('utf8')
  return decipher;  
}*/


exports.registrarUsuario=function(req,res){
    console.log("registro exitoso!");
    var rpta={};
    //var usuario=new User(req.body);
    var nombre=req.body.nombre;
    var username=req.body.username;
    var password=req.body.password;
    var nrosuministro=req.body.nrosuministro;
    var tipo=req.body.tipo;
    var passEncriptada=encriptar(username,password);
    Consumo.findOne({'username':username,'nrosuministro':nrosuministro},function(err,usuario){
      if(!usuario){
        

        var user=new Consumo({

          nombre:nombre,
          username:username,
          password:passEncriptada,
          tipo:tipo,
          nrosuministro:nrosuministro
        })
           user.save((err) => {
            if(err) return res.status(500).send(err.message);
                rpta = rptaregistro("Registro realizado!", 1);
          res.status(200).jsonp(rpta);
        });

      }else{
        if(err) return res.status(500).send(err.message);
        rpta = rptaregistro("Usuario existe o nrosuministro existe!", 0);

        res.status(200).jsonp(rpta);

      }
      
    })
      
  
  
}
  
exports.eliminarUsuario=function(req,res){
  Consumo.findById(req.params.id, function(err, consumo) {
        consumo.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};
exports.actualizarUsuario=function(req,res){


    Consumo.findByIdAndUpdate({_id:req.params.id},{ $set
      : {
      nombre:req.body.nombre,  
      username:req.body.username, 
      password:req.body.password,
      nrosuministro:req.body.nrosuministro,
      tipo:req.body.tipo}},
      {safe: true, upsert: true, new : true},
         function(err, usuario) {
            console.log(err);
              res.status(200).jsonp(usuario); 
          });

   };

//traer todos los consumos de la bd 
exports.obtenerTodosLosConsumosdeUsuarios=function(req,res){
	Consumo.find(function(err,consumos){
		if(err) res.send(500,err.message);
		
		console.log('GET/consumos')
     //console.log(consumos.consumos[0].consumo)
				res.status(200).jsonp(consumos);
			});
};
//obtener un solo consumo
exports.obtenerLosConsumosUsuario = function(req, res) { 
   
    Consumo.findById(req.params.id,function(err, consumo) {
    
    
     
   /* var rpta2={

     "consumo":consumo

    };*/

    
    if(err) res.send(500, err.message);
         console.log(req.body); 
    console.log('POST /consumo/'+ req.params.id)

        res.status(200).jsonp(consumo);

    });
};


//registrar un consumo
exports.validarConsumo=function(req,res){
  	console.log('POST');

	         
        Consumo.findOne({ nrosuministro: req.body.nrosuministro }, (err, dato) => {
             if(err) res.send(500, err.message);
            var rpta = {}
            var cola={}
            if (dato) {
                      rpta = rptaregistroConsumoPorUsuario( "Existe el número de suministro,todo bien! ", 1,  req.body.nrosuministro,dato.nombre)
                      res.status(200).jsonp(rpta);
                      console.log(rpta);

              
                
            } else {
                
                        rpta = rptaregistroConsumoPorUsuario( "No existe el número de suministro a procesar!", 0)
                    res.status(200).jsonp(rpta);
            
                }
                
           
            });
        
		
	};	
    exports.procesarCola=function(req,res){

    
            // if(err) res.send(500, err.message);
            var rpta={}
            var cola={}
            
                     // rpta = rptaregistroConsumoPorUsuario( "Agregado a la cola ,todo bien! ", 1)
                      
                          cola=Cola(req.body.nrosuministro,req.body.fechamedicion,req.body.consumo);
                                //encolar la cola     
                                queue.enq(cola);

                                 console.log('Tamaño de la cola :'+queue.size());
                                 console.log(queue);
                                 console.log(cola.nrosuministro)
                        res.status(200).jsonp(cola);
                        /*
                        for( var i in cola){
                           Consumo.findOneAndUpdate({nrosuministro:cola.nrosuministro},{ $push: {'consumos': {
                        fechamedicion:cola.fechamedicion,consumo:cola.consumo}}},
                        {safe: true, upsert: true, new : true},
                        function(err, consumo) {
                            console.log(err);
                              
                     }) 
                        }*/

                      //agregar un consumo si el suministro existiera!                  
                    /*Consumo.findOneAndUpdate({nrosuministro:req.body.nrosuministro},{ $push: {'consumos': {
                        fechamedicion:req.body.fechamedicion,consumo:req.body.consumo,}}},
                        {safe: true, upsert: true, new : true},
                        function(err, consumo) {
                            console.log(err);
                              
                     });*/
                       

                
                   
              
                
           
            
        
      console.log('POST');
                                 
    }
     exports.desencolar=function(req,res){
       
       console.log(queue);
       /*var nrosuministro=queue.nrosuministro;
       console.log(nrosuministro);*/
       //console.log(queue._elements.nrosuministro);
      // cola=queue;
       for( var i in queue){
              if(queue.size()>0){
                try {
                      Consumo.findOneAndUpdate({nrosuministro:queue._elements[0].nrosuministro},{ $push: {'consumos': {
                        fechamedicion:queue._elements[0].fechamedicion,consumo:queue._elements[0].consumo}}},
                        {safe: true, upsert: true, new : true},
                        function(err, consumo) {
                           console.log(consumo);
                              
                     }) 
                       queue.deq();
                       
   throw "myException"; // generates an exception
}
catch (e) {
   // statements to handle any exceptions
    // pass exception object to error handler
}
                           
                        }else{
                          console.log('cola vacia');
                        }
              }
              for(var cola in queue){
              queue.size();  
              }
              
                     
                     res.status(200).jsonp(queue);
      //  console.log(queue._elements[0].nrosuministro);
       }
       
     
        
    /*                       Consumo.findOneAndUpdate({nrosuministro:queue.nrosuministro},{ $push: {'consumos': {
                        fechamedicion:queue.fechamedicion,consumo:queue.consumo}}},
                        {safe: true, upsert: true, new : true},
                        function(err, consumo) {
                           // console.log(consumo);
                              
                     }) 
                     try {
                       queue.deq();
   throw "myException"; // generates an exception
}
catch (e) {
   // statements to handle any exceptions
    // pass exception object to error handler
}
                           
                        }*/
                       
                       
     

//actualizar un consumo
	 /*exports.actualizarUnConsumoDelUsuario=function(req,res){


	 	Consumo.findByIdAndUpdate({_id:req.params.id,'nrosuministro':req.params.nrosuministro},{ $push
	 		: {'consumos': {
		  consumo:req.body.consumo,
		 	fechamedicion:req.body.fechamedicion}}},
		 	{safe: true, upsert: true, new : true},
       	 function(err, consumo) {
            console.log(err);
            	res.status(200).jsonp(consumo);	
        	});

	 };*/
//borrar un consumo
	

exports.deleteUsuario = function(req, res) {  
    Consumo.findById(req.params.id, function(err, consumo) {
        consumo.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};
/*
exports.deleteConsumoPorUsuario=function(req,res){
	  Consumo.findById({_id:req.params.id,'nrosuministro':req.params.nrosuministro}, function(err, consumo) {
        consumo.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });
};*/