// Comando para establecer la conexion
var socket = io();

var detalle = $('#tab-detalle');

/**
 * @name	ordenarPorClave
 *
 * @description	Ordena los usuarios por orden alfabetico
 *
 * @param	{array, number}
 *
 * @return  {array}
**/
function ordenarPorClave(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

$(document).ready(function() {
	
	socket.emit('getEnCola', function(resp) {
		respOrdenado = ordenarPorClave(resp, "id");
		for(var i = 0; i < resp.length; i++) {
			var contenido = "";
			contenido += '<tr id="'+respOrdenado[i].id+'">';
			contenido += '<td>'+respOrdenado[i].id+'</td>';
			contenido += '<td class="w50">'+respOrdenado[i].cliente+'</td>';
			contenido += '<td class="w50">'+respOrdenado[i].direccion+'</td>';
			contenido += '<td class="w50">'+respOrdenado[i].tipo+'</td>';
			contenido += '<td class="w50">'+respOrdenado[i].nombre+'</td>';
			contenido += '<td class="w50">'+'$'+respOrdenado[i].precio+'</td>';
			contenido += '<td class="w50">'+respOrdenado[i].cantidad+'</td>';
			contenido += '<td class="w50">'+respOrdenado[i].fecha+'</td>';
			contenido += '<td class="w50"><button data-id="'+respOrdenado[i].id+'" id="'+respOrdenado[i].id+'" class="btn btn-primary" onClick="a(id);"><i class="fa fa-check"></i></button></td>';
			contenido += '</tr>';
			detalle.append(contenido);
		}
	});

});

function a(id) {
	socket.emit('pasarListo', {
		id: id
	}, function(resp) {
		console.log(resp);
	});
	$('#' + id).remove();
}
