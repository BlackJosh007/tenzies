# 🎲 Tenzies

A React implementation of the dice game Tenzies — roll until all 10 dice match, holding the ones you want to lock in along the way.

**🔗 Live demo:** https://tenzies-six-silk.vercel.app/

> This is a learning-stage build — my React capstone project from freeCodeCamp. It's functional and deployed, but still evolving as I learn.

## How to Play

Roll the dice. Click a die to "hold" it at its current value. Keep rolling the unheld dice until all 10 dice show the same value — and are all held. Confetti (and a screen-reader announcement) confirms the win.

## What I Practiced

- Array/object state management (mapping over arrays of dice objects, updating one by id without mutating the rest)
- `useState`, `useRef`, and `useEffect` together — using a ref to manage focus on the roll/new game button when the game is won
- Writing a correct "check every item" condition — see the note below, this one taught me a lot
- Basic accessibility: `aria-live` region for the win announcement, focus management for keyboard users

### A bug worth mentioning

My first pass at the win-check used a for-loop with a counter comparing each die to the next one. It looked correct and passed casual testing — but its loop bounds meant the *last* die's `isHeld` status was never actually checked, which could produce a false win in a rare edge case. Rewriting it with two `.every()` checks (one for `isHeld`, one for matching value) fixed it by checking every die symmetrically, with no gap. Full writeup on that here: *(dev.to link once published)*.

## Tech Stack

- React (Vite)
- `nanoid` for stable dice keys
- `react-confetti` for the win celebration

## What's Next

- [ ] Timer + roll counter, to track how fast you can win
- [ ] Dice styled with actual pips instead of numbers
- [ ] Full keyboard navigation

## Running Locally

```bash
git clone https://github.com/BlackJosh007/tenzies.git
cd tenzies
npm install
npm run dev
```
