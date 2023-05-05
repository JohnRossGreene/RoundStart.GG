const SelectorSwitch = ( { func, arcadeOrXbox }) => {
    return (
        <button id="selectorswitch" onClick={() => func(!arcadeOrXbox)}>
            <span>Change Controller Display Style</span>
        </button>
    )
}

export default SelectorSwitch