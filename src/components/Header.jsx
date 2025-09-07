export default function Header({ balance, onReset }) {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold">Казино Рофл 🎰</h1>
      <div className="flex items-center gap-2">
        <span className="text-lg">💰 {balance} GitlerCoin</span>
        <button
          onClick={onReset}
          className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
        >
          Ребаланс
        </button>
      </div>
    </header>
  )
}