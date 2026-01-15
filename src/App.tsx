import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import UrlForm from './components/UrlForm'
import ShortenedUrlDisplay from './components/ShortenedUrlDisplay'
import HistoryList from './components/HistoryList'

function App() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [urlError, setUrlError] = useState('')
  const [shortener, setShortener] = useState<'tinyurl' | 'bitly'>('tinyurl')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<Array<{ long: string, short: string, date: number }>>(() => {
    const savedHistory = localStorage.getItem('urlHistory')
    return savedHistory ? JSON.parse(savedHistory) : []
  })

  useEffect(() => {
    // Koyu tema olarak sabitle
    const root = window.document.documentElement
    root.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('urlHistory', JSON.stringify(history))
  }, [history])

  return (
    <div className="dark min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Toaster position="bottom-center" />
      <main className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md transition-all duration-300 ease-in-out transform hover:scale-105">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-white">Link Kısaltıcı</h1>
        <UrlForm
          longUrl={longUrl}
          setLongUrl={setLongUrl}
          shortener={shortener}
          setShortener={setShortener}
          loading={loading}
          setLoading={setLoading}
          setShortUrl={setShortUrl}
          setHistory={setHistory}
          urlError={urlError}
          setUrlError={setUrlError}
        />

        {shortUrl && (
          <ShortenedUrlDisplay
            shortUrl={shortUrl}
          />
        )}

        {history.length > 0 && (
          <HistoryList
            history={history}
            setHistory={setHistory}
          />
        )}
      </main>
    </div>
  )
}

export default App
