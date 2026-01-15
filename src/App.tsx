import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import ThemeToggle from './components/ThemeToggle'
import UrlForm from './components/UrlForm'
import ShortenedUrlDisplay from './components/ShortenedUrlDisplay'
import HistoryList from './components/HistoryList'

function App() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [urlError, setUrlError] = useState('')
  const [shortener, setShortener] = useState<'tinyurl' | 'bitly'>('tinyurl')
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (localStorage.theme) {
      return localStorage.theme
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })
  const [history, setHistory] = useState<Array<{ long: string, short: string, date: number }>>(() => {
    const savedHistory = localStorage.getItem('urlHistory')
    return savedHistory ? JSON.parse(savedHistory) : []
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(theme === 'dark' ? 'light' : 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('urlHistory', JSON.stringify(history))
  }, [history])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className={`${theme} min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-4 sm:p-6 lg:p-8`}>
      <Toaster position="bottom-center" />
      <main className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md transition-all duration-300 ease-in-out transform hover:scale-105">
        <div className="flex justify-end mb-4">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">Link Kısaltıcı</h1>
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
          theme={theme}
        />

        {shortUrl && (
          <ShortenedUrlDisplay
            shortUrl={shortUrl}
            theme={theme}
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
