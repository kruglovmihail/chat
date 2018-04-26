
    //    (- 1 -)  фреймворк "express"
    var express = require('express');  // подключаем фреймворк "express"
    var app = express();  // создаем экземпляр объекта "express"

     //  (- 2 -)  "http"-сервер
     var http = require('http');  //  подключаем протокол "http"
     var server = http.createServer(app); // создаем  "http"-сервер     

     //  (- 3 -)  "websocket"-сервер
     var io = require('socket.io').listen(server, {});   //  создаем websocket-сервер
     server.listen(8080);  // запускаем  сервер на порту:  80  
 
     //  cистемный путь к директории:  "static"
     app.use('/static', express.static(__dirname + '/static'));  

     //  cистемный путь к файлу:  "chat.html"     
    app.get('/', function (req, res) {
        res.sendfile(__dirname + '/static/chat.html');
     });


     //  подписываемся на событие соединения нового клиента
    io.sockets.on('connection', function (client) {

         //  подписываемся на событие message от клиента
         client.on('message', function (message) {

             try {
                //  посылаем сообщение себе
               client.emit('message', message);

                //  посылаем сообщение всем клиентам, кроме себя
                client.broadcast.emit('message', message);
             } catch (err) {
                 console.log(err);
                 client.disconnect();
             }

         });
      });



