const fs = require('fs');

let ventas = [];

class Venta {

	constructor() {
		
	}

	grabarArchivo() {
		let data = JSON.stringify(ventas);

		fs.writeFile('../data/ventas.json', data, (err) => {
			if(err) throw new Error('No se pudo grabar', err);
		});
	}

	agregarVenta(cliente, direccion, tipo, nombre, precio, cantidad) {
		try {
			ventas = require('../data/ventas.json');
		} catch(error) {
			ventas = [];
		}

		// Formateo Date para tener fecha y hora
		var hoy = new Date();
		var fecha = hoy.getDate() + '-' + (hoy.getMonth()+1) + '-' + hoy.getFullYear();
		var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
		var fechaYHora = fecha + ' ' + hora;

		let nuevaVenta = {
			id: ventas.length,
			cliente: cliente,
			direccion: direccion,
			tipo: tipo,
			nombre: nombre,
			precio: precio,
			cantidad: cantidad,
			fecha: fechaYHora,
			estado: 'Pendiente'
		};
		
		ventas.push(nuevaVenta);

		// Grabo archivo
		let data = JSON.stringify(ventas);
		fs.writeFileSync('./server/data/ventas.json', data);

		return nuevaVenta;
	}

	getVentas() {
		let data = require('../data/ventas.json');

		return data;
	}

	getPorMes(mes) {
		try {
			ventas = require('../data/ventas.json');
		} catch(error) {
			ventas = [];
		}

		let nuevoListado = ventas.filter(venta => {
			var v = venta.fecha.split('-');
			return v[1] == mes;
		});

		return nuevoListado;
	}

	getEnCola() {
		try {
			ventas = require('../data/ventas.json');
		} catch(error) {
			ventas = [];
		}

		let nuevoListado = ventas.filter(venta => {
			return venta.estado == 'Pendiente';
		});

		return nuevoListado;
	}
}

module.exports = {
	Venta
}
