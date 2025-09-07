import React, { useState, useEffect } from 'react'

export default function Crash({ balance, setBalance }) {
  const [bet, setBet] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [running, setRunning] = useState(false)
  const [crashed, setCrashed] = useState(false)

  useEffect(() => {
    let interval
    if (running) {
      interval = setInterval(() => {
        setMultiplier(m => {
          const next = +(m + 0.1).toFixed(1)
          if (Math.random() < 0.05 * next) {
            setRunning(false)
            setCrashed(true)
            return m
          }
          return next
        })
      }, 500)
    }
    return () => clearInterval(interval)
  }, [running])

  const start = () => {
    if (bet <= 0 || bet > balance) return alert('Неверная ставка')
    setBalance(balance - bet)
    setMultiplier(1)
    setCrashed(false)
    setRunning(true)
  }

  const cashout = () => {
    if (!running) return
    setBalance(balance + Math.floor(bet * multiplier))
    setRunning(false)
  }

  return (
    <div>
      <h2 className="text-xl mb-2">📈 Краш</h2>
      <input
        type="number"
        value={bet}
        onChange={e => setBet(Number(e.target.value))}
        className="text-black p-1"
      />
      <button onClick={start}>Старт</button>
      {running && <button onClick={cashout}>Забрать</button>}
      <p>x{multiplier}</p>
      {crashed && <p className="text-red-500">Краш!</p>}
    </div>
  )
}