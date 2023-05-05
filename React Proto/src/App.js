import { useState, useEffect } from 'react';
import Gamepad from './gamepad.js'
import SelectorSwitch from './SelectorSwitch.js'



const App = () => {

  const fakeGamePad = {
    id: "fake-gamepad",
    index: 0,
    mapping: "",
    hand: "",
    connected: true,
    buttons: [],
    axes: [],
    timestamp: 0,
    
    hapticActuators: []
  }

  const [ arcadeorxbox, setArcadeorxbox ] = useState(false);
  const [ controllerIndex, setControllerIndex ] = useState(null);
  const [ gamepad, setGamepad ] = useState(fakeGamePad)
  
    
  const dpad = ['arcade-12', 'arcade-13', 'arcade-14', 'arcade-15'];

  useEffect(() => {
    const connected = (event) => {
        setGamepad(event.gamepad);
        //TODO ADD PLAYER CONTROLLER MAPPING
        console.log("connected!");
    }

    const disconnected = (event) => {
        setGamepad(null);
        //TODO make alt case use keyboard input
        console.log("disconnected");
    }
    window.addEventListener('gamepadconnected', connected);
    window.addEventListener('gamepaddisconnected', disconnected);

    return () => {
        window.removeEventListener('gamepadconnected', connected);
        window.removeEventListener('gamepaddisconnected', disconnected)
    }
}, [])

  useEffect(() => {
    if (gamepad !== null) {
      setControllerIndex(gamepad.index)
      console.log(gamepad)
    } else {
      setControllerIndex(null)
    }
  }, [gamepad])





// let controllerIndex = null;
// let arcadeorxbox = true;






// window.addEventListener('gamepadconnected',(event)=>{
//     const gamepad = event.gamepad;
//     controllerIndex = gamepad.index;
//     handleConnectDisconnect(event ,true);
//     //TODO ADD PLAYER CONTROLLER MAPPING
//     console.log("connected!");
// });
// window.addEventListener('gamepaddisconnected',(event)=>{
//     const gamepad = event.gamepad;
//     handleConnectDisconnect(event ,false);
//     //TODO make alt case use keyboard input
//     controllerIndex = gamepad.index;
//     console.log("disconnected");
// });
// setting up the xbox controller being hidden from the get go
// document.getElementById("xbox_div").classList.toggle("invisible");
// const button = document.querySelector("button");
// button.addEventListener("click", (evt) => {
//     arcadeorxbox = !arcadeorxbox;
//     document.getElementById("arcadestick").classList.toggle("invisible");
//     document.getElementById("xbox_div").classList.toggle("invisible");
// });

// function handleConnectDisconnect(event, connected){
//     const controllerAreaNotConnected = document.getElementById(
//         "controller-not-connected-area"
//         );
//     const controllerAreaConnected = document.getElementById(
//         "controller-connected-area"
//         );
//     const gamepad = event.gamepad;
//     console.log(gamepad);
//     if(connected){
//         // controllerAreaNotConnected.sytle.display = "none";
//         // controllerAreaConnected.sytle.display = "block";
//     }
//     else{
//         // controllerAreaNotConnected.sytle.display = "block";
//         // controllerAreaConnected.sytle.display = "none";
//     }
// }

// }
// //array holding current buttons pressed on given frame
// // const buttonspressed = [];


  
    
    return(
            <div>
              <h1 class="center">Roundstart.GG Input Tool </h1>
              {}
                <div id="controller-not-connected-area" class="controller-status">
                  <div class="loader"></div>
                    <div>controller not connected. Press any button to start.</div>
                  </div>
                  <div id="controller-connected-area">
                    <div id="controller-connected" class="controller-status">Connected</div>
                      <div id="rumble-on-button-press-area">
                        <input id="rubmle-on-button-press" type="checkbox"/>
                        <label for="ruble-on-button-press">Rumble on button press</label>
                      </div>
                      <div id="buttons"></div>
                    </div>
                  <div class="center">
  
                    <SelectorSwitch func={setArcadeorxbox} arcadeorxbox={arcadeorxbox}/>
                    <div class="svg-container">
                      <Gamepad arcadeorxbox={arcadeorxbox} controllerIndex={controllerIndex} buttons={gamepad.buttons} sticks={gamepad.sticks}/>
                    </div>
  
                  </div>
            </div>
    )

}

export default App