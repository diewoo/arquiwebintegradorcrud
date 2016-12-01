//se inicializa el documento de login



//$(document).ready(function(){
    var URL = "http://127.0.0.1:3000/";

		$("#ingresar").click(function(){
			var username= $("#username").val()
	        var password= $("#password").val()
	        var user ={
                        "username": username,
                        "password": password
                        };
         
		if(user === ""){
			swal('campo de nombre vacio');	
			 return false;
		}else if(password === ""){
			swal("Campo password  vacio");
			return false;
		}

        //LLAMDA AL SERVIDOR CON POST
		$.ajax({
        type: "POST",
        url: URL + "usuario/login/",
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function (r) {
            if (r.user.tipo === 1 ) {
                if (r.status.cod === 1) {
                localStorage.setItem("usuario", username);
                 swal(r.status.msg).then(function go(){
                 window.location.href = "/admin.html";   
                 })
                }
                 
            }else if (r.user.tipo === 0){
                 if (r.status.cod === 1) {

                    localStorage.setItem("id", r.user.userid);
                    

                 swal(r.status.msg).then(function go(){
                 window.location.href = "/usuario.html";   
                 })
                }
            }

            if(r.user.cod===0 || r.user.tipo==='I'){
                swal(r.status.msg).then(function go(){
                 window.location.href = "/index.html";   
                 })
            }else if(r.user.cod===0|| r.user.tipo==='ND'){
                swal(r.status.msg).then(function go(){
                 window.location.href = "/index.html";   
                 })
            }
                 
            
        }
   });	

	});



	
		


