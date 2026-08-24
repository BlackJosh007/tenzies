import Die from "./component/Die.jsx"
import "./App.css"
import { use, useState } from "react"

export default function App() {
    function generateAllNewDice() {
        let randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 6) + 1)

        return randomArray
    }

    generateAllNewDice()

    const [diceNo, setDiceNo] = useState(generateAllNewDice)

    function rollDice() {
        setDiceNo(generateAllNewDice)
    }

    return (
        <main>
            <div className="dice-container">
                {diceNo.map(dice => <Die
                    value={dice} />)}
            </div>

            <button onClick={rollDice} className="roll-dice">Roll</button>
        </main>
    )
} 