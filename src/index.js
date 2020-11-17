const http = require('http');
const moongose = require('mongoose');
const net = require('net');
const path = require('path');
const fs = require('fs');


/**
 * ROTAS
 * / Pagina inicial - arquivos estáticos
 * /votar
 * /comentar
 * 
 * /postar-reuniao
 */

moongose.connect('mongodb+srv://master:deldel123@cluster0.hpai6.mongodb.net/reuniaodb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const server = http.createServer(async (req, res) => {
    await req.on('data', data => {
        req.body = JSON.parse(data.toString());
    });
    

    const { socket } = req;

    const ipDoCliente = socket.remoteAddress;
    console.log(ipDoCliente);

    const buscarPorUmaPalestra = async (palestraID) => {
        return db('tbl_reuniao')
            .select('id')
            .where('id', '=', palestraID)
            .first();
    }

    req.on('error', err => {
        console.log(err);

        res.statusCode = 400;
        res.end('400: Bad Request');
        return;
    });

    req.on('error', err => {
        console.log(err);
        res.statusCode = 500;
        res.end('')
    });

    if(req.method === 'GET') {
        switch (req.url) {
            case '/':
                const arquivo = path.resolve(__dirname, '..', 'cliente', 'index.html');
                const data = await fs.readFileSync(arquivo);

                res.end(data);
                break;
            default:
                break;
        }
    } else if (req.method === 'POST') {
        switch (req.url) {
            case '/postar-reuniao':
                const {
                    titulo,
                    palestrante,
                    dataDaPalestra,
                    horasNecessarias
                } = req.body;
                if(
                    !titulo ||
                    !palestrante ||
                    !dataDaPalestra ||
                    !horasNecessarias
                    ) {
                        const messageInformationIncomplete = {
                            error: 'Informações icompletas'
                        }
                        res.statusCode = 401;
                        res.write(JSON.stringify(messageInformationIncomplete));
                        break;
                    }
                const novaReuniao = {
                    titulo,
                    palestrante,
                    dataDaPalestra,
                    horasNecessarias
                }

                try {
                    id = 5
                    // const [ id ] = await db('tbl_reuniao').insert(novaReuniao);
                    
                    const message = {
                        sucesso: "Palestra cadastrada com sucesso!",
                        ultimoID: id,
                    }

                    res.writeHead(JSON.stringify(message));
                } catch(err) {
                    res.statusCode = 500;
                    res.write('{"error": "' + err.message + '" }');
                
                }
                break;
            case "/votar":
                try {
                    const {
                        palestraID,
                        opcaoID
                    } = req.body;
                    if(!palestraID || !opcaoID) {
                        const messageError = {
                            error: "Não é possível votar nulo!"
                        };
                        res.statusCode = 401;
                        res.write(JSON.stringify(messageError));
                        
                        break;
                    }
                    const palestraExists = await buscarPorUmaPalestra(palestraID);
                    
                    if(!palestraExists) {
                        const messagePalestraNaoExiste = {
                            error: "Palestra Não existe"
                        }
                        res.statusCode = 404;
                        res.write(JSON.stringify(messagePalestraNaoExiste));
                    }
    
                    // const opcaoExists = await db('tbl_opcao')
                    //     .select('id')
                    //     .where('id', '=', opcaoID)
                    //     .andWhere('reuniao_id', '=', palestraID)
                    //     .first();
                    
                    // if(!opcaoExists) {
                    //     const messageErrorOpcaoNaoExiste = {
                    //         error: "Opção inexistente para esta palestra!"
                    //     };
    
                    //     res.statusCode = 404;
                    //     res.write(JSON.stringify(messageErrorOpcaoNaoExiste));
                    // }
    
                    // const voto = {
                    //     palestraID,
                    //     opcaoID,
                    //     ip: ipDoCliente
                    // };
    
                    // await db('tbl_votacao').insert(voto);

                } catch(err) {
                    res.statusCode = 500;
                    res.write(JSON.stringify({
                        error: err.message
                    }))
                }

                break;
            case '/comentar':
                const {
                    palestraID,
                    comentario,
                    comentarista
                } = req.body;
                if(!palestraID || !comentario) {
                    const messageError = {
                        error: "Não é possível comentar em branco!"
                    };
                    res.statusCode = 401;
                    res.write(JSON.stringify(messageError));
                    
                    break;
                }

                const palestraExists = await buscarPorUmaPalestra(palestraID);

                if(!palestraExists) {
                    const messageErrorOpcaoNaoExiste = {
                        error: "Opção inexistente para esta palestra!"
                    };

                    res.statusCode = 404;
                    res.write(JSON.stringify(messageErrorOpcaoNaoExiste));
                    
                }

                const voto = {
                    palestraID,
                    opcaoID,
                    comentarista: comentarista? comentarista : 'ANÔNIMUS'
                };

                // const [ ultimoComentarioInserido ] = await db('tbl_comentario').insert(voto);

                // const message = {
                //     sucesso: "Seu comentário foi inserido com sucesso",
                //     comentarista: comentarista ? comentarista : 'ANÔNIMUS',
                //     id: ultimoComentarioInserido
                // }
                // res.write(JSON.stringify(message));

                break;
            default:
                res.statusCode = 404;
                res.write("<h1> 404 NOT FOUND </h1>");
                break;
        }
    }

    res.end();

});

const serverSocket = net.createServer((c) => {
    
    c.on('end', () => {
        console.log("Cliente desconectado")
    });

    c.on('data', data => {
        console.log(data.toString())
        c.write('aaaaaaaaaaaaaaaaaaaaa')
    })


    c.pipe(c);
})

serverSocket.on('error', err => {
    console.log(err);
    throw err;
});


serverSocket.listen(3332, () => {
    console.log("Servidor socket no ar bbbbbbbb")
})

serverSocket.on('listening', () => {
    serverSocket.emit('teste', () => "1234")
})

server.listen(3333, 'localhost', () => {
    console.log("Servidor HTTP no ar bbbbb")
});
