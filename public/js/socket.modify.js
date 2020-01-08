// Comando para establecer la conexion
var socket = io();

var params = new URLSearchParams(window.location.search);
var id = params.get('id');

var tabProductos = $('#tabAllProductos');
var buttonModify = $('#btn-modify1');
var nuevoTipo = $('#text-tipo');
var nuevoNombre = $('#text-nombre');
var nuevoPrecio = $('#text-precio');

$(document).ready(function() {

	socket.emit('getProducto', {
		id: id
	}, function(resp) {
		console.log(resp);
		nuevoTipo.val(resp.tipo);
		nuevoNombre.val(resp.nombre);
		nuevoPrecio.val(resp.precio);
	});

	buttonModify.on('click', function(e) {
		e.preventDefault();
		socket.emit('actualizar', {
			id: id,
			tipo: nuevoTipo.val(),
			nombre: nuevoNombre.val(),
			precio: nuevoPrecio.val()
		}, function(resp) {
			console.log(resp);
		});
		swal("Hecho!", "Registro modificado con éxito!", "success");
	});
});
