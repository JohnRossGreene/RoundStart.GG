import { useState, useEffect } from 'react'

const Gamepad = ({ arcadeorxbox, buttons, sticks, controllerIndex }) => {



    useEffect(() => {
        buttons.forEach(button => {
            console.log(button)
        })

    }, [buttons])

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
            
            console.log(buttonElement)

            // const buttonElement = document.getElementById(`arcade-${i}`);
            // const buttonElement = document.getElementById(`controller-${i}`);
  
            // const selectedButtonClass = 'selected-button';
            // if(buttonElement){
            //     if(button.value > 0)
            //     {
            //         buttonElement.classList.add(selectedButtonClass);
            //         console.log(buttonElement.id);
            //         //For handling corners on arcadestick
            //             //might just abandon
            //         // buttonspressed.push(buttonElement.id);
            //         // if(buttonspressed.includes());
            //     }
            //     else
            //     {
            //         buttonElement.classList.remove(selectedButtonClass);
            //         // const idx = buttonspressed.indexof(buttonElement.id);
            //         // buttonspressed.splice(idx,1)
  
            //     }
            // }
            
        }
    }
    function updateStick(elementId, leftRightAxis, upDownAxis) {
        const multiplier = 25;
        const stickLeftRight = leftRightAxis * multiplier;
        const stickUpDown = upDownAxis * multiplier;
        const stick = document.getElementById(elementId);
        const x = Number(stick.getAttribute("data-og_x"));
        const y = Number(stick.getAttribute("data-og_y"));
        //TODO set deadzones
            //and create input bounds
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
    function gameLoop() {
  
        if (controllerIndex !== null){
            // console.log(controllerIndex)
            // console.log(gamepad.buttons)
            // console.log(arcadeorxbox);
            handleButtons(gamepad.buttons, arcadeorxbox);
            // handleSticks(gamepad.axes, arcadeorxbox);
        }
        requestAnimationFrame(gameLoop());
    }
    if (arcadeorxbox) {
        return (
            <div class="svg" id="xbox_div">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 653.79">
                    <g id="xbox">
                        <circle id="stick1" cx="503.82" cy="399.93" data-og_x="503.82" data-og_y="399.93" r="37.42"/>
                        <circle id="stick2" cx="196.03" cy="276.39" data-og_x="196.03" data-og_y="276.39" r="37.41"/>
                        <path id="controller-7" d="M658.73,121.76h-68.52c-4.14,0-7.72-2.87-8.63-6.91l-19.8-88.14c-.16-.71-.25-1.44-.22-2.16C562.15,10.89,573.4,0,587.2,0h35.35C636.42,0,647.72,11.02,648.18,24.78c.02,.58,.08,1.15,.2,1.72l18.98,84.48c1.24,5.53-2.96,10.78-8.63,10.78Z"/>
                        <path id="controller-6" d="M140.13,121.76h68.52c4.14,0,7.72-2.87,8.63-6.91l19.8-88.14c.16-.71,.25-1.44,.22-2.16C236.72,10.89,225.46,0,211.67,0h-35.35c-13.87,0-25.17,11.02-25.63,24.78-.02,.58-.08,1.15-.2,1.72l-18.98,84.48c-1.24,5.53,2.96,10.78,8.63,10.78Z"/>
                        <circle id="controller-2" cx="551.6" cy="277.75" r="25.89" transform="translate(-37.37 91.94) rotate(-9.22)"/>
                        <circle id="controller-8" cx="343.46" cy="277.75" r="13.52"/>
                        <path id="controller-5" d="M668.12,154.23c-23.2-17.74-117.38-47.78-133.76-34.13-11.32,9.43-23.6,13.64-30.12,15.35l184.74,52.05c-9.4-10.47-1.68-18.61-20.86-33.28Z"/>
                        <path id ="base" d="M778.67,406.74s-58.68-197.91-81.1-212.24c-3.89-2.49-6.62-4.79-8.59-6.99l-184.74-52.05c-2.92,.76-4.68,1.03-4.68,1.03h-199.1s-1.96-.29-5.15-1.15l-184.66,52.6c-1.94,2.07-4.56,4.24-8.2,6.57-22.42,14.33-81.11,212.24-81.11,212.24,0,0-76.43,220.43,60.06,247.05,0,0,33.44-21.15,62.1-55.28,28.67-34.13,84.62-82.58,114.65-83.26,29.37-.67,137.08-.03,141.77,0h.17c4.69-.03,112.4-.67,141.77,0,30.02,.68,85.99,49.14,114.65,83.26s62.1,55.28,62.1,55.28c136.49-26.61,60.06-247.05,60.06-247.05Zm-174.5-215.87c18.93,0,34.33,15.4,34.33,34.33s-15.4,34.33-34.33,34.33-34.33-15.4-34.33-34.33,15.4-34.33,34.33-34.33Zm-52.57,52.54c18.93,0,34.33,15.4,34.33,34.33s-15.4,34.33-34.33,34.33-34.33-15.4-34.33-34.33,15.4-34.33,34.33-34.33Zm-423.25,32.96c0-37.32,30.37-67.69,67.7-67.69s67.69,30.36,67.69,67.69-30.36,67.7-67.69,67.7c-37.33,0-67.7-30.37-67.7-67.7Zm225.28,146.85c0,2.33-1.89,4.22-4.22,4.22h-30.96v30.97c0,2.33-1.89,4.22-4.22,4.22h-33.43c-2.33,0-4.22-1.89-4.22-4.22v-30.97h-30.96c-2.33,0-4.22-1.89-4.22-4.22v-33.43c0-2.33,1.89-4.22,4.22-4.22h30.96v-30.97c0-2.33,1.89-4.22,4.22-4.22h33.43c2.33,0,4.22,1.89,4.22,4.22v30.97h30.96c2.33,0,4.22,1.89,4.22,4.22v33.43Zm-10.18-123.52c-12.11,0-21.96-9.85-21.96-21.96s9.85-21.97,21.96-21.97,21.96,9.86,21.96,21.97-9.86,21.96-21.96,21.96Zm56.55-68.92c-22.7,0-41.16-18.47-41.16-41.17s18.47-41.16,41.16-41.16,41.16,18.47,41.16,41.16-18.46,41.17-41.16,41.17Zm58.1,24.99c12.11,0,21.96,9.86,21.96,21.97s-9.85,21.96-21.96,21.96-21.96-9.85-21.96-21.96,9.85-21.97,21.96-21.97Zm45.73,211.82c-37.33,0-67.69-30.37-67.69-67.7s30.36-67.69,67.69-67.69,67.69,30.36,67.69,67.69-30.36,67.7-67.69,67.7Zm100.34-100.22c-18.93,0-34.33-15.4-34.33-34.33s15.4-34.33,34.33-34.33,34.33,15.4,34.33,34.33-15.4,34.33-34.33,34.33Zm56.62-55.3c-18.93,0-34.33-15.4-34.33-34.33s15.4-34.33,34.33-34.33,34.33,15.4,34.33,34.33c0,18.93-15.4,34.33-34.33,34.33Z"/>
                        <path id="controller-4" d="M265.66,120.11c-16.38-13.65-110.56,16.38-133.76,34.13-19.43,14.86-11.25,23.02-21.25,33.7l184.66-52.6c-6.63-1.78-18.6-6.01-29.65-15.22Z"/>
                        <circle id="controller-0" cx="604.17" cy="333.05" r="25.89" transform="translate(65.26 763.78) rotate(-67.5)"/>
                        <circle id="controller-1" cx="660.79" cy="277.75" r="25.89" transform="translate(151.31 781.95) rotate(-67.5)"/>
                        <circle id="controller-9" cx="458.11" cy="277.75" r="13.52"/>
                        <circle id="controller-3" cx="604.17" cy="225.21" r="25.89" transform="translate(-28.27 99.69) rotate(-9.22)"/>
                        <path id="controller-14" d="M283.09,392.66c-.99,.86-2.27,1.38-3.67,1.38h-28.18c-.77,0-1.39,.62-1.39,1.39v22.2c0,.77,.62,1.39,1.39,1.39h28.18c1.73,0,3.28,.78,4.3,2.01l13.87-13.87-14.5-14.5Z"/>
                        <path id="controller-13" d="M283.72,421.03c.82,.97,1.31,2.23,1.31,3.6v28.19c0,.77,.62,1.39,1.39,1.39h22.2c.77,0,1.39-.62,1.39-1.39v-28.19c0-1.41,.52-2.69,1.38-3.67l-13.8-13.8-13.87,13.87Z"/>
                        <path id="controller-12" d="M310.01,389.81v-29.58c0-.77-.62-1.39-1.39-1.39h-22.2c-.77,0-1.39,.62-1.39,1.39v28.19c0,1.69-.75,3.21-1.94,4.24l14.5,14.5,14.04-14.04c-.98-.77-1.62-1.96-1.62-3.3Z"/>
                        <path id="controller-15" d="M343.8,394.03h-29.57c-.98,0-1.88-.35-2.6-.92l-14.04,14.04,13.8,13.8c1.03-1.19,2.54-1.94,4.24-1.94h28.18c.77,0,1.39-.62,1.39-1.39v-22.2c0-.77-.62-1.39-1.39-1.39Z"/>
                    </g>
                </svg>
            </div>
        )
        } else {
            return (
                <div class="svg" id="arcadestick">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1158.42 549.83">
                        <g id="base">
                        <rect class="cls-5" width="1158.42" height="549.83"/>
                        </g>
                        <g id="stickbounds">
                        <polyline id="stickbounds-2" class="cls-3" points="290.7 329.61 307.77 288.36 290.67 247.13 273.57 205.89 232.32 188.83 191.07 171.76 149.84 188.86 108.6 205.96 91.54 247.2 74.47 288.45 91.57 329.69 108.67 370.92 149.92 387.99 191.17 405.05 232.4 387.95"/>
                        </g>
                        <circle id="stick1" data-name="stick1" class="cls-1" cx="191.12" cy="288.4" r="51.88"/>
                        <circle id="arcade-6" cx="1016.1" cy="304.55" r="64.59"/>
                        <circle id="arcade-4" cx="1044.31" cy="145.64" r="64.59"/>
                        <circle id="arcade-7" cx="865.86" cy="292.55" r="64.59"/>
                        <circle id="arcade-5" cx="894.07" cy="133.64" r="64.59"/>
                        <circle id="arcade-0" cx="582.1" cy="349.3" r="64.59"/>
                        <circle id="arcade-2" cx="610.38" cy="191.08" r="64.59"/>
                        <circle id="arcade-1" cx="717.28" cy="292.55" r="64.59"/>
                        <circle id="arcade-3" cx="746.86" cy="134.34" r="64.59"/>
                        <polyline id="downright" points="232.4 387.95 273.63 370.85 290.7 329.61"/>
                        <polyline id="upleft" points="91.54 247.2 108.6 205.96 149.84 188.86"/>
                        <polyline id="arcade-12" points="149.88 188.84 191.07 171.76 232.32 188.83"/>
                        <polyline id="arcade-13" data-name="controller-12" points="233.54 387.47 191.17 405.05 148.61 387.47"/>
                        <polyline id="downleft" points="148.67 387.4 108.67 370.92 91.43 329.35"/>
                        <polyline id="arcade-14" points="91.43 329.35 74.47 288.57 91.54 247.2"/>
                        <polyline id="arcade-15"points="291.45 247.17 308.09 288.25 290.7 329.65"/>
                        <polyline id="upright" points="232.32 188.83 273.57 205.89 290.67 247.13"/>
                    </svg>
                </div>
            )
        }
}

export default Gamepad;