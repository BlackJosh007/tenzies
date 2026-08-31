import Die from "./component/Die.jsx"
import "./App.css"
import { use, useState, useRef, useEffect } from "react"
import { nanoid, random } from 'nanoid'
/* import { useWindowSize } from 'react-use' */
import Confetti from 'react-confetti'


export default function App() {
    const [diceNo, setDiceNo] = useState(generateAllNewDice)
    const rollButtonRef = useRef(null)






    /*  let count = 0;
     for (let i = 0; i < diceNo.length - 1; i++) {
 
         if (diceNo[i].isHeld && (diceNo[i].value == diceNo[i + 1].value)) {
             count += 1;
             if (count === diceNo.length - 1) console.log("you won")
         }
     } */
    let gameWon = false;
    if (
        diceNo.every(die => die.isHeld) &&
        diceNo.every(die => die.value === diceNo[0].value)
    ) {
        gameWon = true;
        console.log("Game won!")

    }

    useEffect(() => {
        gameWon ? rollButtonRef.current.focus() : null
    }, [gameWon])



    function generateAllNewDice() {
        const randomArray = Array.from({ length: 10 }, () => (
            {
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: nanoid()
            }
        ))
        /* console.log(randomArray[0]) */
        return randomArray
    }
    /* generateAllNewDice() */

    function rollDice() {
        rollButtonRef.current.innerText === "New Game" ? setDiceNo(generateAllNewDice) : setDiceNo(prevDice => prevDice.map(
            dice => dice.isHeld == false ?
                { ...dice, value: Math.floor(Math.random() * 6) + 1 }
                : dice
        ))
    }


    function hold(id) {
        setDiceNo(prevDice => prevDice.map(
            dice => dice.id === id ?
                { ...dice, isHeld: !dice.isHeld }
                : dice
        )
        )
    }

    /* useEffect(() => {
        diceNo.some(die => die.isHeld) ? intervalRef.current = setInterval(() => {
            setSeconds(prevSev => prevSev + 1)
            console.log('running')
        }, 1000) : null

        if (gameWon) { clearInterval(timerDiv.current) }

        return () => clearInterval(timerDiv.current);
    },
        [diceNo.some(die => die.isHeld), gameWon]) */

    const [seconds, setSeconds] = useState(0)

    const intervalRef = useRef(null)
    const timerStarted = useRef(false)

    useEffect(() => {
        //Effect
        const hasHeld = diceNo.some(die => die.isHeld)

        //Check if the timer hasn't started and if any dice has been held.. This is the condition to start the timer, so the timer will start only after a dice is held, and it we won't have multiple timer because the timer must not have started...

        if (hasHeld && !timerStarted.current) {
            timerStarted.current = true

            intervalRef.current = setInterval(() => {
                setSeconds(prevSec => prevSec + 1)
            }, 1000)
        }
    }, [diceNo])

    //SecondEffect
    useEffect(() => {
        if (gameWon && timerStarted.current) {
            clearInterval(intervalRef.current)

            //Also reset our refs
            timerStarted.current = false
            intervalRef.current = null
        }
    }, [gameWon])


    return (
        <main>
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! you won! Press "New Game"</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceNo.map(diceObj => <Die
                    key={diceObj.id}
                    value={diceObj.value}
                    isHeld={diceObj.isHeld}
                    holdFunc={() => hold(diceObj.id)}
                    uniqueKey={diceObj.id} />)}
            </div>

            <div className="timer" ><h2>{seconds}</h2></div>
            <button onClick={rollDice} className="roll-dice" ref={rollButtonRef}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
} 