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
const axios = require('axios');

let url = 'https://crud-siracusa.firebaseio.com';
let listadoProductos = [];

class Producto {

	constructor() {

	}

	/**
	 * @name	agregarProducto
	 *
	 * @description	Añade un producto a la BD
	 *
	 * @param	{string, string, number, number}
	 *
	 * @return  {object}
	**/
	agregarProducto(tipo, nombre, precio, media) {
		let nuevoProducto = {
			id: '',
			tipo: tipo,
			nombre: nombre,
			precio: precio,
			media: media,
			estado: 'Alta'
		};

		axios.post(`${url}/productos.json`, nuevoProducto)
		     .then((res) => {
  			 	console.log(`statusCode: ${res.statusCode}`);
  				console.log(res);
			 })
			 .catch((error) => {
  			    console.error(error);
			 });

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
	 * @description	Cambia de Alta a Baja el estado de un producto
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

		let index = listadoProductos.findIndex(producto => {
			return producto.id == id;
		});

		if(index >= 0) {
			listadoProductos[index].estado = 'Baja';

			// Grabo archivo
			let data = JSON.stringify(listadoProductos);
			fs.writeFileSync('./server/data/productos.json', data);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @name	getProductos
	 *
	 * @description	Devuelve todos los productos de la BD
	 *
	 * @param	{}
	 *
	 * @return  {object}
	**/
	async getProductos() {
		listadoProductos = []; // Array para almacenar los productos
		const resp = await axios.get(`${url}/productos.json`);
		
		Object.keys(resp.data).forEach(key => {
			listadoProductos.push(resp.data[key]);
			listadoProductos.id = key;
		});

		return listadoProductos;
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
		let nuevoListado = listadoProductos.filter(producto => {
			return producto.tipo == tipo && producto.estado == 'Alta'
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
		let index = listadoProductos.findIndex(producto => {
			return producto.id == id;
		});

		if(index >= 0) {
			return listadoProductos[index];
		}
	}
}

// Exporto la clase
module.exports = {
	Producto
}
