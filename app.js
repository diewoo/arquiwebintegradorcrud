	'use strict'
//constantes y paquetes
const cool = require('cool-ascii-faces');
const express=require('express'),
	app=express(),
	path=require('path'),
	bodyParser=require('body-parser'),
	methodOverride=require('method-override'),
	mongoose=require('mongoose');

//conexion a mongo lab
const database = process.env.MONGO_URL || 'mongodb://diewoo:webcamdelima123@ds153667.mlab.com:53667/luzdelnorte';
	mongoose.connect(database,function(err,res){
		if(err) throw err;
			 console.log(`Connected to Database!! `);
		});
//middleware para la web	
	app.use(function(req, res , next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");

	next();
});
	//puerto de conexion
	const port = process.env.PORT || 3000  
	//ruta del routers
	const consumo=require('./routes/consumo');
	//const user=require('./routes/user');

	//middlewares
	app.use(express.static(path.join(__dirname, 'views')));
	app.set('view engine','ejs');
	app.engine('html',require('ejs').renderFile);
	//app.use(express.static(path.join(__dirname, 'public')));
	app.use('/bower_components',  express.static(__dirname + '/bower_components'));
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.locals.pretty = true;

	
	//ruta de los paths
	app.use('/usuario', consumo);
	//app.use('/api',user);	

//metodo cool de testeo del servidor
app.get('/cool', function (request, response) {
	response.send(cool());
});
app.get('/', function (req, res) {
		res.render('index.html');
});


// Inciar el  server en el puerto definido
app.listen(port, function() {
    			console.log(`Servidor ejecutandose en el puerto: ${port}`);
  			});
   		 





