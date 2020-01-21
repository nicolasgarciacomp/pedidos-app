/**
 * @fileoverview    ./server/sockets/socket.js
 *
 * @version         1.0
 *
 * @author          Nicolás Garcia <nicolasgarciacomp@gmail.com>
 *
 * History
 * v1.0 – Se creó el archivo
**/

// Requires
const { io } = require('../server');
const { Producto } = require('../classes/productos.js');
const { Venta } = require('../classes/ventas.js');
const { Cliente } = require('../classes/clientes.js');

const producto = new Producto();
const venta = new Venta();
const cliente = new Cliente();

// Connect
io.on('connection', (client) => {
    
    client.on('getProductos', (callback) => {
    	let getProductos = producto.getProductos();
    	callback(getProductos);
    });

    client.on('getVentas', (callback) => {
        let getVentas = venta.getVentas();
        callback(getVentas);
    });

    client.on('getClientes', (callback) => {
        let getClientes = cliente.getClientes();
        callback(getClientes);
    });

    client.on('getEnCola', (callback) => {
        let enCola = venta.getEnCola();
        callback(enCola);
    });

    client.on('getPorMes', (data, callback) => {
        let getVentasPorMes = venta.getPorMes(data.mes);
        callback(getVentasPorMes);
    });

    client.on('agregarProducto', (data, callback) => {
    	let nuevoProducto = producto.agregarProducto(data.tipo, data.nombre, data.precio);
    	callback(nuevoProducto);
    });

    client.on('agregarCliente', (data, callback) => {
        let nuevoCliente = cliente.agregarCliente(data.nombre, data.direccion, data.telefono);
        callback(nuevoCliente);
    });

    client.on('getProducto', (data, callback) => {
    	let productoID = producto.getProducto(data.id);
    	callback(productoID);
    });

    client.on('getCliente', (data, callback) => {
        let clienteID = cliente.getCliente(data.id);
        callback(clienteID);
    });

    client.on('actualizar', (data, callback) => {
    	let actualiza = producto.actualizar(data.id, data.tipo, data.nombre, data.precio);
    	callback(actualiza);
    });

    client.on('actualizarCliente', (data, callback) => {
        let actualizaC = cliente.actualizar(data.id, data.nombre, data.direccion, data.telefono);
        callback(actualizaC);
    });

    client.on('pasarListo', (data, callback) => {
        let listo = venta.pasarListo(data.id);
        callback(listo);
    });

    client.on('eliminar', (data, callback) => {
        let elimina = producto.eliminar(data.id);
        callback(elimina);
    });

    client.on('eliminarCliente', (data, callback) => {
        let eliminaC = cliente.eliminar(data.id);
        callback(eliminaC);
    });

    client.on('getPorTipo', (data, callback) => {
        let tipo = producto.getPorTipo(data.tipo);
        callback(tipo);
    });

    client.on('agregarVenta', (data, callback) => {
        let nuevaVenta = venta.agregarVenta(data.cliente, data.direccion, data.tipo, data.nombre, data.precio, data.cantidad);
        callback(nuevaVenta);
    });
});
