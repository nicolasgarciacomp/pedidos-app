// Comando para establecer la conexion
var socket = io();

var params = new URLSearchParams(window.location.search);
var id = params.get('id');

// Referencias de jQuery
var tabProductos = $('#tabAllProductos');
var buttonDelete = $('#btn-delete1');
var nuevoTipo = $('#text-tipo');
var nuevoNombre = $('#text-nombre');
var nuevoPrecio = $('#text-precio');
var nuevoMedia = $('#text-media');

$(document).ready(function() {
	// Listeners
	socket.emit('getProducto', {
		id: id
	}, function(resp) {
		nuevoTipo.val(resp.tipo);
		nuevoNombre.val(resp.nombre);
		nuevoPrecio.val(resp.precio);
		nuevoMedia.val(resp.media);
	});

	buttonDelete.on('click', function(e) {
		e.preventDefault();
		socket.emit('eliminar', {
			id: id
		}, function(resp) {
			//console.log(resp);
		});
		swal("Hecho!", "Registro eliminado con éxito!", "success");
	});
});
