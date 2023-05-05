const FeedbackDisplay = ( { timediff, feedback }) => {
    if (feedback == "PERFECT")
    {
        return (
            <div className="FeedbackContainer">
                <span className="FeedbackDot" style={{backgrounColor: "#00FF9A"}}>{feedback}</span>
                
            </div>
        )
    }
    else
    if(feedback == "EARLY")
    {
        return(
            <div className="FeedbackContainer">
                <span className="FeedbackDot" style={{backgroundColor:"#24BDD3"}}>{feedback + `\nby\n` + timediff}</span>
            </div>
        )
    }
    else
    if (feedback == "LATE")
    {
        return(
            <div className="FeedbackContainer">
                <span className="FeedbackDot" style={{backgroundColor:"#AD1C30"}}>{feedback + `\nby\n` + timediff + `ms`}</span>
            </div>
        )
    }
    else
    if(feedback == "BUTTON")
    {
        return(
            <div className="FeedbackContainer">
                <span className="FeedbackDot" style={{backgroundColor:"#FFB347"}}>Wrong Button</span>
            </div>
        )
    }
    else
    if (feedback == "INCORRECT")
    {
        return(
            <div className="FeedbackContainer">
                <span className="FeedbackDot" style={{backgroundColor:"#3a2169"}}>Missed Motion</span>
            </div>
        )
    }
    else
    if(feedback != null)
    {
        return(
             <div className="FeedbackContainer">
                <span className="FeedbackDot"/>
            </div>
        )

    }
}

export default FeedbackDisplay