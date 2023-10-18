import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io';
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3006;

const api = express();
const servidor = createServer(api)
const io = new Server(servidor, {})

io.on('connection',  (user) =>{
    console.log('a user has connected!')

    user.on('disconnect', () => {
        console.log('an user has disconnected')
    })

    user.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})

api.use(logger('dev'));

api.get('/', function(req, res){
    res.sendFile(process.cwd() + '/client/index.html');
});

api.use(express.static("client"));

servidor.listen(port, () =>{
    console.log('Server running on port 3006');
});