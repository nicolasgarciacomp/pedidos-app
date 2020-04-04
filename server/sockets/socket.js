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
    
    client.on('getProductos', async (callback) => {
    	let getProductos = await producto.getProductos();
    	callback(getProductos);
    });

    client.on('getVentas', async (callback) => {
        let getVentas = await venta.getVentas();
        callback(getVentas);
    });

    client.on('getClientes', async (callback) => {
        let getClientes = await cliente.getClientes();
        callback(getClientes);
    });

    client.on('getEnCola', async (callback) => {
        let getVentas = await venta.getVentas();
        let enCola = venta.getEnCola();
        callback(enCola);
    });

    client.on('getPorMes', async (data, callback) => {
        let getVentas = await venta.getVentas();
        let getVentasPorMes = venta.getPorMes(data.mes);
        callback(getVentasPorMes);
    });

    client.on('getPorMesDia', async (data, callback) => {
        let getVentas = await venta.getVentas();
        let getVentasPorMesDia = venta.getPorMesDia(data.mes, data.dia);
        callback(getVentasPorMesDia);
    });

    client.on('agregarProducto', (data, callback) => {
    	let nuevoProducto = producto.agregarProducto(data.tipo, data.nombre, data.precio, data.media);
    	callback(nuevoProducto);
    });

    client.on('agregarCliente', (data, callback) => {
        let nuevoCliente = cliente.agregarCliente(data.nombre, data.direccion, data.telefono);
        callback(nuevoCliente);
    });

    client.on('getProducto', async (data, callback) => {
        let getProductos = await producto.getProductos();
    	let productoID = producto.getProducto(data.id);
    	callback(productoID);
    });

    client.on('getCliente', async (data, callback) => {
        let getClientes = await cliente.getClientes();
        let clienteID = cliente.getCliente(data.id);
        callback(clienteID);
    });

    client.on('actualizar', async (data, callback) => {
    	let actualiza = await producto.actualizar(data.id, data.tipo, data.nombre, data.precio, data.media);
    	callback(actualiza);
    });

    client.on('actualizarCliente', async (data, callback) => {
        let actualizaC = await cliente.actualizar(data.id, data.nombre, data.direccion, data.telefono);
        callback(actualizaC);
    });

    client.on('pasarListo', async (data, callback) => {
        let listo = await venta.pasarListo(data.id);
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

    client.on('getPorTipo', async (data, callback) => {
        let getProductos = await producto.getProductos();
        let tipo = producto.getPorTipo(data.tipo);
        callback(tipo);
    });

    client.on('agregarVenta', (data, callback) => {
        let nuevaVenta = venta.agregarVenta(data.cliente, data.direccion, data.tipo, data.nombre, data.precio, data.cantidad);
        callback(nuevaVenta);
    });
});
