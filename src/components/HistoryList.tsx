import React from 'react'
import toast from 'react-hot-toast'

interface HistoryListProps {
  history: Array<{ long: string, short: string, date: number }>;
  setHistory: React.Dispatch<React.SetStateAction<Array<{ long: string, short: string, date: number }>>>;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, setHistory }) => {
  const clearHistory = () => {
    setHistory([])
    toast.success('Geçmiş temizlendi!')
  }

  return (
    <div className="mt-8 p-6 bg-gray-700 rounded-xl shadow-inner">
      <h2 className="text-xl font-bold mb-4 text-white text-center">Kısaltma Geçmişi</h2>
      <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {history.map((item, index) => (
          <li key={index} className="bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-600 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
            <div className="flex-1 mb-2 sm:mb-0">
              <p className="text-gray-400">Uzun: <a href={item.long} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">{item.long}</a></p>
              <p className="text-gray-100 font-medium">Kısa: <a href={item.short} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline break-all">{item.short}</a></p>
            </div>
            <span className="text-gray-400 text-xs mt-2 sm:mt-0">{new Date(item.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={clearHistory}
        className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 ease-in-out"
      >
        Geçmişi Temizle
      </button>
    </div>
  )
}

export default HistoryList
