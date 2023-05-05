import React, { useState, useEffect } from 'react';
import { useGamepads } from 'react-gamepads';
import SelectorSwitch from './SelectorSwitch.js';
import MoveSelect from './MoveSelect.js';
import FeedbackDisplay from './FeedbackDisplay.js';

//buffer leniency =      +70ms // -8ms

 
export default function App() {
  const [firstRender, setFirstRender] = useState(true)
  //Button Buffers, button and timestamp respectively
  const [circularBufferButtons, setCircularBufferButtons] = useState([])
  const [circularBufferButtonsTime, setCircularBufferButtonsTime] = useState([])
  //Direction Buffers, direction (numpad notation) and timestamp respectively
    //Numpad notation docs can be found in research notes
  const [circularBufferDir, setCircularBufferDir] = useState([])
  const [circularBufferDirTime, setCircularBufferDirTime] = useState([])

  const [gamepads, setGamepads] = useState({});
  //For switching display between SVGs
  const [ arcadeOrXbox, setarcadeOrXbox ] = useState(false);

  const [open, setOpen] = useState(false);

  //Feedback and timediff for FeedbackDisplay component
  const [feedback, setFeedback] = useState(null)
  const [timediff, setTimediff] = useState(0)


  const [moveSelection, setmoveSelection] = useState("QCF")
  //Direction lookup table for fast transformation from buttons to directions (numpad notation)
  const dirLookup = {
    12: 7,
    13: 2,
    14: 4,
    15: 6,
    0: "kick",
    1: "kick",
    2: "punch",
    3: "punch",
    5: "punch",
    7: "kick"
  };

  //Helper function for mapping buttons to directions using lookup table
  const dirMapper = (direction) => dirLookup[direction] || "ERROR";

  const moves = {
    'QCF': [2, 3, 6, 'punch'],
    'QCB': [2, 1, 4, 'kick'],
    'HCF' : [4,1, 2, 3, 6 , 'punch'],
    'HCB' : [6, 3, 2, 1, 4, 'punch'],
    'DP': [6, 2, 3, 'punch'],
    '360': [6, 3, 2, 1, 4, 7, 8, 'punch'],
    'HCBF' : [6, 3, 2, 1, 4, 6 , 'punch'],
    'DQCF' : [2, 3, 6, 2, 3, 6, 'punch'],
    //Fuck it man I aint puttin back DPs and other niche inputs here
      //who the fuck still has back DPs what is this third strike
      //Yall lucky youre even getting donkey kick I just think its cool

    // Add more special moves here...
  };

  let checkSubset = (parentArray, subsetArray) => {
    return subsetArray.every((el) => {
        return parentArray.includes(el)
    })
}
  useGamepads(gamepads => setGamepads(gamepads));
  //Helper function for converting radians to degrees in analog stick handling
    //No way I'm doing all that shit with radians I'll take the extra 1ms of response time
  function radians_to_degrees(radians)
  {
    var pi = Math.PI;
    return radians * (180/pi);
  }

  useEffect(() => {
    if (firstRender) {
      setFirstRender(!firstRender)
    }
    else {
      //STICK HANDLING
          //TODO Fix the fucking deadzone because it sucks
            //actually? I don't care, square deadzone it is 🎉
          //reading axes from analog stick
          const tempx = gamepads[0].axes[0]
          const tempy = gamepads[0].axes[1]
          //deadzone check
          if (Math.abs(tempx) > .15 || Math.abs(tempy) > .15)
          {
            //Setting angle for direction calculation and converting to radians
            let angle = Math.atan2(tempx,tempy)
            angle = Math.round(radians_to_degrees(angle))
            //making sure angle is positive
            if (angle < 0)
            {
              angle = angle + 360;
            }

            //TODO Create lots of things to convert the angle into a usable input
              //angles are in incriments of 45 deg
              //OH GOD OH GOD IF-IMMEDIATE IS ACTUALLY THE FASTEST WAY TO DO THIS
              //PLEASE DON'T CALL ME YANDERE DEV IN THE GITHUB COMMENTS BRO I SWEAR I DID MY RESEARCH
            if (angle < 22.5)
            {
              //dir is direction in numpad notation
              let dir = 2
              //Making sure dir isn't repeated 1000 times and filling the buffer whenever the stick moves slightly
              if (dir != circularBufferDir[0]){ 
                //setting circularbufferdir and circularbufferdirtime for input validation
                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]
                temp.unshift(dir)
                tempTime.unshift(gamepads[0].timestamp)
                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }

            }else
            if (angle < 67.5)
            {
              let dir = 3
              if (dir != circularBufferDir[0]){ 
                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]
                temp.unshift(dir)
                tempTime.unshift(gamepads[0].timestamp)
                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }
            }else
            if (angle < 112.5)
            {
              let dir = 6
              if (dir != circularBufferDir[0]){ 
                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]
                temp.unshift(dir)
                tempTime.unshift(gamepads[0].timestamp)
                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }

            }else
            if (angle < 157.5)
            {
              let dir = 9
              if (dir != circularBufferDir[0]){ 
                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]
                temp.unshift(dir)
                tempTime.unshift(gamepads[0].timestamp)
                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }

            }else
            if (angle < 202.5)
            {
              let dir = 8
              if (dir != circularBufferDir[0]){ 
                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]
                temp.unshift(dir)
                tempTime.unshift(gamepads[0].timestamp)
                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }

            }else
            if (angle < 247.5)
            {
              let dir = 7
              if (dir != circularBufferDir[0]){ 
                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]
                temp.unshift(dir)
                tempTime.unshift(gamepads[0].timestamp)
                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }

            }else
            if (angle < 292.5)
            {
              let dir = 4
              if (dir != circularBufferDir[0]){ 
                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]
                temp.unshift(dir)
                tempTime.unshift(gamepads[0].timestamp)
                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }

            }else
            if (angle < 337.5)
            {
              let dir = 1
              if (dir != circularBufferDir[0]){ 
                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]
                temp.unshift(dir)
                tempTime.unshift(gamepads[0].timestamp)
                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }

            }
            else{
              let dir = 2
              if (dir != circularBufferDir[0]){ 
                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]
                temp.unshift(dir)
                tempTime.unshift(gamepads[0].timestamp)
                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }

            }
          }
      //BUTTON HANDLING
      gamepads[0].buttons.forEach(button => {
        
        if (button.pressed) {
          if(gamepads[0].buttons.indexOf(button) >= 12)
          {
            //back up
            if(gamepads[0].buttons[14].pressed && gamepads[0].buttons[12].pressed)
            {
              if (circularBufferDir[0] != 7){
                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]

                temp.unshift(7)
                tempTime.unshift(gamepads[0].timestamp)

                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }

            }else
            //forward up
            if(gamepads[0].buttons[15].pressed && gamepads[0].buttons[12].pressed)
            {
              if (circularBufferDir[0] != 9){

                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]

                temp.unshift(9)
                tempTime.unshift(gamepads[0].timestamp)

                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }
            }else
            //down forward
            if (gamepads[0].buttons[15].pressed && gamepads[0].buttons[13].pressed)
            {
              if (circularBufferDir[0] != 3){
                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]

                temp.unshift(3)
                tempTime.unshift(gamepads[0].timestamp)

                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }

            }else
            //down back
            if (gamepads[0].buttons[14].pressed && gamepads[0].buttons[13].pressed)
            {
              if (circularBufferDir[0] != 1){
                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]

                temp.unshift(1)
                tempTime.unshift(gamepads[0].timestamp)

                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }

            }else
            {
              if (circularBufferDir[0] != gamepads[0].buttons.indexOf(button)){

                let temp = [...circularBufferDir]
                let tempTime = [...circularBufferDirTime]
                temp.unshift(dirMapper(gamepads[0].buttons.indexOf(button)))
                tempTime.unshift(gamepads[0].timestamp)

                setCircularBufferDir([...temp])
                setCircularBufferDirTime([...tempTime])
              }
            }
          }
          else {
            // if (circularBufferButtons[0] != gamepads[0].buttons.indexOf(button)){
              let temp = [...circularBufferButtons]
              let tempTime = [...circularBufferButtonsTime]

              temp.unshift(dirLookup[gamepads[0].buttons.indexOf(button)])
              tempTime.unshift(gamepads[0].timestamp)

              setCircularBufferButtons([...temp])
              setCircularBufferButtonsTime([...tempTime])
            // }

          }
        }
      })
    }
  }, [gamepads[0]])

//////////////////////////////////////////////////////////////
///////////////////////INPUT VALIDATION///////////////////////
//////////////////////////////////////////////////////////////
//////////////////////UNDER CONSTRUCTION//////////////////////
//////////////////////////////////////////////////////////////

//Psuedocode
  //Step 1 look for move in buffer
  //step 2 validate timing
    //Get 
  //Step 3 return

useEffect(() => {
  if(circularBufferDir.length > 3)
  {
  const tempdirarray = moves[moveSelection]
  const tempbutton = tempdirarray.slice(-1)
  tempdirarray.pop()
  // console.log(tempbutton)
  // console.log(tempdirarray)

  // if(JSON.stringify(circularBufferDir.slice(0,tempdirarray.length).reverse()) == JSON.stringify(tempdirarray))
  if(checkSubset(circularBufferDir.reverse(), tempdirarray))
  {
    console.log("CORRECT DIRECTION")
    if(circularBufferButtons[0] == tempbutton){
      console.log("CORRECT BUTTON")
      console.log(circularBufferButtonsTime[0] + `BUTTON TIME`)
      console.log(circularBufferDirTime[0] + `DIR TIME`)
      if(circularBufferButtonsTime[0] - circularBufferDirTime[0] < 72 && circularBufferButtonsTime[0] - circularBufferDirTime[0] > -36){
        console.log("PERFECT")
        setFeedback("PERFECT")
        setTimediff(0)
        setCircularBufferDir([])
        setCircularBufferDirTime([])
        setCircularBufferButtons([])
        setCircularBufferButtonsTime([])

      }
      else
      if(circularBufferButtonsTime[0] - circularBufferDirTime[0] > 66)
      {
        console.log(`you were `+ (circularBufferButtonsTime[0] - circularBufferDirTime[0] - 66) + `milliseconds late`)
        setFeedback("LATE")
        setTimediff(Math.trunc(circularBufferButtonsTime[0] - circularBufferDirTime[0] - 66))
        setCircularBufferDir([])
        setCircularBufferDirTime([])
        setCircularBufferButtons([])
        setCircularBufferButtonsTime([])

      }
      else
      if(circularBufferButtonsTime[0] - circularBufferDirTime[0] < -18)
      {
        console.log(`you were `+ (circularBufferButtonsTime[0] - circularBufferDirTime[0] + 17) + `milliseconds early`)
        console.log(circularBufferButtonsTime[0] , circularBufferDirTime[0])
        setFeedback("EARLY")
        setTimediff(Math.trunc(circularBufferButtonsTime[0] - circularBufferDirTime[0] + 17))
        setCircularBufferDir([])
        setCircularBufferDirTime([])
        setCircularBufferButtons([])
        setCircularBufferButtonsTime([])

      }
    }

  }
  // else
  // if(circularBufferButtons[0] !== tempbutton && circularBufferButtons[0] !== undefined)
  // {
  //   setFeedback("BUTTON")
  //   setCircularBufferDir([])
  //   setCircularBufferDirTime([])
  //   setCircularBufferButtons([])
  //   setCircularBufferButtonsTime([])
  // }
  else{
    setFeedback("INCORRECT")
      setCircularBufferDir([])
      setCircularBufferDirTime([])
      setCircularBufferButtons([])
      setCircularBufferButtonsTime([])
  }
}
},[circularBufferButtons])




//////////////////////////////////////////////////////////////

//BUTTON BUFFERS
  //BUTTON BUFFER
  useEffect(() => {
    // console.log(circularBufferButtons + ` buttons`)
    if (circularBufferButtons.length > 8) {
      let temp = [...circularBufferButtons]
      temp.pop()
      setCircularBufferButtons([...temp])
    }
  }, [circularBufferButtons])
  //BUTTON TIME BUFFER
  useEffect(() => {
    // console.log(circularBufferButtons + ` buttons`)
    if (circularBufferButtonsTime.length > 8) {
      let temp = [...circularBufferButtonsTime]
      temp.pop()
      setCircularBufferButtonsTime([...temp])
    }
  }, [circularBufferButtonsTime])


//DIRECTION BUFFERS
  // DIRECTION BUFFER
  useEffect(() => {
    // console.log(circularBufferDir + ` dir`)
    if (circularBufferDir.length > 8) {
      let temp = [...circularBufferDir]
      temp.pop()
      setCircularBufferDir([...temp])
    }
  }, [circularBufferDir])
  //DIRECTION TIME BUFFER
  useEffect(() => {
    // console.log(circularBufferDir + ` dir`)
    if (circularBufferDirTime.length > 8) {
      let temp = [...circularBufferDirTime]
      temp.pop()
      setCircularBufferDirTime([...temp])
    }
  }, [circularBufferDirTime])

  const svgXboxList = [
    `<circle id="controller-0" cx="604.17" cy="333.05" r="25.89" transform="translate(65.26 763.78) rotate(-67.5)"/>`,
    `<circle id="controller-1" cx="660.79" cy="277.75" r="25.89" transform="translate(151.31 781.95) rotate(-67.5)"/>`,
    `<circle id="controller-2" cx="551.6" cy="277.75" r="25.89" transform="translate(-37.37 91.94) rotate(-9.22)"/>`,
    `<circle id="controller-3" cx="604.17" cy="225.21" r="25.89" transform="translate(-28.27 99.69) rotate(-9.22)"/>`,
    `<path id="controller-4" d="M265.66,120.11c-16.38-13.65-110.56,16.38-133.76,34.13-19.43,14.86-11.25,23.02-21.25,33.7l184.66-52.6c-6.63-1.78-18.6-6.01-29.65-15.22Z"/>`,
    `<path id="controller-5" d="M668.12,154.23c-23.2-17.74-117.38-47.78-133.76-34.13-11.32,9.43-23.6,13.64-30.12,15.35l184.74,52.05c-9.4-10.47-1.68-18.61-20.86-33.28Z"/>`,
    `<path id="controller-6" d="M140.13,121.76h68.52c4.14,0,7.72-2.87,8.63-6.91l19.8-88.14c.16-.71,.25-1.44,.22-2.16C236.72,10.89,225.46,0,211.67,0h-35.35c-13.87,0-25.17,11.02-25.63,24.78-.02,.58-.08,1.15-.2,1.72l-18.98,84.48c-1.24,5.53,2.96,10.78,8.63,10.78Z"/>`,
    `<path id="controller-7" d="M658.73,121.76h-68.52c-4.14,0-7.72-2.87-8.63-6.91l-19.8-88.14c-.16-.71-.25-1.44-.22-2.16C562.15,10.89,573.4,0,587.2,0h35.35C636.42,0,647.72,11.02,648.18,24.78c.02,.58,.08,1.15,.2,1.72l18.98,84.48c1.24,5.53-2.96,10.78-8.63,10.78Z"/>`,
    `<circle id="controller-8" cx="343.46" cy="277.75" r="13.52"/>`,
    `<circle id="controller-9" cx="458.11" cy="277.75" r="13.52"/>`,
    "","",
    `<path id="controller-12" d="M310.01,389.81v-29.58c0-.77-.62-1.39-1.39-1.39h-22.2c-.77,0-1.39,.62-1.39,1.39v28.19c0,1.69-.75,3.21-1.94,4.24l14.5,14.5,14.04-14.04c-.98-.77-1.62-1.96-1.62-3.3Z"/>`,
    `<path id="controller-13" d="M283.72,421.03c.82,.97,1.31,2.23,1.31,3.6v28.19c0,.77,.62,1.39,1.39,1.39h22.2c.77,0,1.39-.62,1.39-1.39v-28.19c0-1.41,.52-2.69,1.38-3.67l-13.8-13.8-13.87,13.87Z"/>`,
    `<path id="controller-14" d="M283.09,392.66c-.99,.86-2.27,1.38-3.67,1.38h-28.18c-.77,0-1.39,.62-1.39,1.39v22.2c0,.77,.62,1.39,1.39,1.39h28.18c1.73,0,3.28,.78,4.3,2.01l13.87-13.87-14.5-14.5Z"/>`,
    `<path id="controller-15" d="M343.8,394.03h-29.57c-.98,0-1.88-.35-2.6-.92l-14.04,14.04,13.8,13.8c1.03-1.19,2.54-1.94,4.24-1.94h28.18c.77,0,1.39-.62,1.39-1.39v-22.2c0-.77-.62-1.39-1.39-1.39Z"/>`
  ]

  const svgXboxSticks = [
    `<circle id="stick1" cx="503.82" cy="399.93" data-og_x="503.82" data-og_y="399.93" r="37.42"/>`,
    `<circle id="stick2" cx="196.03" cy="276.39" data-og_x="196.03" data-og_y="276.39" r="37.41"/>`
  ]

  const svgXbox = [
    `<path id ="base" d="M778.67,406.74s-58.68-197.91-81.1-212.24c-3.89-2.49-6.62-4.79-8.59-6.99l-184.74-52.05c-2.92,.76-4.68,1.03-4.68,1.03h-199.1s-1.96-.29-5.15-1.15l-184.66,52.6c-1.94,2.07-4.56,4.24-8.2,6.57-22.42,14.33-81.11,212.24-81.11,212.24,0,0-76.43,220.43,60.06,247.05,0,0,33.44-21.15,62.1-55.28,28.67-34.13,84.62-82.58,114.65-83.26,29.37-.67,137.08-.03,141.77,0h.17c4.69-.03,112.4-.67,141.77,0,30.02,.68,85.99,49.14,114.65,83.26s62.1,55.28,62.1,55.28c136.49-26.61,60.06-247.05,60.06-247.05Zm-174.5-215.87c18.93,0,34.33,15.4,34.33,34.33s-15.4,34.33-34.33,34.33-34.33-15.4-34.33-34.33,15.4-34.33,34.33-34.33Zm-52.57,52.54c18.93,0,34.33,15.4,34.33,34.33s-15.4,34.33-34.33,34.33-34.33-15.4-34.33-34.33,15.4-34.33,34.33-34.33Zm-423.25,32.96c0-37.32,30.37-67.69,67.7-67.69s67.69,30.36,67.69,67.69-30.36,67.7-67.69,67.7c-37.33,0-67.7-30.37-67.7-67.7Zm225.28,146.85c0,2.33-1.89,4.22-4.22,4.22h-30.96v30.97c0,2.33-1.89,4.22-4.22,4.22h-33.43c-2.33,0-4.22-1.89-4.22-4.22v-30.97h-30.96c-2.33,0-4.22-1.89-4.22-4.22v-33.43c0-2.33,1.89-4.22,4.22-4.22h30.96v-30.97c0-2.33,1.89-4.22,4.22-4.22h33.43c2.33,0,4.22,1.89,4.22,4.22v30.97h30.96c2.33,0,4.22,1.89,4.22,4.22v33.43Zm-10.18-123.52c-12.11,0-21.96-9.85-21.96-21.96s9.85-21.97,21.96-21.97,21.96,9.86,21.96,21.97-9.86,21.96-21.96,21.96Zm56.55-68.92c-22.7,0-41.16-18.47-41.16-41.17s18.47-41.16,41.16-41.16,41.16,18.47,41.16,41.16-18.46,41.17-41.16,41.17Zm58.1,24.99c12.11,0,21.96,9.86,21.96,21.97s-9.85,21.96-21.96,21.96-21.96-9.85-21.96-21.96,9.85-21.97,21.96-21.97Zm45.73,211.82c-37.33,0-67.69-30.37-67.69-67.7s30.36-67.69,67.69-67.69,67.69,30.36,67.69,67.69-30.36,67.7-67.69,67.7Zm100.34-100.22c-18.93,0-34.33-15.4-34.33-34.33s15.4-34.33,34.33-34.33,34.33,15.4,34.33,34.33-15.4,34.33-34.33,34.33Zm56.62-55.3c-18.93,0-34.33-15.4-34.33-34.33s15.4-34.33,34.33-34.33,34.33,15.4,34.33,34.33c0,18.93-15.4,34.33-34.33,34.33Z"/>`
  ]
   


  const svgArcadeList = [
    `<circle id="arcade-0" cx="582.1" cy="349.3" r="64.59"/>`,
    `<circle id="arcade-1" cx="717.28" cy="292.55" r="64.59"/>`,
    `<circle id="arcade-2" cx="610.38" cy="191.08" r="64.59"/>`,
    `<circle id="arcade-3" cx="746.86" cy="134.34" r="64.59"/>`,
    `<circle id="arcade-4" cx="1044.31" cy="145.64" r="64.59"/>`,
    `<circle id="arcade-5" cx="894.07" cy="133.64" r="64.59"/>`,
    `<circle id="arcade-6" cx="1016.1" cy="304.55" r="64.59"/>`,
    `<circle id="arcade-7" cx="865.86" cy="292.55" r="64.59"/>`,
    ,"","","",
    `<polyline id="arcade-12" points="149.88 188.84 191.07 171.76 232.32 188.83"/>`,
    `<polyline id="arcade-13" points="233.54 387.47 191.17 405.05 148.61 387.47"/>`,
    `<polyline id="arcade-14" points="91.43 329.35 74.47 288.57 91.54 247.2"/>`,
    `<polyline id="arcade-15" points="291.45 247.17 308.09 288.25 290.7 329.65"/>`,
  ]
  const svgArcadeStick = [
  `<circle id="stick1" data-name="stick1" class="cls-1" cx="191.12" cy="288.4" r="51.88"/>`,
  ]
  const svgArcadeDiagonals = [
    `<polyline id="downright" points="232.4 387.95 273.63 370.85 290.7 329.61"/>`,
    `<polyline id="upleft" points="91.54 247.2 108.6 205.96 149.84 188.86"/>`,
    `<polyline id="downleft" points="148.67 387.4 108.67 370.92 91.43 329.35"/>`,
    `<polyline id="upright" points="232.32 188.83 273.57 205.89 290.67 247.13"/>`,
  ]
 
  
  const GamepadDisplay = ({ arcadeOrXbox , gamepad}) => {
    // console.log("displaying gamepad", gamepads[gamepadId]);
    if (gamepad === undefined) {
      return <div className="plugIn">Plug In Your Controller and Press a Button to Begin...</div>
    } 
    else {
      // console.log(arcadeOrXbox)
      if (arcadeOrXbox){
        return (
          <div class="svg" id="arcadestick">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1158.42 549.83">
              <g id="base">
              <rect class="cls-5" width="1158.42" height="549.83"/>
              </g>
              <g id="stickbounds">
              <polyline id="stickbounds-2" class="cls-3" points="290.7 329.61 307.77 288.36 290.67 247.13 273.57 205.89 232.32 188.83 191.07 171.76 149.84 188.86 108.6 205.96 91.54 247.2 74.47 288.45 91.57 329.69 108.67 370.92 149.92 387.99 191.17 405.05 232.4 387.95"/>
              </g>
              <polyline id="downright" points="232.4 387.95 273.63 370.85 290.7 329.61"/>
              <polyline id="upleft" points="91.54 247.2 108.6 205.96 149.84 188.86"/>
              <polyline id="downleft" points="148.67 387.4 108.67 370.92 91.43 329.35"/>
              <polyline id="upright" points="232.32 188.83 273.57 205.89 290.67 247.13"/>
            </svg>
          
            {gamepad.buttons &&
            gamepad.buttons.map((button, index) => (
                // <div>
                //   {index}: {button.pressed ? 'True' : 'False'}
                // </div>
                <svg viewBox="0 0 1158.42 549.83" className={button.pressed ? "selected-button" : "cls-4" }dangerouslySetInnerHTML={{__html: svgArcadeList[index]}}></svg>
              ))}
          </div>
        );
      }
      else{
        return(
          <div class="svg" id="xbox">
            <svg id="base_layer" data-name="base_layer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 653.79">
              <path id ="base" d="M778.67,406.74s-58.68-197.91-81.1-212.24c-3.89-2.49-6.62-4.79-8.59-6.99l-184.74-52.05c-2.92,.76-4.68,1.03-4.68,1.03h-199.1s-1.96-.29-5.15-1.15l-184.66,52.6c-1.94,2.07-4.56,4.24-8.2,6.57-22.42,14.33-81.11,212.24-81.11,212.24,0,0-76.43,220.43,60.06,247.05,0,0,33.44-21.15,62.1-55.28,28.67-34.13,84.62-82.58,114.65-83.26,29.37-.67,137.08-.03,141.77,0h.17c4.69-.03,112.4-.67,141.77,0,30.02,.68,85.99,49.14,114.65,83.26s62.1,55.28,62.1,55.28c136.49-26.61,60.06-247.05,60.06-247.05Zm-174.5-215.87c18.93,0,34.33,15.4,34.33,34.33s-15.4,34.33-34.33,34.33-34.33-15.4-34.33-34.33,15.4-34.33,34.33-34.33Zm-52.57,52.54c18.93,0,34.33,15.4,34.33,34.33s-15.4,34.33-34.33,34.33-34.33-15.4-34.33-34.33,15.4-34.33,34.33-34.33Zm-423.25,32.96c0-37.32,30.37-67.69,67.7-67.69s67.69,30.36,67.69,67.69-30.36,67.7-67.69,67.7c-37.33,0-67.7-30.37-67.7-67.7Zm225.28,146.85c0,2.33-1.89,4.22-4.22,4.22h-30.96v30.97c0,2.33-1.89,4.22-4.22,4.22h-33.43c-2.33,0-4.22-1.89-4.22-4.22v-30.97h-30.96c-2.33,0-4.22-1.89-4.22-4.22v-33.43c0-2.33,1.89-4.22,4.22-4.22h30.96v-30.97c0-2.33,1.89-4.22,4.22-4.22h33.43c2.33,0,4.22,1.89,4.22,4.22v30.97h30.96c2.33,0,4.22,1.89,4.22,4.22v33.43Zm-10.18-123.52c-12.11,0-21.96-9.85-21.96-21.96s9.85-21.97,21.96-21.97,21.96,9.86,21.96,21.97-9.86,21.96-21.96,21.96Zm56.55-68.92c-22.7,0-41.16-18.47-41.16-41.17s18.47-41.16,41.16-41.16,41.16,18.47,41.16,41.16-18.46,41.17-41.16,41.17Zm58.1,24.99c12.11,0,21.96,9.86,21.96,21.97s-9.85,21.96-21.96,21.96-21.96-9.85-21.96-21.96,9.85-21.97,21.96-21.97Zm45.73,211.82c-37.33,0-67.69-30.37-67.69-67.7s30.36-67.69,67.69-67.69,67.69,30.36,67.69,67.69-30.36,67.7-67.69,67.7Zm100.34-100.22c-18.93,0-34.33-15.4-34.33-34.33s15.4-34.33,34.33-34.33,34.33,15.4,34.33,34.33-15.4,34.33-34.33,34.33Zm56.62-55.3c-18.93,0-34.33-15.4-34.33-34.33s15.4-34.33,34.33-34.33,34.33,15.4,34.33,34.33c0,18.93-15.4,34.33-34.33,34.33Z"/>
            </svg>
            {gamepad.buttons &&
            gamepad.buttons.map((button, index) => (
                // <div>
                //   {index}: {button.pressed ? 'True' : 'False'}
                // </div>
            
                <svg viewBox="0 0 800 653.79" className={button.pressed ? "selected-button" : "cls-4" }dangerouslySetInnerHTML={{__html: svgXboxList[index]}}></svg>
              ))}
          </div>
        )
      }
    }
    
  };
//TODO fix dropdown
  const DropDownMenu = ({ open, setOpen }) => {

    const moveList = ['QCF', 'QCB', 'HCF', 'HCB', 'DP', '360', 'HCBF', 'DQCF']

    return(
      <div className = "menu-container">
      <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
        <p>Select Move</p>
      </div>
    <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
      <h3>Select Your Move<br/><span>choose wisely...</span></h3>
      <ul>
        {moveList.map(move => 
          
          <div onClick={() => {
            console.log("AAAA")
            setmoveSelection(move)
          }}>
            <DropdownItem text={move} />
          </div>
          
        )}
        {/* <div onClick={()=>{setmoveSelection("QCF")}}>
          <DropdownItem text = {"QCF"}/>
        </div>
        <div onClick={()=>{setmoveSelection("QCB")}}>
          <DropdownItem text = {"QCB"}/>
        </div>
        <div onClick={()=>{setmoveSelection("HCF")}}>
          <DropdownItem text = {"HCF"}/>
        </div>
        <div onClick={()=>{console.log("AAAAAAAAAAA")}}>
          <DropdownItem text = {"HCB"}/>
        </div>
        <DropdownItem text = {"DP"}/>
        <DropdownItem text = {"360"}/>
        <DropdownItem text = {"HCBF"}/>
        <DropdownItem text = {"DQCF"}/> */}

      </ul>
    </div>
    </div>
    )

  }

  function DropdownItem({ text }){
  //   useEffect(() => {
  //     setmoveSelection(props.text)
  //     console.log(moveSelection)
  // },[moveSelection])
  //   console.log(moveSelection)
    return(
      <li className = 'dropdownItem'>
        {/* <img></img> */}
        <a>{text}</a>
      </li>
    )
  }
  function TipsButton() {
    const [showTips, setShowTips] = useState(false);
  
    const handleTipsClick = () => {
      setShowTips(!showTips);
    };
  
    return (
      <div className="tips-container">
        {showTips && (
          <div className="info-box">
            1. When performing an input, try to press the button right as you move to the the last direction!
            <br/>2. Remember that the game can only recognize 8 directions
            <br/>3. Keep in mind that this tool is <strong>LESS LENIENT</strong> than most modern fighting games- Try it out in your favorite game sometime!
          </div>
        )
        }
        <button onClick={handleTipsClick}>Tips!</button>

      </div>
      
    );
  }
  return (

    <div className="Gamepads">
      <div class="logoandbar">
      <img src="/img/roundstartlogo2.png" alt="RoundStart.GG logo"/>
      <nav class="navbar">
        <ul>
          <li><a href="#">RoundStart Pro Tool</a></li>
          <li><a href="#">Notation Guide</a></li>
          <li><a href="#">Research</a></li>
          <li><a href="#">About Us</a></li>
        </ul>
      </nav>
      </div>
     
        {/* <div className = "menu-container">
          <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
            <p>Select Move</p>
          </div>
        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
          <h3>Select Your Move<br/><span>choose wisely...</span></h3>
          <ul>
            <div onClick={()=>{setmoveSelection("QCF")}}>
              <DropdownItem text = {"QCF"}/>
            </div>
            <div onClick={()=>{setmoveSelection("QCB")}}>
              <DropdownItem text = {"QCB"}/>
            </div>
            <div onClick={()=>{setmoveSelection("HCF")}}>
              <DropdownItem text = {"HCF"}/>
            </div>
            <div onClick={()=>{console.log("AAAAAAAAAAA")}}>
              <DropdownItem text = {"HCB"}/>
            </div>
            <DropdownItem text = {"DP"}/>
            <DropdownItem text = {"360"}/>
            <DropdownItem text = {"HCBF"}/>
            <DropdownItem text = {"DQCF"}/>

          </ul>
        </div>
        </div> */}

<div class="MoveImages">
      <MoveSelect func={setmoveSelection} moveselection={"QCF"}/>
      <MoveSelect func={setmoveSelection} moveselection={"QCB"}/>
      <MoveSelect func={setmoveSelection} moveselection={"HCF"}/>
      <MoveSelect func={setmoveSelection} moveselection={"HCB"}/>
      <MoveSelect func={setmoveSelection} moveselection={"DP"}/>
      <MoveSelect func={setmoveSelection} moveselection={"360"}/>
      <MoveSelect func={setmoveSelection} moveselection={"HCBF"}/>
      <MoveSelect func={setmoveSelection} moveselection={"DQCF"}/>

</div>
<div class="info">
<div class='debug'>
    <h1>Debug Info</h1>
    <h2>{circularBufferButtons[0] + ` BUTTONS`}</h2>
    <h2>{circularBufferDir + ` DIRECTION`}</h2>
    <h2>{Math.trunc(...circularBufferDirTime) + ` DIR TIME`}</h2>
    <h2>{Math.trunc(...circularBufferButtonsTime) + ` BUTTON TIME`}</h2>
  </div>
  <FeedbackDisplay feedback={feedback} timediff={timediff}/>
</div>

      <div class="TipsButton">
        <TipsButton/>
    </div>
    <div class="center">
        {/* <DropDownMenu open={open} setOpen={setOpen}/> */}
        <div class="Selector">
          <SelectorSwitch func={setarcadeOrXbox} arcadeOrXbox={arcadeOrXbox}/>
        </div>
          <GamepadDisplay arcadeOrXbox={arcadeOrXbox} gamepad={gamepads[0]}/>
    </div>
    </div>
  );
}