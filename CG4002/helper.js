function next() {
    document.getElementById("info").innerHTML = "The function fun() is triggered !";
}

function terminate() {
     //appendText("info",'Shahbaz is good');
     changePlayerState("p1", -1)
     changePlayerState("p2", 0)

     str  = "group_name: "+sessionStorage.group_name+"\n";
     str += "num_player: "+sessionStorage.num_player+"\n";
     str += "Password  : "+sessionStorage.password+"\n";

     alert (str);
     changeText ("num_move","12/19")
  }

/*
    function to establish the connection to the websocket
*/
function startConnection() {
    //const server_address = "ws://172.25.76.133:8001/"
    const server_address = "ws://cg4002-i.comp.nus.edu.sg:8001/"
    if ("WebSocket" in window) {
       // Let us open a web socket
       var ws = new WebSocket(server_address);

       ws.onopen = function() {
            // Web Socket is connected, send data using send()
            var obj = new Object();
            obj.group_name  = sessionStorage.group_name;
            obj.num_player  = sessionStorage.num_player;
            obj.password    = sessionStorage.password;

            //check to see if we are starting a new connection
            if (sessionStorage.getItem("connection_sate") != null) {
                obj.connection_sate = sessionStorage.connection_sate;
            } else {
                obj.connection_sate             = 0; // we are starting a new connection
                sessionStorage.connection_sate  = 1; // indicating to the server to continue from where you left off, in the case of reconnection
            }

            // sending the handshake to server
            appendText ("info", "Sending "+JSON.stringify(obj)+" to "+server_address)
            ws.send(JSON.stringify(obj));
       };

       ws.onmessage = function (evt) {
          var received_msg = evt.data;
          alert("Message is received...");
       };

       ws.onclose = function() {
          // websocket is closed.
          alert("Connection is closed...");
       };
    } else {
       // The browser doesn't support WebSocket
       alert("WebSocket NOT supported by your Browser!");
    }
}

/*
    Function to change the colour of info box
    state:
     0: default colour
     1: success colour
    -1: failure colour
*/
function changePlayerState(player, state) {
    const targetElement = document.getElementById(player);

    //var colour = '';

    if (targetElement) {
        switch (state) {
            case 1:
                colour = '#93C572';
                break;
            case -1:
                colour = 'Salmon';
                break;
            default:
                colour = 'f1f1f1';
        }
        targetElement.style.backgroundColor = colour;
    } else {
        console.error('Element with ID "${player}" not found.');
    }
}

function appendText(elementId, text) {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
        //const textNode = document.createTextNode(text+"<br>");
        //targetElement.appendChild(textNode);
        targetElement.innerHTML = targetElement.innerHTML+ "<br>"+ text
    } else {
        console.error('Element with ID "${elementId}" not found.');
    }
}

function changeText(elementId, text) {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
        targetElement.innerHTML = text
    } else {
        console.error('Element with ID "${elementId}" not found.');
    }
}