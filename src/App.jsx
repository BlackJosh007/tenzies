import Die from "./component/Die.jsx"
import "./App.css"
import { use, useState } from "react"
import { nanoid, random } from 'nanoid'

export default function App() {
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

    const [diceNo, setDiceNo] = useState(generateAllNewDice())

    function rollDice() {
        setDiceNo(prevDice => prevDice.map(
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
            <div className="dice-container">
                {diceNo.map(diceObj => <Die
                    key={diceObj.id}
                    value={diceObj.value}
                    isHeld={diceObj.isHeld}
                    holdFunc={() => hold(diceObj.id)}
                    uniqueKey={diceObj.id} />)}
            </div>

            <button onClick={rollDice} className="roll-dice">Roll</button>
        </main>
    )
} 