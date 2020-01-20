// Comando para establecer la conexion
var socket = io();

var tabClientes = $('#tabAllClientes');
var buttonInsert = $('#btn-insert1');
var nuevoNombre = $('#text-nombre');
var nuevoDireccion = $('#text-direccion');
var nuevoTelefono = $('#text-telefono');

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
	
	socket.emit('getClientes', function(resp) {
		respOrdenado = ordenarPorClave(resp, "nombre");
		for(var i = 0; i < resp.length; i++) {
			var contenido = "";
			contenido += '<tr>';
			contenido += '<td>'+respOrdenado[i].id+'</td>';
			contenido += '<td class="w50">'+respOrdenado[i].nombre+'</td>';
			contenido += '<td class="w50">'+respOrdenado[i].direccion+'</td>';
			contenido += '<td class="w50">'+respOrdenado[i].telefono+'</td>';
			contenido += '<td class="w50"><a href="modify-clientes.html?id='+respOrdenado[i].id+'" class="btn btn-primary"><i class="fa fa-edit"></i></a></td>';
			contenido += '<td class="w50"><a href="delete-clientes.html?id='+respOrdenado[i].id+'" class="btn btn-danger"><i class="fa fa-trash-o"></i></a></td>';
			contenido += '</tr>';
			tabClientes.append(contenido);
		}
	});

	buttonInsert.on('click', function(e) {
		e.preventDefault();
		socket.emit('agregarCliente', {
			nombre: nuevoNombre.val(),
			direccion: nuevoDireccion.val(),
			telefono: nuevoTelefono.val()
		}, function(resp) {
			console.log(resp);
		});
		swal("Hecho!", "Registro insertado con éxito!", "success");
	});
});
