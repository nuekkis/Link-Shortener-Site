import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

interface UrlPreviewData {
  title?: string
  description?: string
  image?: string
  url?: string
}

export default async function (request: VercelRequest, response: VercelResponse) {
  const { url } = request.query

  if (!url || typeof url !== 'string') {
    return response.status(400).json({ error: 'URL parametresi eksik veya geçersiz.' })
  }

  try {
    const targetUrl = new URL(url).toString()
    const res = await fetch(targetUrl, { follow: 5 })
    const html = await res.text()
    const $ = cheerio.load(html)

    const previewData: UrlPreviewData = {
      url: targetUrl
    }

    // Open Graph meta etiketlerini dene
    previewData.title = $('meta[property="og:title"]').attr('content') || $('title').text()
    previewData.description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content')
    previewData.image = $('meta[property="og:image"]').attr('content')

    // Eğer Open Graph etiketi yoksa ve başlık/açıklama hala boşsa, standart etiketlere bak
    if (!previewData.title) {
      previewData.title = $('title').text()
    }
    if (!previewData.description) {
      previewData.description = $('meta[name="description"]').attr('content')
    }

    response.status(200).json(previewData)
  } catch (error: any) {
    console.error('URL önizlemesi alınırken hata:', error)
    response.status(500).json({ error: `URL önizlemesi alınırken bir hata oluştu: ${error.message || error.toString()}` })
  }
}
