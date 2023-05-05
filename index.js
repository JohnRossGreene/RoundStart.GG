let controllerIndex = null;
let arcadeorxbox = true;
const dpad = ['arcade-12', 'arcade-13', 'arcade-14', 'arcade-15'];


window.addEventListener('gamepadconnected',(event)=>{
    const gamepad = event.gamepad;
    controllerIndex = gamepad.index;
    handleConnectDisconnect(event ,true);
    //TODO ADD PLAYER CONTROLLER MAPPING
    console.log("connected!");
});
window.addEventListener('gamepaddisconnected',(event)=>{
    const gamepad = event.gamepad;
    handleConnectDisconnect(event ,false);
    //TODO make alt case use keyboard input
    controllerIndex = gamepad.index;
    console.log("disconnected");
});
// setting up the xbox controller being hidden from the get go
document.getElementById("xbox_div").classList.toggle("invisible");
const button = document.querySelector("button");
button.addEventListener("click", (evt) => {
    arcadeorxbox = !arcadeorxbox;
    document.getElementById("arcadestick").classList.toggle("invisible");
    document.getElementById("xbox_div").classList.toggle("invisible");
});

function handleConnectDisconnect(event, connected){
    const controllerAreaNotConnected = document.getElementById(
        "controller-not-connected-area"
        );
    const controllerAreaConnected = document.getElementById(
        "controller-connected-area"
        );
    const gamepad = event.gamepad;
    console.log(gamepad);
    if(connected){
        // controllerAreaNotConnected.sytle.display = "none";
        // controllerAreaConnected.sytle.display = "block";
    }
    else{
        // controllerAreaNotConnected.sytle.display = "block";
        // controllerAreaConnected.sytle.display = "none";
    }

}
//array holding current buttons pressed on given frame
// const buttonspressed = [];


function handleButtons(buttons) {
    for (let i = 0; i < buttons.length; i++){
        const button = buttons[i];
        let buttonElement = 0;
//Structure for switching between arcade and xbox
        if(arcadeorxbox === true)
        {
            buttonElement = document.getElementById(`arcade-${i}`);
        }
        else
        {
            buttonElement = document.getElementById(`controller-${i}`);
        }
        
        // const buttonElement = document.getElementById(`arcade-${i}`);
        // const buttonElement = document.getElementById(`controller-${i}`);

        const selectedButtonClass = 'selected-button';
        if(buttonElement){
            if(button.value > 0)
            {
                buttonElement.classList.add(selectedButtonClass);
                console.log(buttonElement.id);
                //For handling corners on arcadestick
                    //might just abandon
                // buttonspressed.push(buttonElement.id);
                // if(buttonspressed.includes());
            }
            else
            {
                buttonElement.classList.remove(selectedButtonClass);
                // const idx = buttonspressed.indexof(buttonElement.id);
                // buttonspressed.splice(idx,1)

            }
        }
        
    }
}
function updateStick(elementId, leftRightAxis, upDownAxis) {
    const multiplier = 25;
    const stickLeftRight = leftRightAxis * multiplier;
    const stickUpDown = upDownAxis * multiplier;
    const stick = document.getElementById(elementId);
    const x = Number(stick.getAttribute("data-og_x"));
    const y = Number(stick.getAttribute("data-og_y"));
    stick.setAttribute("cx", x + stickLeftRight);
    stick.setAttribute("cy", y + stickUpDown);




    


}
function handleSticks(axes, arcade){
    if (arcade === false)
    {
        updateStick('stick1',axes[2],axes[3]);
        updateStick('stick2',axes[0],axes[1]);
    }
    
}
function gameLoop(arcade) {
    if (controllerIndex !== null){
        const gamepad = navigator.getGamepads()[controllerIndex];
        console.log(arcadeorxbox);
        handleButtons(gamepad.buttons, arcadeorxbox);
        handleSticks(gamepad.axes, arcadeorxbox);
    }

    requestAnimationFrame(gameLoop);
}

// let arcade = true;
gameLoop();
