import { useState, useEffect } from "react";
import Light from "./Light.jsx";
import "./TrafficLight.css";

function TrafficLight() {
    const [step, setStep] = useState(0);
    const [state, setState] = useState("red");

    useEffect(() => {
        const interval = setInterval(nextStep, 1000); 
        return () => clearInterval(interval); 
    }, [step]); 

    function nextStep() {
        setStep((prevStep) => {
            const newStep = (prevStep + 1) % 4; 
            switch (newStep) {
                case 0:
                    setState("red");
                    break;
                case 1:
                    setState("yellow");
                    break;
                case 2:
                    setState("green");
                    break;
                case 3:
                    setState("yellow");
                    break;
                default:
                    break;
            }
            return newStep;
        });
    }

    return (
        <div className="trafficLight" onClick={nextStep}>
            <Light color="red" active={state === "red"} />
            <Light color="yellow" active={state === "yellow"} />
            <Light color="green" active={state === "green"} />
        </div>
    );
}

export default TrafficLight;
