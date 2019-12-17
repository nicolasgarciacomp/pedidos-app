const { io } = require('../server');
const { Producto } = require('../classes/productos.js');

const producto = new Producto();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
    	actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });
    
    client.on('getProductos', (callback) => {
    	let getProductos = producto.getProductos();

    	callback(getProductos);
    });
});
