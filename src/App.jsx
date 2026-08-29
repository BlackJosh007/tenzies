import Die from "./component/Die.jsx"
import "./App.css"
import { use, useState, useRef } from "react"
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

    return (
        <main>
            {gameWon && <Confetti />}
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

            <button onClick={rollDice} className="roll-dice" ref={rollButtonRef}>{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
} 