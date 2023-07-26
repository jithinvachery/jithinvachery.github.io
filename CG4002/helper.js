function next() {
    document.getElementById("info").innerHTML = "The function fun() is triggered !";
}

function terminate() {
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
    // check if the student has logged in
    if (sessionStorage.getItem("group_name") == null) {
        // we do not have user credentials
        location.assign("index.html");
        return;
    }

    //disable all the buttons
    disableButton('button_next')

    //const server_address = "ws://172.25.76.133:8001/"
    const server_address = "ws://cg4002-i.comp.nus.edu.sg:8001/"
    if (!("WebSocket" in window)) {
        // The browser doesn't support WebSocket
       alert("WebSocket NOT supported by your Browser. \nKindly use a supporting browser!");
       return;
    }
    // Let us open a web socket
    const ws = new WebSocket(server_address);
    // Listen for possible errors
    ws.addEventListener("error", (event) => {
        updateInfoError("WebSocket connection Failed: ");
        alert ("Unable to connect to eval_server")
    });

    ws.onopen = function() {
        // Web Socket is connected, send data using send()
        var obj = new Object();
        obj.group_name  = sessionStorage.group_name;
        obj.num_player  = sessionStorage.num_player;
        obj.password    = sessionStorage.password;

        updateInfo ("Performing Handshake, new connection");

        // sending the handshake to server
        ws.send(JSON.stringify(obj));
    };

    ws.onmessage = function (evt) {
        try {
            var data = JSON.parse(evt.data);
        } catch (e) {
            updateInfoError ("Invalid Json from Server: "+evt.data)
            return console.error(e); // error in the above string (in this case, yes)!
        }

        switch (data.type) {
            case "info":
                updateInfo (data.message);
                break;
            case "info_y":
                updateInfo (data.message, type="yellow");
                break;
            case "info_wobr":
                updateInfo (data.message, newline=false);
                break;
            case "error":
                updateInfo (data.message, type="error");
                break;
            case "num_move":
                changeText ("num_move", data.message);
                break;
            default:
                updateInfoError ("Invalid datatype received: "+data.type);
        }

    };

    ws.onclose = function() {
      // websocket is closed.
      alert("Connection is closed by the server");
    };


    //display the team name
    changeText ("num_move", sessionStorage.group_name)
}

/*
    disable a button
*/
function disableButton (elementId) {
    e = document.getElementById(elementId)
    e.classList.add('disabled');
    e.disabled = true;
}

/*
    enable a button
*/
function enableButton (elementId) {
    e = document.getElementById(elementId);
    e.classList.remove('disabled');
    e.disabled = false;
}
/*
    Function to change the colour of player box
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

function appendText(elementId, text, newline=true) {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
        //const textNode = document.createTextNode(text+"<br>");
        //targetElement.appendChild(textNode);
        if (newline)
            targetElement.innerHTML = targetElement.innerHTML + "<br>"+ text
        else
            targetElement.innerHTML = targetElement.innerHTML + text
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

function updateInfo(text, type="", newline=true) {
    switch (type) {
        case "error":
            appendText ("info", "<span style='color:red;'>"+text+"</span>", newline=newline);
            break;
        case "yellow":
            appendText ("info", "<span style='color:yellow;'>"+text+"</span>", newline=newline);
            break;
        default:
            appendText ("info", text, newline=newline);
    }
}
