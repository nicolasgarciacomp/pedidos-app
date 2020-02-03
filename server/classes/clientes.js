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
const fs = require('fs');

let listadoClientes = []; // Array para almacenar los clientes

class Cliente {

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
		let data = JSON.stringify(listadoClientes);

		fs.writeFile('../data/clientes.json', data, (err) => {
			if(err) throw new Error('No se pudo grabar', err);
		});
	}

	/**
	 * @name	agregarCliente
	 *
	 * @description	Añade un cliente al array listadoClientes
	 *
	 * @param	{number, string, string}
	 *
	 * @return  {object}
	**/
	agregarCliente(nombre, direccion, telefono) {
		// Cargo archivo
		try {
			listadoClientes = require('../data/clientes.json');
		} catch(error) {
			listadoClientes = [];
		}

		let nuevoCliente = {
			id: listadoClientes.length, // Acá tengo un problema cuando elimino!!
			nombre: nombre,
			direccion: direccion,
			telefono: telefono,
			estado: 'Alta'
		};

		listadoClientes.push(nuevoCliente);

		// Grabo archivo
		let data = JSON.stringify(listadoClientes);
		fs.writeFileSync('./server/data/clientes.json', data);

		return nuevoCliente;
	}

	/**
	 * @name	actualizar
	 *
	 * @description	Actualiza datos de un cliente
	 *
	 * @param	{number, string, string, string}
	 *
	 * @return  {boolean}
	**/
	actualizar(id, nombre, direccion, telefono) {
		// Cargo archivo
		try {
			listadoClientes = require('../data/clientes.json');
		} catch(error) {
			listadoClientes = [];
		}

		let index = listadoClientes.findIndex(cliente => {
			return cliente.id == id;
		});

		if(index >= 0) {
			listadoClientes[index].nombre = nombre;
			listadoClientes[index].direccion = direccion;
			listadoClientes[index].telefono = telefono;

			// Grabo archivo
			let data = JSON.stringify(listadoClientes);
			fs.writeFileSync('./server/data/clientes.json', data);
			return true;
		} else {
			return false;
		}
	}

	/*
	eliminar(id) {
		// Cargo archivo
		try {
			listadoClientes = require('../data/clientes.json');
		} catch(error) {
			listadoClientes = [];
		}

		let nuevoListado = listadoClientes.filter(cliente => {
			return cliente.id != id;
		});

		if(listadoClientes.length == listadoClientes.length) {
			return false;
		} else {
			listadoClientes = nuevoListado;
			
			// Grabo archivo
			let data = JSON.stringify(listadoClientes);
			fs.writeFileSync('./server/data/clientes.json', data);
			return true;
		}
	}
	*/

	/**
	 * @name	eliminar
	 *
	 * @description	Cambia de estado Alta a Baja a un cliente
	 *
	 * @param	{id}
	 *
	 * @return  {boolean}
	**/
	eliminar(id) {
		// Cargo archivo
		try {
			listadoClientes = require('../data/clientes.json');
		} catch(error) {
			listadoClientes = [];
		}

		let index = listadoClientes.findIndex(cliente => {
			return cliente.id == id;
		});

		if(index >= 0) {
			listadoClientes[index].estado = 'Baja';

			// Grabo archivo
			let data = JSON.stringify(listadoClientes);
			fs.writeFileSync('./server/data/clientes.json', data);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @name	getClientes
	 *
	 * @description	Devuelve todos los clientes del listado
	 *
	 * @param	{}
	 *
	 * @return  {object}
	**/
	getClientes() {
		// Cargo archivo
		try {
			listadoClientes = require('../data/clientes.json');
		} catch(error) {
			listadoClientes = [];
		}

		let nuevoListado = listadoClientes.filter(cliente => {
			return cliente.estado == 'Alta';
		});

		return nuevoListado;
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
		// Cargo archivo
		let data = require('../data/clientes.json');

		for(var i = 0; i <= data.length-1; i++) {
			if(i == id) {
				return data[i];
			}
		}
	}
}

// Exporto la clase
module.exports = {
	Cliente
}
