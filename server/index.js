var express = require('express');
var app = express();
//utilizamos el metodo http de node y le paamos la app de express
var server = require('http').Server(app);
//la variable server se la tenemos que pasar a socket.io y le passamos la variable server que engloba la libreria http y la aplicacion de express
var io = require('socket.io')(server,{
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    }
});


//guardamos los mensajes aqui porque no utilizamos bbdd
var messages= [{
    id:1,
    text:'Bienvenido al chat privado',
    nickname:'bot-1'
}];

//utilizamo un middleware para cargar una vista statica para cargar un formulario de la carpeta de client
app.use(express.static('client'));

//para hacer una ruta tenemos que utilizar express
app.get('/hola-mundo',function(req,res){
    req.status(200).send('hola-mundo desde una ruta');
})

//abrir una conexion al socket llamamos al metodo on y lanzamos el evento connection 
io.on('connection',function(socket){
    //en el parametro de la funcion de callback vamso a recibir un parametro socket con toda la informacion del socket  
    //cuando alguien se conecte a nuestro socket nos va a mandar un consoel.log
    console.log('el cliente con ip '+socket.handshake.adress+' se ha conectado');

    //emitimo el mensaje 
    socket.emit('messages',messages);

    //recogemos el mensaje desde el formulario que nos lo estamos enviando desde main.js
    socket.on('add-message',function(data){
        //anadimos los mensajes al array
        messages.push(data);
        //vuelvo a emitir el array
        io.emit('messages',messages);

    });

});

//aqui ya terndriamos ese servidor de express
server.listen(6677,function(){
    console.log('server its working in http://localhost:6677')
});