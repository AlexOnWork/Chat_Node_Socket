

//aqui le damo la url donde esta el socket alojado , esto indica que la conexion e fuerec
socket = io.connect('http://192.168.18.4:6677', { 'forceNew': true });

//recogemos la emision de mensaje del server,cuando la reciba voy a lanzar una funcion que me va a pintar por pantalla lo que hay en el array
socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

//me voy a crerar una funcion render para motrar los datos en el html 

function render(data) {
        //el map hace las veces de bucle
    var html = data.map(function (message, index) {

        return(`

                <div class ="message">
                <strong>${message.nickname}</strong> dice :
                <p>${message.text}</p>
                </div>

            `);
        //con el join le concatenamos un espacio entre elemento y elemento 
    }).join(' ');
    //aqui seleccionamos el elemento del dom message para meterle dentro el contenido de la var html
    document.getElementById('messages').innerHTML = html;
}
//capta el mensaje del dom y lo envia a el servidor
function addMessage(event){
    var message ={
        nickname: document.getElementById('nickname').value,
        text:document.getElementById('text').value

    }
    document.getElementById('nickname').style.display ='none';
    //emitimos el mensaje para que lo guarde en el servidor 
    socket.emit('add-message',message);
    return false;
}