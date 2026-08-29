import "./Die.css"
export default function Die({ value, isHeld, holdFunc, uniqueKey }) {
    const style = {
        background: isHeld ? "#59E391" : "white"
    }
    return (
        <button style={style}
            className="dice-btn"
            onClick={holdFunc}
            aria-pressed={isHeld}
            aria-label={`Die with value ${value}, ${isHeld ? 'held' : 'not held'}`}
        >
            {value}
        </button>
    )
}