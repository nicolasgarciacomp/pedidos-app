const fs = require('fs');

let listadoClientes = [];

class Cliente {

	constructor() {

	}

	grabarArchivo() {
		let data = JSON.stringify(listadoClientes);

		fs.writeFile('../data/clientes.json', data, (err) => {
			if(err) throw new Error('No se pudo grabar', err);
		});
	}

	agregarCliente(nombre, direccion, telefono) {
		try {
			listadoClientes = require('../data/clientes.json');
		} catch(error) {
			listadoClientes = [];
		}

		let nuevoCliente = {
			id: listadoClientes.length, // Acá tengo un problema cuando elimino!!
			nombre: nombre,
			direccion: direccion,
			telefono: telefono
		};

		listadoClientes.push(nuevoCliente);

		// Grabo archivo
		let data = JSON.stringify(listadoClientes);
		fs.writeFileSync('./server/data/clientes.json', data);

		return nuevoCliente;
	}

	actualizar(id, nombre, direccion, telefono) {
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

	eliminar(id) {
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

	getClientes() {
		let data = require('../data/clientes.json');

		return data;
	}

	getCliente(id) {
		let data = require('../data/clientes.json');

		for(var i = 0; i <= data.length-1; i++) {
			if(i == id) {
				return data[i];
			}
		}
	}
}

module.exports = {
	Cliente
}
