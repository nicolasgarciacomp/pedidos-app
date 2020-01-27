/**
 * @fileoverview	./server/classes/ventas.js
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

let ventas = []; // Array para almacenar las ventas

class Venta {

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
		let data = JSON.stringify(ventas);

		fs.writeFile('../data/ventas.json', data, (err) => {
			if(err) throw new Error('No se pudo grabar', err);
		});
	}

	/**
	 * @name	agregarVenta
	 *
	 * @description	Añade una venta al array ventas
	 *
	 * @param	{string, string, string, string, number, number}
	 *
	 * @return  {object}
	**/
	agregarVenta(cliente, direccion, tipo, nombre, precio, cantidad) {
		// Cargo archivo
		try {
			ventas = require('../data/ventas.json');
		} catch(error) {
			ventas = [];
		}

		// Formateo Date para tener fecha y hora
		var hoy = new Date();
		var fecha = hoy.getDate() + '-' + (hoy.getMonth()+1) + '-' + hoy.getFullYear();
		var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
		var fechaYHora = fecha + ' ' + hora;

		let nuevaVenta = {
			id: ventas.length,
			cliente: cliente,
			direccion: direccion,
			tipo: tipo,
			nombre: nombre,
			precio: precio,
			cantidad: cantidad,
			fecha: fechaYHora,
			estado: 'Pendiente'
		};
		
		ventas.push(nuevaVenta);

		// Grabo archivo
		let data = JSON.stringify(ventas);
		fs.writeFileSync('./server/data/ventas.json', data);

		return nuevaVenta;
	}

	/**
	 * @name	pasarListo
	 *
	 * @description	Pasa a estado listo una venta de la cola de pedidos
	 *
	 * @param	{number}
	 *
	 * @return  {boolean}
	**/
	pasarListo(id) {
		// Cargo archivo
		try {
			ventas = require('../data/ventas.json');
		} catch(error) {
			ventas = [];
		}

		let index = ventas.findIndex(venta => {
			return venta.id == id;
		});

		if(index >= 0) {
			ventas[index].estado = 'Listo';

			// Grabo archivo
			let data = JSON.stringify(ventas);
			fs.writeFileSync('./server/data/ventas.json', data);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @name	getVentas
	 *
	 * @description	Devuelve todas las ventas del listado
	 *
	 * @param	{}
	 *
	 * @return  {object}
	**/
	getVentas() {
		// Cargo archivo
		let data = require('../data/ventas.json');

		return data;
	}

	/**
	 * @name	getPorMes
	 *
	 * @description	Devuelve las ventas filtradas por un mes determinado
	 *
	 * @param	{number}
	 *
	 * @return  {object}
	**/
	getPorMes(mes) {
		// Cargo archivo
		try {
			ventas = require('../data/ventas.json');
		} catch(error) {
			ventas = [];
		}

		let nuevoListado = ventas.filter(venta => {
			var v = venta.fecha.split('-');
			return v[1] == mes;
		});

		return nuevoListado;
	}

	/**
	 * @name	getPorMesDia
	 *
	 * @description	Devuelve las ventas filtradas por mes y dia
	 *
	 * @param	{number, number}
	 *
	 * @return  {object}
	**/
	getPorMesDia(mes, dia) {
		// Cargo archivo
		try {
			ventas = require('../data/ventas.json');
		} catch(error) {
			ventas = [];
		}

		let nuevoListado = ventas.filter(venta => {
			var v = venta.fecha.split('-');
			return v[1] == mes && v[0] == dia;
		});

		return nuevoListado;
	}

	/**
	 * @name	getEnCola
	 *
	 * @description	Devuelve las ventas con estado Pendiente
	 *
	 * @param	{}
	 *
	 * @return  {object}
	**/
	getEnCola() {
		// Cargo archivo
		try {
			ventas = require('../data/ventas.json');
		} catch(error) {
			ventas = [];
		}

		let nuevoListado = ventas.filter(venta => {
			return venta.estado == 'Pendiente';
		});

		return nuevoListado;
	}
}

// Exporto la clase
module.exports = {
	Venta
}
