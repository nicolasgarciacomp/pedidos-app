// Comando para establecer la conexion
var socket = io();

var buttonAgrega = $('#btn-agrega1');
var buttonConfirma = $('#btn-confirma1');
var nombreCliente = $('#text-nombre');
var direccion = $('#text-direccion');
var selectTipo = $('#sel-tipo');
var selectProducto = $('#sel-producto');
var cantidad = $('#text-cantidad');
var detalle = $('#tab-detalle');
var total = $('#text-total');
var totalDeVenta = 0;

$(document).ready(function() {

	selectTipo.on('change', function(e) {
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
				contenido += '<option value="'+resp[i].nombre+'">'+resp[i].nombre+' - $'+resp[i].precio+'</option>';
				selectProducto.append(contenido);
			}
		});
	});

	buttonAgrega.on('click', function(e) {
		e.preventDefault();
		var nuevoPrecio = $("#sel-producto option:selected").text().split('$');
		totalDeVenta = totalDeVenta + (Number(nuevoPrecio[1])*Number(cantidad.val()));
		total.val('$'+totalDeVenta);
		socket.emit('agregarVenta', {
			cliente: nombreCliente.val(),
			direccion: direccion.val(),
			tipo: selectTipo.val(),
			nombre: selectProducto.val(),
			precio: nuevoPrecio[1],
			cantidad: cantidad.val()
		}, function(resp) {
			var contenido = "";
			contenido += '<tr>';
			contenido += '<td>'+resp.id+'</td>';
			contenido += '<td class="w50">'+resp.cliente+'</td>';
			contenido += '<td class="w50">'+resp.direccion+'</td>';
			contenido += '<td class="w50">'+resp.tipo+'</td>';
			contenido += '<td class="w50">'+resp.nombre+'</td>';
			contenido += '<td class="w50">'+'$'+resp.precio+'</td>';
			contenido += '<td class="w50">'+resp.cantidad+'</td>';
			contenido += '</tr>';
			detalle.append(contenido);
		});
	});

	buttonConfirma.on('click', function(e) {
		e.preventDefault();
		swal({
  			title: "Confirmar venta?",
  			text: "Estas a punto de confirmar la venta!",
  			icon: "warning",
  			buttons: true,
		})
		.then((willDelete) => {
  			if(willDelete) {
    			swal("Venta confirmada!", {
      				icon: "success",
    			});
    			window.location.href = "http://app-nico-pizza.herokuapp.com/index.html";
  			} else {
    			swal("Venta cancelada!");
  			}
		});
	});
});
