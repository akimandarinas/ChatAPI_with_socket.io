import express from 'express'
import logger from 'morgan'
const port = process.env.PORT ?? 3006;

const app = express();
app.use(logger('dev'));

app.get('/', function(req, res){
    res.sendFile(process.cwd() + '/client/index.html');
});

app.use(express.static("client"));

app.listen(port, () =>{
    console.log('Server running on port 3006');
});