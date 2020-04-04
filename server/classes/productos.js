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
			media: media
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
	 * @param	{number, string, string, number, number}
	 *
	 * @return  {object}
	**/
	async actualizar(id, tipo, nombre, precio, media) {
		const res = await axios.put(`${url}/productos/${id}.json`, {
			id: id,
            tipo: tipo,
            nombre: nombre,
            precio: precio,
            media: media
        });

        return res;
	}

	/**
	 * @name	eliminar
	 *
	 * @description	Elimina el elemento id de la BD
	 *
	 * @param	{number}
	 *
	 * @return  {}
	**/
	eliminar(id) {
		axios.delete(`${url}/productos/${id}.json`)
	     .then((res) => {
			 	console.log(`statusCode: ${res.statusCode}`);
				console.log(res);
		 })
		 .catch((error) => {
			    console.error(error);
		 });
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
			let tipo = resp.data[key]['tipo'];
			let nombre = resp.data[key]['nombre'];
			let index = listadoProductos.findIndex(producto => {
				return producto.tipo == tipo && producto.nombre == nombre;
			});

			if(index >= 0) {
				listadoProductos[index].id = key;
			}
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
			return producto.tipo == tipo
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
