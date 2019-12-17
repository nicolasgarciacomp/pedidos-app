// Comando para establecer la conexion
var socket = io();

var divProductos = $('#divAllProductos');

$('button').on('click', '#btnAllProductos', function() {
	socket.emit('getProductos', function(resp) {
		divProductos.text(resp);
	});
});
