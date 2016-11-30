	const mongoose=require('mongoose'),
	Schema=mongoose.Schema;
//var id = mongoose.Types.ObjectId();
const consumoSchema=new Schema({
	
	nombre: String,
	username:String,
    password: String,
    tipo:Number,
	nrosuministro:String,
	consumos:[{
	}]
});
	
module.exports=mongoose.model('usuarioss',consumoSchema);