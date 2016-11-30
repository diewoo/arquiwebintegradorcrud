var URL = "http://127.0.0.1:3000/";
$("#Volver").click(function(){
    window.location.href = "/usuarios.html";   

});


$("#Agregar").click(function(){
	  
	var tipo=0
    var nombre = $("#nombre").val();

    var username = $("#username").val();
    var password = $("#password").val();
    var nrosuministro = $("#nrosuministro").val();
    var usuario =
            {
                "nombre": nombre,
               	"username":username,
               	"password":password,
               	"nrosuministro":nrosuministro,
               	"tipo":0
            };

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
      
      

    $.ajax({
        type: "POST",
        url: URL + "usuario/registro/",
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(usuario),
        success: function (r) {
        	swal('registro relaizado!').then(function go(){
        			window.location.href = "/agregarconsumo.html";
        	})
                //localStorage.setItem("correo", correo);
                  
            
        }
    });
/*    var nombre = $("#nombre").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var nrosuministro = $("#nrosuministro").val();
    var usuario =
            {
                "nombre": nombre,
                "username":username,
                "password":password,
                "nrosuministro":nrosuministro,
                
            };*/






});