// Comando para establecer la conexion
var socket = io();

// Referencias de jQuery
var tabProductos = $('#tabAllProductos');
var buttonInsert = $('#btn-insert1');
var nuevoTipo = $('#text-tipo');
var nuevoNombre = $('#text-nombre');
var nuevoPrecio = $('#text-precio');

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
	
	// Listeners
	socket.emit('getProductos', function(resp) {
		respOrdenado = ordenarPorClave(resp, "tipo");
		for(var i = 0; i < resp.length; i++) {
			var contenido = "";
			contenido += '<tr>';
			contenido += '<td>'+respOrdenado[i].id+'</td>';
			contenido += '<td class="w50">'+respOrdenado[i].tipo+'</td>';
			contenido += '<td class="w50">'+respOrdenado[i].nombre+'</td>';
			contenido += '<td class="w50">'+'$'+respOrdenado[i].precio+'</td>';
			contenido += '<td class="w50"><a href="modify.html?id='+respOrdenado[i].id+'" class="btn btn-primary"><i class="fa fa-edit"></i></a></td>';
			contenido += '<td class="w50"><a href="delete.html?id='+respOrdenado[i].id+'" class="btn btn-danger"><i class="fa fa-trash-o"></i></a></td>';
			contenido += '</tr>';
			tabProductos.append(contenido);
		}
	});

	buttonInsert.on('click', function(e) {
		e.preventDefault();
		socket.emit('agregarProducto', {
			tipo: nuevoTipo.val(),
			nombre: nuevoNombre.val(),
			precio: nuevoPrecio.val()
		}, function(resp) {
			console.log(resp);
		});
		swal("Hecho!", "Registro insertado con éxito!", "success");
	});
});
