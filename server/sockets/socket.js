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
});
