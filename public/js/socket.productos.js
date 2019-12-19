// Comando para establecer la conexion
var socket = io();

var tabProductos = $('#tabAllProductos');

$(document).ready(function() {
	socket.emit('getProductos', function(resp) {
		for(var i = 0; i < resp.length; i++) {
			tabProductos.append('<tr>');
			tabProductos.append('<td>'+resp[i].id+'</td>');
			tabProductos.append('<td>'+resp[i].tipo+'</td>');
			tabProductos.append('<td>'+resp[i].nombre+'</td>');
			tabProductos.append('<td>'+resp[i].precio+'</td>');
			tabProductos.append('<td><a href="actualizar.html?id='+resp[i].id+'" class="btn btn-primary"><i class="fa fa-edit"></i></a></td>');
			tabProductos.append('<td><a href="" data-id="'+resp[i].id+'" class="btn btn-danger"><i class="fa fa-trash-o"></i></a></td>');
			tabProductos.append('</tr>');
		}
	});
});
