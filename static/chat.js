$(document).ready(function () {
    var socket = io.connect('http://46.149.80.250'); // websocet - соединение
    var messages = $("#messages");  // значение пременной id=messages
    var message_txt = $("#message_text")  // зн. прем. id=messages_text
    var name = 'Bot_' + (Math.round(Math.random() * 10000));  // случайное число

    $('.chat .nick').text(name);  // сл.число в .chat и .nick 

    //-1-----  при возн. события:  connecting - сообщ. ------   
    socket.on('connecting', function () {
        msg_system('Соединение...');
    });

    //-2-----  при возн. события:  connect - сообщ. ------
    socket.on('connect', function () {
        msg_system('Соединение установлено!');
    });

    //-3-----  при возн. события:  message - блок с сообщ. ------
    socket.on('message', function (data) {
        msg(data.name, data.message);
        message_txt.focus();
    });

    //-3-----  при нажатии на кнопку "отправить" 
    // ------  проверить сод.строки и отправить д.на сервер
    $("#message_btn").click(function () {
        var text = $("#message_text").val();
        if (text.length <= 0)
            return;
        message_txt.val("");
        socket.emit("message", {message: text, name: name});
    });

    //  - - -  экранирование символьной строки
    function safe(str) {
        return str.replace(/&/g, '&amp;')
           .replace(/</g, '&lt;')
           .replace(/>/g, '&gt;');
    }

    // - - - добавить блок с сообщением в объект с id=messages
    function msg(nick, message) {
        var m = '<div class="msg">' +
                '<span class="user">' + safe(nick) + ':</span> '
                + safe(message) +
                '</div>';
        messages.append(m);
    }

    //  - - - добавить блок с сист. сообщением в объект с id=messages
    function msg_system(message) {
        messages.append($('<div>').addClass('msg system').text(message));
    }

});
