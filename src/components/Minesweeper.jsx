import React, { useState } from 'react'

export default function Minesweeper({ balance, setBalance }) {
  const [bet, setBet] = useState(0)
  const [grid, setGrid] = useState([])
  const [revealed, setRevealed] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [started, setStarted] = useState(false)

  const size = 10
  const mines = 5

  const start = () => {
    if (bet <= 0 || bet > balance) return alert('Неверная ставка')
    setBalance(balance - bet)
    const mineSet = new Set()
    while (mineSet.size < mines) {
      mineSet.add(Math.floor(Math.random() * size * size))
    }
    setGrid([...mineSet])
    setRevealed([])
    setGameOver(false)
    setStarted(true)
  }

  const clickCell = idx => {
    if (gameOver || !started) return
    if (grid.includes(idx)) {
      setGameOver(true)
      alert('Бомба! 😵')
    } else {
      setRevealed(r => [...r, idx])
    }
  }

  const cashout = () => {
    const win = Math.floor(bet * (1 + revealed.length * 0.2))
    setBalance(balance + win)
    setStarted(false)
    alert(`Забрал ${win} GitlerCoin`)
  }

  return (
    <div>
      <h2 className="text-xl mb-2">💣 Сапёр</h2>
      <input
        type="number"
        value={bet}
        onChange={e => setBet(Number(e.target.value))}
        className="text-black p-1"
      />
      <button onClick={start}>Старт</button>
      {started && <button onClick={cashout}>Забрать</button>}
      <div
        className="grid gap-1 mt-2"
        style={{ gridTemplateColumns: `repeat(${size}, 20px)` }}
      >
        {Array(size * size)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              onClick={() => clickCell(idx)}
              className={`w-5 h-5 border cursor-pointer ${
                revealed.includes(idx) ? 'bg-green-500' : 'bg-gray-700'
              }`}
            ></div>
          ))}
      </div>
      {gameOver && <p className="text-red-500">Вы проиграли!</p>}
    </div>
  )
}