// Comando para establecer la conexion
var socket = io();

var params = new URLSearchParams(window.location.search);
var id = params.get('id');

// Referencias de jQuery
var tabClientes = $('#tabAllClientes');
var buttonDelete = $('#btn-delete1');
var nuevoNombre = $('#text-nombre');
var nuevoDireccion = $('#text-direccion');
var nuevoTelefono = $('#text-telefono');

$(document).ready(function() {

	// Listeners
	socket.emit('getCliente', {
		id: id
	}, function(resp) {
		console.log(resp);
		nuevoNombre.val(resp.nombre);
		nuevoDireccion.val(resp.direccion);
		nuevoTelefono.val(resp.telefono);
	});

	buttonDelete.on('click', function(e) {
		e.preventDefault();
		socket.emit('eliminarCliente', {
			id: id
		}, function(resp) {
			console.log(resp);
		});
		swal("Hecho!", "Registro eliminado con éxito!", "success");
	});
});
