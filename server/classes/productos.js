const fs = require('fs');

let listadoProductos = [];

class Producto {

	constructor() {

	}

	grabarArchivo() {
		let data = JSON.stringify(listadoProductos);

		fs.writeFile('../data/productos.json', data, (err) => {
			if(err) throw new Error('No se pudo grabar', err);
		});
	}

	agregarProducto(tipo, nombre, precio) {
		try {
			listadoProductos = require('../data/productos.json');
		} catch(error) {
			listadoProductos = [];
		}

		let nuevoProducto = {
			id: listadoProductos.length,
			tipo: tipo,
			nombre: nombre,
			precio: precio
		};

		listadoProductos.push(nuevoProducto);

		// Grabo archivo
		let data = JSON.stringify(listadoProductos);
		fs.writeFileSync('./server/data/productos.json', data);

		return nuevoProducto;
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
}

module.exports = {
	Producto
}
