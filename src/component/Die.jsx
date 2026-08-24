import "./Die.css"
export default function Die({ value }) {
    return (
        <button className="dice-btn">{value}</button>
    )
}