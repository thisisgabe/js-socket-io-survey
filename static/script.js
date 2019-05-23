$(document).ready(function () {
    var socket = io();
    console.log('this loaded correctly');

    socket.on('greeting', function (data) {
        console.log(data.msg); //5
        socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' }); //6
    });

    socket.on('updated_message', function(data){
        console.log('got something back');
        console.log(data.msg);
        $('.container').append('<p>'+ data.msg + '</p>');
    });

    $('#send_message').on('click', function(){
        socket.emit('posting_form', { msg: JSON.stringify($('.survey_form').serializeArray()) });
        console.log('submitted form to socket.io server');
    })
});

