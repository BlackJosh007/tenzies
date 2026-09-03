import Die from "./component/Die.jsx"
import "./App.css"
import { use, useState, useRef, useEffect } from "react"
import { nanoid, random } from 'nanoid'
/* import { useWindowSize } from 'react-use' */
import Confetti from 'react-confetti'
import { RotateCcw } from 'lucide-react';


export default function App() {
    const [diceNo, setDiceNo] = useState(generateAllNewDice)
    const rollButtonRef = useRef(null)

    let gameWon = false;
    if (
        diceNo.every(die => die.isHeld) &&
        diceNo.every(die => die.value === diceNo[0].value)
    ) {
        gameWon = true;
        console.log("Game won!")

    }

    /* const currentTime = useRef(null); */
    const [bestTimeState, setBestTime] = useState(Infinity)
    const [bestRoll, setBestRoll] = useState(Infinity)


    useEffect(() => {
        gameWon ? rollButtonRef.current.focus() : null

        if (gameWon) {
            if (milliSeconds < bestTimeState) {
                setBestTime(milliSeconds)
                setBestRoll(roll_count.current)
            }

            /* highScoreCheck() */

        }
    }, [gameWon])
    const bestMinutes = Math.floor(bestTimeState / 60000);
    const bestSeconds = Math.floor((bestTimeState % 60000) / 1000);
    const bestMilliseconds = Math.floor((bestTimeState % 1000) / 10);

    const bestFormattedTime = [
        String(bestMinutes).padStart(2, '0'),
        String(bestSeconds).padStart(2, '0'),
        String(bestMilliseconds).padStart(2, '0')
    ].join(':');


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


    //Initiate my roll-countRef


    /*  useEffect(() => {
 
 
     }, [restartTrack]) */

    function rollDice() {
        setDiceNo(prevDice => prevDice.map(
            dice => dice.isHeld == false ?
                { ...dice, value: Math.floor(Math.random() * 6) + 1 }
                : dice
        ))

        roll_count.current = roll_count.current + 1
    }


    function hold(id) {
        setDiceNo(prevDice => prevDice.map(
            dice => dice.id === id ?
                { ...dice, isHeld: !dice.isHeld }
                : dice
        )
        )
    }


    const [milliSeconds, setMilliSeconds] = useState(0)

    const intervalRef = useRef(null)
    const timerStarted = useRef(false)

    useEffect(() => {
        //Effect
        const hasHeld = diceNo.some(die => die.isHeld)

        //Check if the timer hasn't started and if any dice has been held.. This is the condition to start the timer, so the timer will start only after a dice is held, and it we won't have multiple timer because the timer must not have started...

        if (hasHeld && !timerStarted.current) {
            timerStarted.current = true

            intervalRef.current = setInterval(() => {
                setMilliSeconds(prevSec => prevSec + 10)
            }, 10)
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

    const roll_count = useRef(0)

    function newGame() {
        setDiceNo(generateAllNewDice)
        roll_count.current = 0

        console.log('Render')

        clearInterval(intervalRef.current)
        setMilliSeconds(() => 0)

        //Also reset our refs
        timerStarted.current = false
        intervalRef.current = null
    }

    const minutes = Math.floor(milliSeconds / 60000);
    const seconds = Math.floor((milliSeconds % 60000) / 1000);
    const milliseconds = Math.floor((milliSeconds % 1000) / 10);

    // Format with leading zeros
    const formattedTime = [
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0'),
        String(milliseconds).padStart(2, '0')
    ].join(':');

    const [menu, SetMenu] = useState(false)

    function menuToggle() {
        SetMenu(prevVal => !prevVal)
    }



    return (
        <main>
            {gameWon && <Confetti />}

            <div className={`highscores-panel ${menu ? "open" : ""}`}>
                <h3>🏆 Personal Best (Top 2)</h3>

                <div className="scores-list">
                    {/* You will map over your high score array state here */}
                    {/* Example of a single row structure: */}
                    <div className="score-row">
                        <span className="rank">#1</span>
                        <span className="score-time">⏱️ {bestFormattedTime}</span>
                        <span className="score-rolls">🎲 {bestRoll} rolls</span>
                    </div>

                </div>


                <button className="close-btn" onClick={menuToggle}>Close</button>
            </div>


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


            <div className="game-controls-wrapper">

                {/* Your updated timer layout */}
                <div className="timer">
                    <h2>{formattedTime}</h2>
                    <p>Roll_Count:{roll_count.current}</p>


                    <div className="action-buttons-group">
                        <button className="restart-btn" aria-label="Restart game" onClick={newGame}>
                            <RotateCcw size={22} color='currentColor' strokeWidth={2} />
                        </button>

                        <button className="leaderboard-toggle-btn" aria-label="Open high scores" onClick={menuToggle}>
                            🏆
                        </button>
                    </div>
                </div>

            </div>
            <button onClick={gameWon ? newGame : rollDice} className="roll-dice" ref={rollButtonRef}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
} 