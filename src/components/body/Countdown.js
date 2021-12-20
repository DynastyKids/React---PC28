import React, { useEffect, useState } from "react";
import "../../App.css";

function Countdown(newdate) {

    // console.log(newdate)
    const [textArr, setTextArr] = React.useState([]);
    const text=[]

    const calculateTimeLeft = () => {
        // const difference = +new Date() - +new Date();
        const difference = +new Date(newdate.date) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60))),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    if(Object.keys(timeLeft).length > 0){
        text.push(parseInt(timeLeft.minutes /10))
        text.push(parseInt(timeLeft.minutes %10))
        text.push(":")
        text.push(parseInt(timeLeft.seconds /10))
        text.push(parseInt(timeLeft.seconds %10))
        setTextArr(text)
    } else{
        text.push("开")
        text.push("奖")
        text.push("")
        text.push("中")
        text.push("…")
        setTextArr(text)
    } 

    return (
        <>
        <dl>
            <dd><em id="bjmin1">{textArr[0]}</em></dd>
            <dd><em id="bjmin2">{textArr[1]}</em></dd>
            <dt id="bjdivider">{textArr[2]}</dt>
            <dd><em id="bjsec1">{textArr[3]}</em></dd>
            <dd><em id="bjsec2">{textArr[4]}</em></dd>
        </dl>
        </>
    );
}

export default Countdown;