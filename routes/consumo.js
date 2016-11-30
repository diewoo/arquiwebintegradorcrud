'use strict'
const express=require('express'),
	app=express(),
	mongoose=require('mongoose');


var models=require('../models/consumo')(app, mongoose);
var consumoCTRL = require('../controllers/consumo');


//router
var consumo=express.Router();



//metodos CRUD CONSUMO Y CONSUMO POR USUARIO
consumo.route('/consumosusuarios')
	  	.get(consumoCTRL.obtenerTodosLosConsumosdeUsuarios)
	  	
consumo.route('/consumos/:id')
	  .get(consumoCTRL.obtenerLosConsumosUsuario)
	  .delete(consumoCTRL.deleteUsuario)
consumo.route('/consumos/')	  
	  .post(consumoCTRL.validarConsumo)


	  consumo.route('/cola/')
	  			.post(consumoCTRL.procesarCola)
/*
consumo.route('/consumos/:id/:nrosuministro')
	 	.put(consumoCTRL.actualizarUnConsumoDelUsuario)*/
consumo.route('/usuarios/')
	.get(consumoCTRL.obtenerUsuarios)
consumo.route('/login/')
	.post(consumoCTRL.validLogin)
consumo.route('/desencolar/')
	.get(consumoCTRL.desencolar)
	
consumo.route('/usuarios/:id')
	.delete(consumoCTRL.eliminarUsuario)
	.put(consumoCTRL.actualizarUsuario)
	.get(consumoCTRL.obtenerUsuario)
	
consumo.route('/registro/')
	.post(consumoCTRL.registrarUsuario)

//.delete(consumoCTRL.deleteConsumoPorUsuario)
module.exports=consumo;