const { io } = require('../server');
const { Producto } = require('../classes/productos.js');
const { Venta } = require('../classes/ventas.js');

const producto = new Producto();
const venta = new Venta();

io.on('connection', (client) => {
    
    client.on('getProductos', (callback) => {
    	let getProductos = producto.getProductos();
    	callback(getProductos);
    });

    client.on('getVentas', (callback) => {
        let getVentas = venta.getVentas();
        callback(getVentas);
    });

    client.on('agregarProducto', (data, callback) => {
    	let nuevoProducto = producto.agregarProducto(data.tipo, data.nombre, data.precio);
    	callback(nuevoProducto);
    });

    client.on('getProducto', (data, callback) => {
    	let productoID = producto.getProducto(data.id);
    	callback(productoID);
    });

    client.on('actualizar', (data, callback) => {
    	let actualiza = producto.actualizar(data.id, data.tipo, data.nombre, data.precio);
    	callback(actualiza);
    });

    client.on('eliminar', (data, callback) => {
        let elimina = producto.eliminar(data.id);
        callback(elimina);
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
