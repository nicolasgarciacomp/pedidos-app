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

	agregarVenta(cliente, tipo, nombre, precio, cantidad) {
		try {
			ventas = require('../data/ventas.json');
		} catch(error) {
			ventas = [];
		}

		let nuevaVenta = {
			id: ventas.length,
			cliente: cliente,
			tipo: tipo,
			nombre: nombre,
			precio: precio,
			cantidad: cantidad,
			fecha: new Date().getDate()
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
}

module.exports = {
	Venta
}
