const fs = require('fs');

class Producto {
	constructor(id, tipo, nombre, precio) {
		this.id = id;
		this.tipo = tipo;
		this.nombre = nombre;
		this.precio = precio;
	}

	grabarArchivo() {
		let jsonData = {
			id: this.id,
			tipo: this.tipo,
			nombre: this.nombre,
			precio: this.precio
		}

		let jsonDataString = JSON.stringify(jsonData);
		fs.writeFileSync('./server/data/productos.json', jsonDataString);
	}

	getProductos() {
		let data = require('../data/productos.json');

		return data;
	}

	getProducto(id) {
		let data = require('../data/productos.json');

		for(var i = 0; i <= data.length-1; i++) {
			if(data['"'+i+'"'] === id) {
				return data['"'+i+'"'].nombre;
			}
		}
	}

	getPrecio(nombre) {
		let data = require('../data/productos.json');

		for(var i = 0; i <= data.length-1; i++) {
			if(data['"'+i+'"'].nombre === nombre) {
				return data['"'+i+'"'].precio;
			}
		}
	}
}

module.exports = {
	Producto
}
