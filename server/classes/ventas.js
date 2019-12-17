const fs = require('fs');

class Venta {

	constructor(id, producto, precio, cliente) {
		this.id = id;
		this.producto = producto;
		this.precio = precio;
		this.cliente = cliente;
	}

	grabarArchivo() {
		let jsonData = {
			id: this.id,
			producto: this.producto,
			precio: this.precio,
			cliente: this.cliente,
			fecha: new Date().getDate()
		}

		let jsonDataString = JSON.stringify(jsonData);
		fs.writeFileSync('./server/data/ventas.json', jsonDataString);
	}

	getUltimoTicket() {
		let data = require('../data/ventas.json');

		return data;
	}
}

module.exports = {
	Venta
}
