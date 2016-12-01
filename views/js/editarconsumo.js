//var URL = "http://127.0.0.1:3000/";
 var URL = "https://arquisw-integrador.herokuapp.com/";
var id = localStorage.getItem("id");
var nombre = localStorage.getItem("nombre");
var username=localStorage.getItem("username");
var password=localStorage.getItem("password");
var nrosuministro=localStorage.getItem("nrosuministro");
	console.log(id);
    console.log(nombre);
    $(document).ready(function () {
        var tipo=0
    $("#nombre").val(nombre);
    $("#username").val(username);
    $("#password").val(password);
    $("#nrosuministro").val(nrosuministro); 

           
    //var nombre = $("#nombre").val(nombre);
    //console.log(nombre)
    //var username = $("#username").val(username);
    //var password = $("#password").val(password);
    //var nrosuministro = $("#nrosuministro").val(nrosuministro);

$("#Volver").click(function(){
	window.location.href = "/usuarios.html";   

});



$("#Modificar").click(function(){
      

    var nombre = $("#nombre").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var nrosuministro = $("#nrosuministro").val();
    var tipo=0
    var usuario =
            {
                "nombre": nombre,
                "username":username,
                "password":password,
                "nrosuministro":nrosuministro,
                "tipo":0
            };
    /*
     if(nombre === ""){
            swal('campo de nombre vacio');  
             return false;
        }else if(username === ""){
            swal("Campo username  vacio");
            return false;
        }else if(password === ""){
            swal("Campo password  vacio");
            return false;
        }else if(nrosuministro === ""){
            swal("Campo numero de suministro  vacio");
            return false;
        }

      */  
               
    $.ajax({
        type: "PUT",
        url: URL + "usuario/usuarios/"+id,
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (r) {
            swal('cambios hechos').then(function go(){
                    window.location.href = "/editarconsumo.html";
            })
                //localStorage.setItem("correo", correo);
                  
            
        }
    });

});
});