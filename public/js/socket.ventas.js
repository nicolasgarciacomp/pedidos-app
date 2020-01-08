// Comando para establecer la conexion
var socket = io();

var detalle = $('#tab-detalle');

$(document).ready(function() {
	
	socket.emit('getVentas', function(resp) {
		for(var i = 0; i < resp.length; i++) {
			var contenido = "";
			contenido += '<tr>';
			contenido += '<td>'+resp[i].id+'</td>';
			contenido += '<td class="w50">'+resp[i].cliente+'</td>';
			contenido += '<td class="w50">'+resp[i].direccion+'</td>';
			contenido += '<td class="w50">'+resp[i].tipo+'</td>';
			contenido += '<td class="w50">'+resp[i].nombre+'</td>';
			contenido += '<td class="w50">'+'$'+resp[i].precio+'</td>';
			contenido += '<td class="w50">'+resp[i].cantidad+'</td>';
			contenido += '<td class="w50">'+resp[i].fecha+'</td>';
			contenido += '</tr>';
			detalle.append(contenido);
		}
	});
});
