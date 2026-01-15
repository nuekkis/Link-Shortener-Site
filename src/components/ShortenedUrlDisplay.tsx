import React, { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import toast from 'react-hot-toast'

interface ShortenedUrlDisplayProps {
  shortUrl: string;
}

const ShortenedUrlDisplay: React.FC<ShortenedUrlDisplayProps> = ({ shortUrl }) => {
  const qrCodeRef = useRef<HTMLDivElement>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        toast.success('Kısaltılmış URL panoya kopyalandı!')
      })
      .catch(() => {
        toast.error('Kopyalama başarısız oldu.')
      })
  }

  const handleDownloadQrCode = () => {
    if (qrCodeRef.current) {
      const svgElement = qrCodeRef.current.querySelector('svg')
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement)
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        const svgUrl = URL.createObjectURL(svgBlob)
        const downloadLink = document.createElement('a')
        downloadLink.href = svgUrl
        downloadLink.download = `qr-code-${shortUrl.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10)}.svg`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        URL.revokeObjectURL(svgUrl)
        toast.success('QR kod başarıyla indirildi!')
      } else {
        toast.error('QR kodu bulunamadı.')
      }
    }
  }

  return (
    <div className="mt-6 p-4 bg-green-800 border border-green-600 text-green-200 rounded-lg flex flex-col sm:flex-row items-center justify-between shadow-sm transition-all duration-300 ease-in-out">
      <div className="flex flex-col items-center sm:flex-row sm:items-center w-full sm:w-auto">
        <span className="break-all text-sm font-medium mb-2 sm:mb-0 sm:mr-4">
          Kısaltılmış URL:
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2 font-semibold">
            {shortUrl}
          </a>
        </span>
        <div className="mt-2 sm:mt-0">
          <div ref={qrCodeRef} className="p-2 bg-gray-700 rounded-lg shadow-md">
            <QRCodeSVG value={shortUrl} size={100} level="H" bgColor="#374151" fgColor="#E5E7EB" />
          </div>
          <button
            onClick={handleDownloadQrCode}
            className="mt-2 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          >
            QR Kodu İndir
          </button>
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="mt-4 sm:mt-0 ml-0 sm:ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
      >
        Kopyala
      </button>
    </div>
  )
}

export default ShortenedUrlDisplay
