// Comando para establecer la conexion
var socket = io();

var buttonAgrega = $('#btn-agrega1');
var buttonConfirma = $('#btn-confirma1');

var selectTipo = $('#sel-tipo');
var selectProducto = $('#sel-producto');

$(document).ready(function() {
	
	socket.emit('getProductos', function(resp) {
		for(var i = 0; i < resp.length; i++) {
			var contenido = "";
			contenido += '<option value="'+resp[i].tipo+'">'+resp[i].tipo+'</option>';
			selectTipo.append(contenido);
		}
	});

	selectTipo.on('change', function (e) {
		e.preventDefault();
		socket.emit('getPorTipo', {
			tipo: selectTipo.val()
		}, function(resp) {
			selectProducto.empty();
			var contenido = "";
			contenido += '<option selected>Seleccionar...</option>';
			selectProducto.append(contenido);
			for(var i = 0; i < resp.length; i++) {
				var contenido = "";
				contenido += '<option value="'+resp[i].nombre+'">'+resp[i].nombre+'</option>';
				selectProducto.append(contenido);
		}
		});
	});
});
