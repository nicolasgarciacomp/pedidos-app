/**
 * @fileoverview	./server/classes/clientes.js
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
let listadoClientes = [];

class Cliente {

	constructor() {

	}

	/**
	 * @name	agregarCliente
	 *
	 * @description	Añade un cliente a la BD
	 *
	 * @param	{number, string, string}
	 *
	 * @return  {object}
	**/
	agregarCliente(nombre, direccion, telefono) {
		let nuevoCliente = {
			id: '0',
			nombre: nombre,
			direccion: direccion,
			telefono: telefono
		};

		axios.post(`${url}/clientes.json`, nuevoCliente)
		     .then((res) => {
  			 	console.log(`statusCode: ${res.statusCode}`);
  				console.log(res);
			 })
			 .catch((error) => {
  			    console.error(error);
			 });

		return nuevoCliente;
	}

	/**
	 * @name	actualizar
	 *
	 * @description	Actualiza datos de un cliente
	 *
	 * @param	{number, string, string, string}
	 *
	 * @return  {object}
	**/
	async actualizar(id, nombre, direccion, telefono) {
		const res = await axios.put(`${url}/clientes/${id}.json`, {
			id: id,
            nombre: nombre,
            direccion: direccion,
            telefono: telefono
        });

        return res;
	}

	/**
	 * @name	eliminar
	 *
	 * @description	Elimina el elemento id de la BD
	 *
	 * @param	{id}
	 *
	 * @return  {}
	**/
	eliminar(id) {
		axios.delete(`${url}/clientes/${id}.json`)
	     .then((res) => {
			 	console.log(`statusCode: ${res.statusCode}`);
				console.log(res);
		 })
		 .catch((error) => {
			    console.error(error);
		 });
	}

	/**
	 * @name	getClientes
	 *
	 * @description	Devuelve todos los clientes de la BD
	 *
	 * @param	{}
	 *
	 * @return  {object}
	**/
	async getClientes() {
		listadoClientes = []; // Array para almacenar los clientes
		const resp = await axios.get(`${url}/clientes.json`);

		Object.keys(resp.data).forEach(key => {
			listadoClientes.push(resp.data[key]);
			let nombre = resp.data[key]['nombre'];
			let index = listadoClientes.findIndex(cliente => {
				return cliente.nombre == nombre;
			});

			if(index >= 0) {
				listadoClientes[index].id = key;
			}
		});

		return listadoClientes;
	}

	/**
	 * @name	getCliente
	 *
	 * @description	Devuelve un cliente por id
	 *
	 * @param	{number}
	 *
	 * @return  {object}
	**/
	getCliente(id) {
		let index = listadoClientes.findIndex(cliente => {
			return cliente.id == id;
		});

		if(index >= 0) {
			return listadoClientes[index];
		}
	}
}

// Exporto la clase
module.exports = {
	Cliente
}
