import { useState, useEffect } from "react"  
import "@/styles/clock.css" 

const Clock = () => {
    const [time, setTime] = useState(new Date()) 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date()) 
        }, 1000) 
  
        return () => clearInterval(intervalId) 
    }, []) 

    const hours = time.getHours() 
    const minutes = time.getMinutes() 
    const seconds = time.getSeconds() 
  
    const hourDeg = (hours + minutes / 60) * 30 
    const minuteDeg = (minutes + seconds / 60) * 6 
    const secondDeg = seconds * 6 
  
    const hourStyle = {
        transform: `rotate(${hourDeg}deg) translate(0px, -15px)`,
    } 
  
    const minuteStyle = {
        transform: `rotate(${minuteDeg}deg) translate(0px, -25px)`,
    } 
  
    const secondStyle = {
        transform: `rotate(${secondDeg}deg) translate(0px, -15px)`,
        backgroundColor: "#ff0000",
    } 
  
    return (
        <div className="App">
            <div className="clock digital">
                {time.toLocaleTimeString()}
            </div>

            <div className="analog-clock">
                <div className="clock-circle">
                    {[...Array(12)].map((_, index) => (
                        <div
                            key={index}
                            className="clock-number"
                            style={{
                                transform: `rotate(${index * 30}deg) translate(0, -70px)`,
                            }}
                        >
                            {index === 0 ? 12 : index}
                        </div>
                    ))}
                </div>

                <div className="hand hour-hand" style={hourStyle}></div>
                <div className="hand minute-hand" style={minuteStyle}></div>
                <div className="hand second-hand" style={secondStyle}></div>
            </div>
        </div>
    ) 
} 

export default Clock 
