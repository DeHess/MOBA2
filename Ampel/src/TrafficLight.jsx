import { useState } from "react"
import Light from './Light.jsx'
import './TrafficLight.css'

function TrafficLight() {

    const [step, setStep] = useState(0)
    const [state, setState] = useState('red')

    function nextStep() {
        if (step === 0) {
            setState('red')
            setStep(1)
        }
        if (step === 1) {
            setState('yellow')
            setStep(2)
        }
        if (step === 2) {
            setState('green')
            setStep(3)
        }
        if (step === 3) {
            setState('yellow')
            setStep(4)
        }
    }

    return (
        <div className="trafficLight" onClick={nextStep}>
            <Light color={'red'} active={state === 'red'}></Light>
            <Light color={'yellow'} active={state === 'yellow'}></Light>
            <Light color={'green'} active={state === 'green'}></Light>
        </div>
    )
}

export default TrafficLight