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

	actualizar(id, tipo, nombre, precio) {
		try {
			listadoProductos = require('../data/productos.json');
		} catch(error) {
			listadoProductos = [];
		}

		let index = listadoProductos.findIndex(producto => {
			return producto.id == id;
		});

		if(index >= 0) {
			listadoProductos[index].tipo = tipo;
			listadoProductos[index].nombre = nombre;
			listadoProductos[index].precio = precio;

			// Grabo archivo
			let data = JSON.stringify(listadoProductos);
			fs.writeFileSync('./server/data/productos.json', data);
			return true;
		} else {
			return false;
		}
	}

	getProductos() {
		let data = require('../data/productos.json');

		return data;
	}

	getProducto(id) {
		let data = require('../data/productos.json');

		for(var i = 0; i <= data.length-1; i++) {
			if(i == id) {
				return data[i];
			}
		}
	}
}

module.exports = {
	Producto
}
