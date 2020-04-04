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
const axios = require('axios');

let url = 'https://crud-siracusa.firebaseio.com';
let ventas = []; // Array para almacenar las ventas

class Venta {

	constructor() {
		
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
		// Formateo Date para tener fecha y hora
		var hoy = new Date();
		var fecha = hoy.getDate() + '-' + (hoy.getMonth()+1) + '-' + hoy.getFullYear();
		var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
		var fechaYHora = fecha + ' ' + hora;

		let nuevaVenta = {
			id: '',
			cliente: cliente,
			direccion: direccion,
			tipo: tipo,
			nombre: nombre,
			precio: precio,
			cantidad: cantidad,
			fecha: fechaYHora,
			estado: 'Pendiente'
		};
		
		axios.post(`${url}/ventas.json`, nuevaVenta)
		     .then((res) => {
  			 	console.log(`statusCode: ${res.statusCode}`);
  				console.log(res);
			 })
			 .catch((error) => {
  			    console.error(error);
			 });

		return nuevaVenta;
	}

	/**
	 * @name	pasarListo
	 *
	 * @description	Pasa a estado listo una venta de la cola de pedidos
	 *
	 * @param	{number}
	 *
	 * @return  {object}
	**/
	async pasarListo(id) {
		const res = await axios.put(`${url}/ventas/${id}.json`, {
            estado: 'Listo'
        });

        return res;
	}

	/**
	 * @name	getVentas
	 *
	 * @description	Devuelve todas las ventas de la BD
	 *
	 * @param	{}
	 *
	 * @return  {object}
	**/
	async getVentas() {
		ventas = []; // Array para almacenar las ventas
		const resp = await axios.get(`${url}/ventas.json`);

		Object.keys(resp.data).forEach(key => {
			ventas.push(resp.data[key]);
			ventas.id = key;
		});

		return ventas;
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
