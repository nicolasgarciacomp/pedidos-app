const { io } = require('../server');
const { Producto } = require('../classes/productos.js');

const producto = new Producto();

io.on('connection', (client) => {
    
    client.on('getProductos', (callback) => {
    	let getProductos = producto.getProductos();
    	callback(getProductos);
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
});
