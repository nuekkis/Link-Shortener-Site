import React, { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'

interface UrlPreviewData {
  title?: string
  description?: string
  image?: string
  url?: string
}

interface UrlFormProps {
  longUrl: string;
  setLongUrl: React.Dispatch<React.SetStateAction<string>>;
  shortener: 'tinyurl' | 'bitly';
  setShortener: React.Dispatch<React.SetStateAction<'tinyurl' | 'bitly'>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShortUrl: React.Dispatch<React.SetStateAction<string>>;
  setHistory: React.Dispatch<React.SetStateAction<Array<{ long: string, short: string, date: number }>>>;
  urlError: string;
  setUrlError: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
}

const UrlForm: React.FC<UrlFormProps> = ({ longUrl, setLongUrl, shortener, setShortener, loading, setLoading, setShortUrl, setHistory, urlError, setUrlError, theme }) => {

  const [previewData, setPreviewData] = useState<UrlPreviewData | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewError, setPreviewError] = useState('')

  const validateUrl = (url: string) => {
    if (!url) {
      return 'Lütfen bir URL girin.'
    }
    try {
      new URL(url)
    } catch (e) {
      return 'Lütfen geçerli bir URL girin.'
    }
    return ''
  }

  const fetchUrlPreview = useCallback(async (url: string) => {
    if (!url || urlError) {
      setPreviewData(null)
      setPreviewError('')
      return
    }

    setPreviewLoading(true)
    setPreviewError('')
    setPreviewData(null)

    try {
      const response = await fetch(`/api/preview-url?url=${encodeURIComponent(url)}`)
      if (!response.ok) {
        throw new Error('URL önizlemesi alınamadı.')
      }
      const data = await response.json()
      setPreviewData(data)
    } catch (err: any) {
      console.error('URL önizlemesi hatası:', err)
      setPreviewError(`URL önizlemesi alınırken bir hata oluştu: ${err.message || err.toString()}`)
      toast.error(`URL önizlemesi alınırken bir hata oluştu: ${err.message || err.toString()}`)
    } finally {
      setPreviewLoading(false)
    }
  }, [urlError])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (longUrl && !urlError) {
        fetchUrlPreview(longUrl)
      } else {
        setPreviewData(null)
        setPreviewError('')
      }
    }, 500) // 500ms gecikme

    return () => {
      clearTimeout(handler)
    }
  }, [longUrl, urlError, fetchUrlPreview])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShortUrl('')

    const validationMessage = validateUrl(longUrl)
    if (validationMessage) {
      setUrlError(validationMessage)
      toast.error(validationMessage)
      return
    }

    setLoading(true)
    try {
      let generatedShortUrl = ''
      if (shortener === 'tinyurl') {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`)
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`TinyURL API Hatası: ${errorText || response.statusText}`)
        }
        const data = await response.text()
        generatedShortUrl = data
        toast.success('URL TinyURL ile başarıyla kısaltıldı!')
      } else if (shortener === 'bitly') {
        const config = await import('../../config.json')
        const BITLY_API_KEY = config.BITLY_API_KEY

        if (BITLY_API_KEY === 'YOUR_BITLY_API_KEY' || !BITLY_API_KEY) {
          toast.error('Bit.ly API anahtarı config.json dosyasında ayarlanmamış. Lütfen güncelleyin.')
          return
        }

        const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${BITLY_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ long_url: longUrl }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(`Bit.ly API Hatası: ${errorData.message || response.statusText}`)
        }

        const data = await response.json()
        generatedShortUrl = data.link
        toast.success('URL Bit.ly ile başarıyla kısaltıldı!')
      }
      setShortUrl(generatedShortUrl)
      setHistory(prevHistory => [{ long: longUrl, short: generatedShortUrl, date: Date.now() }, ...prevHistory])
    } catch (err: any) {
      console.error(err)
      toast.error(`Link kısaltılırken bir hata oluştu: ${err.message || err.toString()}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="longUrl" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Uzun URL</label>
        <input
          type="url"
          id="longUrl"
          className={`mt-1 block w-full px-4 py-2 border ${urlError ? 'border-red-500 ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500'} rounded-lg shadow-sm text-gray-800 dark:text-gray-200 dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 sm:text-sm transition-all duration-200 ease-in-out`}
          placeholder="https://example.com/cok-uzun-linkim"
          value={longUrl}
          onChange={(e) => {
            setLongUrl(e.target.value)
            setUrlError(validateUrl(e.target.value))
          }}
          disabled={loading}
          aria-invalid={!!urlError}
          aria-describedby="url-error-message"
        />
        {urlError && <p id="url-error-message" className="mt-2 text-red-600 text-xs font-medium" role="alert">{urlError}</p>}
      </div>

      {/* URL Önizleme Bölümü */}
      {previewLoading && (
        <div className="mt-4 flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
          <svg className="animate-spin h-5 w-5 mr-3 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-700 dark:text-gray-300">URL önizlemesi yükleniyor...</p>
        </div>
      )}

      {previewError && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-800 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg shadow-sm">
          <p className="text-sm font-medium">{previewError}</p>
        </div>
      )}

      {previewData && !previewLoading && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">URL Önizlemesi</h3>
          {previewData.image && (
            <img src={previewData.image} alt="URL Önizlemesi" className="w-full h-32 object-cover rounded-md mb-2" />
          )}
          <p className="text-gray-800 dark:text-gray-100 font-medium">{previewData.title || 'Başlık Yok'}</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{previewData.description || 'Açıklama Yok'}</p>
          <a href={previewData.url || longUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-2 block">{previewData.url || longUrl}</a>
        </div>
      )}

      <div className="flex items-center space-x-6 mt-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-indigo-600 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 transition duration-150 ease-in-out dark:bg-gray-700"
            name="shortener"
            value="tinyurl"
            checked={shortener === 'tinyurl'}
            onChange={() => setShortener('tinyurl')}
            disabled={loading}
          />
          <span className="ml-2 text-gray-800 dark:text-gray-200 font-medium">TinyURL</span>
        </label>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-indigo-600 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 transition duration-150 ease-in-out dark:bg-gray-700"
            name="shortener"
            value="bitly"
            checked={shortener === 'bitly'}
            onChange={() => setShortener('bitly')}
            disabled={loading}
          />
          <span className="ml-2 text-gray-800 dark:text-gray-200 font-medium">Bit.ly</span>
        </label>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-200 ease-in-out"
        disabled={loading || !!urlError}
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {loading ? 'Kısaltılıyor...' : 'Kısalt'}
      </button>
    </form>
  )
}

export default UrlForm
