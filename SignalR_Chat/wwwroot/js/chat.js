'use strict';

//create concection with signalR
const connection = CreateConnection();

//function that receive messages from server hub
GetMessageServer();
//function to send message to server hub
SetMessageServer();
//Start connection with server
StartConnection();
//set keydown in pages
SetKeyDown();

//#region Create connexion with server
function CreateConnection() {
    return new signalR.HubConnectionBuilder().withUrl('/chatHub').build();
}
//#endregion

//#region Receive messages from server hub
function GetMessageServer() {
    connection.on('Message_To_Client', function (user, message) {
        var msg = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        var encodeMsg = `${user} Diz: ${msg} \n`;

        $('#messageList').append(encodeMsg);

        if ($('#messageList').length)
            $('#messageList').scrollTop($('#messageList')[0].scrollHeight - $('#messageList').height());
    });
}
//#endregion

//#region Send message to server hub
function SetMessageServer() {
    $('#btnMessage').click(function (event) {
        var user = $('#txtUser').val();
        var message = $('#txtMessage').val();

        if (!ValueIsValid())
            return;

        connection.invoke('Message_To_Server', user, message).catch(function (err) {
            return console.error(err.toString());
        });

        event.preventDefault();
        $('#txtMessage').val('');
        $('#txtMessage').focus();
    });
}

function ValueIsValid() {
    if ($('#txtUser').val() == '') {
        alert('Usuario não informado!');
        return false;
    }

    if ($('#txtMessage').val() == '') {
        alert('Mensagem não pode ser vazia!');
        return false;
    }
    $('#txtUser').prop('disabled', 'disabled');

    return true;
}

//#endregion

//#region "Start Connection"
function StartConnection() {
    connection.start().then(function () {
        $('#btnMessage').prop('disabled', false);
    }).catch(function (err) {
        return console.error(err.toString());
    });
}
//#endregion

//#region "KeyDown"
function SetKeyDown() {
    $('#txtMessage').keydown(function (key) {
        if (key.which == 13) {
            $('#btnMessage').click();
        }
    })
}
//#endregion