//var URL = "http://127.0.0.1:3000/";
 var URL = "https://arquisw-integrador.herokuapp.com/";
var id =localStorage.getItem("id");
console.log(id);

 $(document).ready(function(){
 	 $.ajax(
    {
        type: "GET",
        url: URL + 'usuario/consumos/'+id,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        //dataType: "json",
        cache: false,
        success: function (data) {

        	var trHTML = '';

        	//$.each(data, function (i, item) {
            	console.log(data);
                var rpta= JSON.stringify(data);
                     //console.log(id2)
                for ( var i in data.consumos){
                	trHTML += '<tr><td class="mdl-data-table__cell--non-numeric "style="text-align: center ;width:100%;" >' +  
                data.consumos[i].consumo +
                 '</td>'+
                  '<td class="mdl-data-table__cell--non-numeric "style="text-align: center ;width:100%;">' 

            + data.consumos[i].fechamedicion + 
            '</td>' + 
            

            '<td>'
             + data.nrosuministro 
             + '</td>'
                    +'</tr>';    
           // })
            	
                }     
                
        
        
        $('#location').append(trHTML);
         
            
        

   
    
        
      
        
       
       
 
        },
        
        error: function (msg) {
            
            alert(msg.responseText);
        }
    
        
    })

 	});