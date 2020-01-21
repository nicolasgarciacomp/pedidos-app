// Comando para establecer la conexion
var socket = io();

// Referencias de jQuery
var detalle = $('#tab-detalle');
var selectMes = $('#sel-mes');
var cantBurger = 0;
var cantLomo = 0;
var cantPizza = 0;
var totalBurger = 0;
var totalLomo = 0;
var totalPizza = 0;

$(document).ready(function() {
	
	// Listeners
	socket.emit('getVentas', function(resp) {
		for(var i = 0; i < resp.length; i++) {
			var contenido = "";
			contenido += '<tr>';
			contenido += '<td>'+resp[i].id+'</td>';
			contenido += '<td class="w50">'+resp[i].cliente+'</td>';
			contenido += '<td class="w50">'+resp[i].direccion+'</td>';
			contenido += '<td class="w50">'+resp[i].tipo+'</td>';
			contenido += '<td class="w50">'+resp[i].nombre+'</td>';
			contenido += '<td class="w50">'+'$'+resp[i].precio+'</td>';
			contenido += '<td class="w50">'+resp[i].cantidad+'</td>';
			contenido += '<td class="w50">'+resp[i].fecha+'</td>';
			contenido += '</tr>';
			detalle.append(contenido);
		}
	});

	selectMes.on('change', function(e) {
		e.preventDefault();
		console.log(selectMes.val());
		socket.emit('getPorMes', {
			mes: selectMes.val()
		}, function(resp) {
			var cantBurger = 0;
			var cantLomo = 0;
			var cantPizza = 0;
			var totalBurger = 0;
			var totalLomo = 0;
			var totalPizza = 0;
			detalle.empty();
			$('#text-cant-burger').empty();
			$('#text-cant-lomo').empty();
			$('#text-cant-pizza').empty();
			$('#text-total-burger').empty();
			$('#text-total-lomo').empty();
			$('#text-total-pizza').empty();
			for(var i = 0; i < resp.length; i++) {
				var contenido = "";
				contenido += '<tr>';
				contenido += '<td>'+resp[i].id+'</td>';
				contenido += '<td class="w50">'+resp[i].cliente+'</td>';
				contenido += '<td class="w50">'+resp[i].direccion+'</td>';
				contenido += '<td class="w50">'+resp[i].tipo+'</td>';
				contenido += '<td class="w50">'+resp[i].nombre+'</td>';
				contenido += '<td class="w50">'+'$'+resp[i].precio+'</td>';
				contenido += '<td class="w50">'+resp[i].cantidad+'</td>';
				contenido += '<td class="w50">'+resp[i].fecha+'</td>';
				contenido += '</tr>';
				detalle.append(contenido);

				if(resp[i].tipo == 'Burger') {
					cantBurger = cantBurger + Number(resp[i].cantidad);
					totalBurger = totalBurger + (Number(resp[i].precio)*Number(resp[i].cantidad));
				}

				if(resp[i].tipo == 'Lomo') {
					cantLomo = cantLomo + Number(resp[i].cantidad);
					totalLomo = totalLomo + (Number(resp[i].precio)*Number(resp[i].cantidad));
				}

				if(resp[i].tipo == 'Pizza') {
					cantPizza = cantPizza + Number(resp[i].cantidad);
					totalPizza = totalPizza + (Number(resp[i].precio)*Number(resp[i].cantidad));
				}
			}
			console.log(resp);
			$('#text-cant-burger').val(cantBurger);
			$('#text-cant-lomo').val(cantLomo);
			$('#text-cant-pizza').val(cantPizza);
			$('#text-total-burger').val('$'+totalBurger);
			$('#text-total-lomo').val('$'+totalLomo);
			$('#text-total-pizza').val('$'+totalPizza);
		});
	});
});
