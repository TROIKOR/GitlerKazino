import React, { useState } from 'react'

export default function Roulette({ balance, setBalance }) {
  const [bet, setBet] = useState(0)
  const [choice, setChoice] = useState(null)
  const [result, setResult] = useState(null)

  const multipliers = [2, 3, 5]

  const spin = () => {
    if (bet <= 0 || bet > balance) return alert('Неверная ставка')
    const roll = multipliers[Math.floor(Math.random() * multipliers.length)]
    setResult(roll)
    if (choice === roll) {
      setBalance(balance + bet * (roll - 1))
    } else {
      setBalance(balance - bet)
    }
  }

  return (
    <div>
      <h2 className="text-xl mb-2">🎡 Рулетка</h2>
      <input
        type="number"
        value={bet}
        onChange={e => setBet(Number(e.target.value))}
        className="text-black p-1"
      />
      <div className="flex gap-2 my-2">
        {multipliers.map(m => (
          <button key={m} onClick={() => setChoice(m)}>
            x{m}
          </button>
        ))}
      </div>
      <button onClick={spin}>Крутить</button>
      {result && <p>Выпало: x{result}</p>}
    </div>
  )
}