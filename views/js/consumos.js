 var service = "http://127.0.0.1:3000";
 $(document).ready(function(){
 	 jQuery.support.cors = true;
 	    var agregar=' <button id="agregar"  style="float: right ;"class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"><i class="material-icons">loop</i></button>'

 	 $.ajax(
    {
        type: "GET",
        url: service + '/usuario/consumosusuarios',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        //dataType: "json",
        cache: false,
        success: function (data) {
        	 var trHTML = '';
        	 console.log(data)
        	 
        	 	 
        	 	//swal(JSON.stringify(item));
        	 	//console.log(item.datos.consumo);	
             // console.log(data.tipo);
        	 	 
              for ( var contador in data){
                //  if(data.tipo===0){
                  if(data[contador].tipo===0){
                     var codigo=data[contador]._id

                           trHTML += '<tr><td class="mdl-data-table__cell--non-numeric "style="text-align: center ;width:100%;" >' +  
               data[contador].nombre+
               '</td>'+'<td>'+
             
                   '<a   data-id="id" id="'+codigo+'" style="text-align: center ; background-color:#DCEDC8" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect bot-consultar">' +
                    "Ver consumo" +'</td>'
                   +'</tr>'; 
              //}
                  }
          
        	 	 
        	 	 		
        	 
	
        	 	 	
        	 	 	
        	 	 }
        	 
        	 $('#location').append(trHTML);
         $('#botonsitoadd').append(agregar);
         		 
     $('.bot-consultar').click(function (evt ) {
             localStorage.setItem("id", evt.target.id); 
              window.location.href = "/consumousuario.html";
         })

       $('#agregar').click(function(){

         $.ajax(
    {
        type: "GET",
        url: service + '/usuario/desencolar/',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        //dataType: "json",
        cache: false,
        success: function (data) {
          $.each(data, function(index, object){
            swal('todo ok !').then(function go(){
              window.location.href = "/consumosusuarios.html";
          })  
           
          })
           
        }
})

       })













         	 },
        
        error: function (msg) {
            
            alert(msg.responseText);
        }

    
})

 });	