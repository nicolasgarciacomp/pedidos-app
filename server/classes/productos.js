/**
 * @fileoverview	./server/classes/productos.js
 *
 * @version         1.0
 *
 * @author          Nicolás Garcia <nicolasgarciacomp@gmail.com>
 *
 * History
 * v1.0 – Se creó el archivo
**/

// Requires
const fs = require('fs');

let listadoProductos = []; // Array para almacenar los productos

class Producto {

	constructor() {

	}

	/**
	 * @name	grabarArchivo
	 *
	 * @description	Escribe en el archivo de datos
	 *
	 * @param	{}
	 *
	 * @return  {}
	**/
	grabarArchivo() {
		let data = JSON.stringify(listadoProductos);

		fs.writeFile('../data/productos.json', data, (err) => {
			if(err) throw new Error('No se pudo grabar', err);
		});
	}

	/**
	 * @name	agregarProducto
	 *
	 * @description	Añade un producto al array listadoProductos
	 *
	 * @param	{string, string, number}
	 *
	 * @return  {object}
	**/
	agregarProducto(tipo, nombre, precio) {
		// Cargo archivo
		try {
			listadoProductos = require('../data/productos.json');
		} catch(error) {
			listadoProductos = [];
		}

		let nuevoProducto = {
			id: listadoProductos.length, // Acá tengo un problema cuando elimino!!
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

	/**
	 * @name	actualizar
	 *
	 * @description	Actualiza datos de un producto
	 *
	 * @param	{number, string, string, number}
	 *
	 * @return  {boolean}
	**/
	actualizar(id, tipo, nombre, precio) {
		// Cargo archivo
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

	/**
	 * @name	eliminar
	 *
	 * @description	Elimina un producto del listado de productos
	 *
	 * @param	{number}
	 *
	 * @return  {boolean}
	**/
	eliminar(id) {
		// Cargo archivo
		try {
			listadoProductos = require('../data/productos.json');
		} catch(error) {
			listadoProductos = [];
		}

		let nuevoListado = listadoProductos.filter(producto => {
			return producto.id != id;
		});

		if(listadoProductos.length == nuevoListado.length) {
			return false;
		} else {
			listadoProductos = nuevoListado;
			
			// Grabo archivo
			let data = JSON.stringify(listadoProductos);
			fs.writeFileSync('./server/data/productos.json', data);
			return true;
		}
	}

	/**
	 * @name	getProductos
	 *
	 * @description	Devuelve todos los productos del listado
	 *
	 * @param	{}
	 *
	 * @return  {object}
	**/
	getProductos() {
		// Cargo archivo
		let data = require('../data/productos.json');

		return data;
	}

	/**
	 * @name	getPorTipo
	 *
	 * @description	Devuelve listado de productos por tipo
	 *
	 * @param	{string}
	 *
	 * @return  {object}
	**/
	getPorTipo(tipo) {
		// Cargo archivo
		try {
			listadoProductos = require('../data/productos.json');
		} catch(error) {
			listadoProductos = [];
		}

		let nuevoListado = listadoProductos.filter(producto => {
			return producto.tipo == tipo;
		});

		return nuevoListado;
	}

	/**
	 * @name	getProducto
	 *
	 * @description	Devuelve un producto por id
	 *
	 * @param	{number}
	 *
	 * @return  {object}
	**/
	getProducto(id) {
		// Cargo archivo
		let data = require('../data/productos.json');

		for(var i = 0; i <= data.length-1; i++) {
			if(i == id) {
				return data[i];
			}
		}
	}
}

// Exporto la clase
module.exports = {
	Producto
}
