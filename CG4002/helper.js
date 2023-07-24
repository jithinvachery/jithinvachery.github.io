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