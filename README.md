🎲 Tenzies
A React implementation of the dice game Tenzies — roll until all 10 dice match, holding the ones you want to lock in along the way.

🔗 Live demo: https://tenzies-six-silk.vercel.app/

This is a learning-stage build — my React capstone project from freeCodeCamp. It's functional and deployed, but still evolving as I learn.

How to Play
Roll the dice. Click a die to "hold" it at its current value. Keep rolling the unheld dice until all 10 dice show the same value — and are all held. Confetti (and a screen-reader announcement) confirms the win. A live timer and roll counter track your run, and your best time/roll count is saved to a personal-best overlay.

What I Practiced

* Array/object state management (mapping over arrays of dice objects, updating one by id without mutating the rest)
* `useState`, `useRef`, and `useEffect` together — using a ref to manage focus on the roll/new game button when the game is won, and refs to track interval IDs and timer-started state without triggering re-renders
* Writing a correct "check every item" condition — see the note below, this one taught me a lot
* `useEffect` cleanup functions and dependency arrays — the hard way (also below)
* Basic accessibility: `aria-live` region for the win announcement, focus management for keyboard users

Bugs worth mentioning

**The win-check bug.** My first pass at the win-check used a for-loop with a counter comparing each die to the next one. It looked correct and passed casual testing — but its loop bounds meant the last die's `isHeld` status was never actually checked, which could produce a false win in a rare edge case. Rewriting it with two `.every()` checks (one for `isHeld`, one for matching value) fixed it by checking every die symmetrically, with no gap.

**The doubling timer bug.** While adding the live timer, I assumed a `useEffect` cleanup function only runs on unmount. It doesn't — it runs before every re-run of the effect, whenever the dependency array changes. Without proper cleanup wired in, and with a dependency array that changed too often, my interval was doubling instead of resetting, ticking twice as fast as it should. Fixing the dependency array and returning `clearInterval` properly in the cleanup solved it. Full writeup here: (dev.to link once published).

Tech Stack

* React (Vite)
* `nanoid` for stable dice keys
* `react-confetti` + `react-use` (`useWindowSize`) for the win celebration
* `lucide-react` for icons (restart button)

What's Next

* Dice styled with actual pips instead of numbers
* Continuing to refine timer/highscore persistence

Running Locally

```
git clone https://github.com/BlackJosh007/tenzies.git
cd tenzies
npm install
npm run dev
```
