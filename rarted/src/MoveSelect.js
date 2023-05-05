import { useState } from "react";



const MoveSelect = ( { func, moveselection }) => {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
      func(moveselection);
      setSelected(true);
    };
  
    const handleDeselect = () => {
      setSelected(false);
    };
    if(moveselection !== "HCBF" && moveselection !== "DQCF")
    {
        return (
            <div class="MoveImage">
                <img src={`/img/` +moveselection + `.png`} alt={moveselection+`Motion`} width="100" height="100" style={{ filter: selected ? "brightness(0) saturate(100%) invert(19%) sepia(100%) saturate(4494%) hue-rotate(281deg) brightness(92%) contrast(130%) drop-shadow(-1px -2px 0 white)" : "none" }}/>
                <div class="Button">
                    <button id="moveselect" onClick={handleClick} onBlur={handleDeselect}>
                        <span>{moveselection}</span>
                    </button>
                </div>
            </div>
        )
    }
    else if (moveselection === "HCBF")
    {
        return(
            <div class="MoveImage">
            <div class="HCBF">
              <img src="/img/HCB.png" id="HCBF1" alt="HCBF Motion" width="100" height="100" style={{ filter: selected ? "brightness(0) saturate(100%) invert(19%) sepia(100%) saturate(4494%) hue-rotate(281deg) brightness(92%) contrast(130%) drop-shadow(-1px -2px 0 white)" : "none" }}/>
              <img src="/img/Forward.png" id="HCBF2" alt="HCBF Motion" width="100" height="100"style={{ filter: selected ? "brightness(0) saturate(100%) invert(19%) sepia(100%) saturate(4494%) hue-rotate(281deg) brightness(92%) contrast(130%) drop-shadow(-1px -2px 0 white)" : "none" }}/>
            </div>
            <button id="moveselect" onClick={handleClick} onBlur={handleDeselect}>
                <span>{moveselection}</span>
            </button>
          </div>
        )
    }
    else if (moveselection === "DQCF"){
        return(
            <div class="MoveImage">
            <div class="DQCF">
                <img src="/img/QCF.png" id="DQCF1" alt="QCF Motion" width="100" height="100"style={{ filter: selected ? "brightness(0) saturate(100%) invert(19%) sepia(100%) saturate(4494%) hue-rotate(281deg) brightness(92%) contrast(130%) drop-shadow(-1px -2px 0 white)" : "none" }}/>
                <img src="/img/QCF.png" id="DQCF2" alt="QCF Motion" width="100" height="100"style={{ filter: selected ? "brightness(0) saturate(100%) invert(19%) sepia(100%) saturate(4494%) hue-rotate(281deg) brightness(92%) contrast(130%) drop-shadow(-1px -2px 0 white)" : "none" }}/>
            </div>
                <button id="moveselect" onClick={handleClick} onBlur={handleDeselect}>
                    <span>{moveselection}</span>
                </button>
            </div>
        )
    }
}

export default MoveSelect