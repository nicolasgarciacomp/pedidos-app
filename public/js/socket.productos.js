// Comando para establecer la conexion
var socket = io();

var tabProductos = $('#tabAllProductos');

$(document).ready(function() {
	socket.emit('getProductos', function(resp) {
		for(var i = 0; i < resp.length; i++) {
			var contenido = "";
			contenido += '<tr>';
			contenido += '<td>'+resp[i].id+'</td>';
			contenido += '<td class="w50">'+resp[i].tipo+'</td>';
			contenido += '<td class="w50">'+resp[i].nombre+'</td>';
			contenido += '<td class="w50">'+resp[i].precio+'</td>';
			contenido += '<td class="w50"><a href="actualizar.html?id='+resp[i].id+'" class="btn btn-primary"><i class="fa fa-edit"></i></a></td>';
			contenido += '<td class="w50"><a href="" data-id="'+resp[i].id+'" class="btn btn-danger"><i class="fa fa-trash-o"></i></a></td>';
			contenido += '</tr>';
			tabProductos.append(contenido);
		}
	});
});
