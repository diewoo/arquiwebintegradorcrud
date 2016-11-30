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
        	 console.log(JSON.stringify(data))
        	 $.each(data, function (i, item) {
        	 	 
        	 	//swal(JSON.stringify(item));
        	 	//console.log(item.datos.consumo);	

        	 	 if(item.tipo===0){
        	 	 
        	 	 		 trHTML += '<tr><td class="mdl-data-table__cell--non-numeric "style="text-align: center ;width:100%;" >' +  
        	 	 	 item.nombre+
        	 	 	 '</td>'+

                  '<td class="mdl-data-table__cell--non-numeric "style="text-align: center ;width:100%;">' +
                  item.nrosuministro+
                  +'</td>'+
                  '<td class="mdl-data-table__cell--non-numeric "style="text-align: center ;width:100%;">'+
                  item.consumos.consumo+
                  '</td>'+
                  '<td class="mdl-data-table__cell--non-numeric "style="text-align: center ;width:100%;">'+
                  item.consumos.fecha+'</td>'
                   +'</tr>'; 
        	 
	
        	 	 	
        	 	 	
        	 	 }
        	 });
        	 $('#location').append(trHTML);
         $('#botonsitoadd').append(agregar);
         		 
         $("#agregar").click(function(){

         	 $.ajax({
                type: 'GET',
                url: '/usuario/desencolar',
                success: function(data){
                    $.each(data, function(index, object){
                    	if(object.length===0){
                    		    		swal('todo ok !').then(function go(){
        			window.location.href = "/consumosusuarios.html";
        	})	
 		

                    	}else{
                    		swal('todo ok! ').then(function go(){
        			window.location.href = "/consumosusuarios.html";
        	})	

                    		
                    	}
                        
                    });
                }
            });
        
         });	
         	 },
        
        error: function (msg) {
            
            alert(msg.responseText);
        }

    
})

 });	