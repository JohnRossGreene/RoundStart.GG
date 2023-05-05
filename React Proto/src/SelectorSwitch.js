const SelectorSwitch = ( { func, arcadeorxbox }) => {
    return (
        <button id="selectorswitch" onClick={() => func(!arcadeorxbox)}>
            <span>Change controller</span>
        </button>
    )
}
export default SelectorSwitch