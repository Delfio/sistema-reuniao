const net = require('net');



const cliente = net.createConnection({
    port: 3333
}, () => {
    console.log("Cliente: Conectadooo manaaaa!")
    cliente.write('Cliente: HELLO THERE')
});

cliente.addListener('data', (data) => {
    console.log('Evento Escutado: ', data.toString())
})

cliente.on('end', () => {
    console.log('Cliente: O cliente foi desconectado')
})
