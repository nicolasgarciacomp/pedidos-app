// Comando para establecer la conexion
var socket = io();

var params = new URLSearchParams(window.location.search);
var id = params.get('id');

// Referencias de jQuery
var tabClientes = $('#tabAllClientes');
var buttonModify = $('#btn-modify1');
var nuevoNombre = $('#text-nombre');
var nuevoDireccion = $('#text-direccion');
var nuevoTelefono = $('#text-telefono');

$(document).ready(function() {
	// Listeners
	socket.emit('getCliente', {
		id: id
	}, function(resp) {
		nuevoNombre.val(resp.nombre);
		nuevoDireccion.val(resp.direccion);
		nuevoTelefono.val(resp.telefono);
	});

	buttonModify.on('click', function(e) {
		e.preventDefault();
		socket.emit('actualizarCliente', {
			id: id,
			nombre: nuevoNombre.val(),
			direccion: nuevoDireccion.val(),
			telefono: nuevoTelefono.val()
		}, function(resp) {
			//console.log(resp);
		});
		swal("Hecho!", "Registro modificado con éxito!", "success");
	});
});
