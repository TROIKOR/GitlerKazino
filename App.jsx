import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Roulette from './components/Roulette'
import Crash from './components/Crash'
import Minesweeper from './components/Minesweeper'
import { INITIAL_BALANCE } from './config'

export default function App() {
  const [balance, setBalance] = useState(INITIAL_BALANCE)
  const [game, setGame] = useState('roulette')

  useEffect(() => {
    const saved = localStorage.getItem('balance')
    if (saved) setBalance(Number(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('balance', balance)
  }, [balance])

  const resetBalance = () => {
    if (confirm('Вы уверены, что хотите вернуть изначальный баланс в 10 койнов?')) {
      setBalance(INITIAL_BALANCE)
    }
  }

  return (
    <div className="p-4">
      <Header balance={balance} onReset={resetBalance} />
      <div className="flex gap-2 mt-4">
        <button onClick={() => setGame('roulette')}>🎡 Рулетка</button>
        <button onClick={() => setGame('crash')}>📈 Краш</button>
        <button onClick={() => setGame('mines')}>💣 Сапёр</button>
      </div>
      <div className="mt-4">
        {game === 'roulette' && <Roulette balance={balance} setBalance={setBalance} />}
        {game === 'crash' && <Crash balance={balance} setBalance={setBalance} />}
        {game === 'mines' && <Minesweeper balance={balance} setBalance={setBalance} />}
      </div>
    </div>
  )
}