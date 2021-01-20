import React, {useState} from 'react';
import './ReactTimerStopwatch.css';
import Circle from "./Component/Circle/Circle";
import Time from "./Component/Time/Time";

const ReactTimerStopwatch = (props) => {

    const [hint, setHint] = useState(0);
    const getHint = (h) => {
        setHint(h);
    };
    // const mygetHint = (h) => {
    //     console.log(h);
    //     setHint(h);
    // }

    return (
        <div className="react-stopwatch-timer__table">
            <Time isOn={props.isOn} hint={getHint} watchType={props.watchType} displayHours={props.displayHours}
                  displayMinutes={props.displayMinutes} displaySeconds={props.displaySeconds}
                  fromTime={new Date(0, 0, 0, 0, 0, 0, 0)} setintervalId={props.setintervalId} />
            {(props.displayCircle === true) ?
                <Circle color={props.color} tintColor={props.hintColor} hint={hint}/> : null}
            {(props.children !== undefined) ?
                <div className="react-stopwatch-timer__container">
                    {props.children}
                </div> : null}
        </div>
    );
};

export default ReactTimerStopwatch;