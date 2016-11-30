 var service = "http://127.0.0.1:3000";

$(document).ready(function(){

    jQuery.support.cors = true;
    var $modal = $('#ajax-modal');
   var agregar=' <button id="agregar"  style="float: right ;"class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"><i class="material-icons">add</i></button>'
   var eliminar='<a  id="" data-id="mongo id here" style="text-align: center ; background-color:#F44336" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">'
   var editar='<a id="" style="text-align: center ; background-color:#FFF9C4" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">'
   

    $.ajax(
    {
        type: "GET",
        url: service + '/usuario/usuarios',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        //dataType: "json",
        cache: false,
        success: function (data) {
            
        var trHTML = '';
        var arreglo=[];
                
        $.each(data, function (i, item) {
            if(item.tipo===0){
                var codigo=$(item).attr("_id")
                var string = 'id='+ codigo ;
                 
                console.log(string)
                //console.log(id2)
                trHTML += '<tr><td class="mdl-data-table__cell--non-numeric "style="text-align: center ;width:100%;" >' +  
                item.nombre +
                 '</td>'+
                  '<td class="mdl-data-table__cell--non-numeric "style="text-align: center ;width:100%;">' 

            + item.username + 
            '</td>'+
                 '<td class="mdl-data-table__cell--non-numeric "style="text-align: center ;width:100%;">' 

            + item.password + 
            '</td>'+

            '<td>'
             + item.nrosuministro 
             + '</td>'+'<td>'+
                    '<a   data-id="id"  id="'+codigo+'"style="text-align: center ; background-color:#FFF9C4" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect bot-editar">'+
                    "Editar" +
              "<div class='mdl-layout-spacer'></div>"+

              '</td>'+'<td>'+
             
                   '<a   data-id="id" id="'+ codigo+'" style="text-align: center ; background-color:#F44336" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect bot-eliminar">' +
                    "Eliminar" +
                    

             "<div class='mdl-layout-spacer'></div>"+
             '</td>'+'<td>'+
                     
                 "<input type='hidden' name='data-id' value='my id'id='delete' />"+
                    

             "<div class='mdl-layout-spacer'></div>"+
             '</td>'
                    +'</tr>';    
            }
            
        });
        
        $('#location').append(trHTML);
         $('#botonsitoadd').append(agregar);
            
      $('#agregar').click(function () {
        
        window.location.href = "/agregarconsumo.html"; 
        });

     $('.bot-eliminar').click(function (evt ) {

                    $.ajax({
                    url: URL+'usuario/usuarios/'+ evt.target.id,
                    type: 'DELETE',
                success: function(result) {
                   window.location.href='/usuarios.html'

                }
            });
                
            });

     $('.bot-editar').click(function (evt) {
        $.ajax({
        type: "GET",
        url: service + '/usuario/usuarios/'+ evt.target.id,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        //dataType: "json",
        cache: false,
        success: function (data) {
           
           
            console.log(data.nombre);
            localStorage.setItem("id", evt.target.id);
            localStorage.setItem("nombre",data.nombre);
            localStorage.setItem("username",data.username);
             localStorage.setItem("password",data.password);
             localStorage.setItem("nrosuministro",data.nrosuministro);



       window.location.href='/editarconsumo.html'
          

           

       
        
            
        }

    })

        
      
        
       
        });
 
        },
        
        error: function (msg) {
            
            alert(msg.responseText);
        }
    })
   

       /*$.ajax({
        type: "POST",
        url: URL + "usuario/usuarios/:id",
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function (i,item) {
            
                 
            
        }
   });*/  


});