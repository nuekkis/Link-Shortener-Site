# 🔗 Link Kısaltıcı

Modern, hızlı ve kullanıcı dostu bir URL kısaltma uygulaması. TinyURL ve Bit.ly API'lerini kullanarak uzun URL'leri kısa linklere dönüştürün!

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-06B6D4?style=flat-square&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)

## ✨ Özellikler

- 🚀 **Hızlı Kısaltma**: TinyURL ve Bit.ly API'leri ile anında URL kısaltma
- 🌙 **Koyu Tema**: Göz yormayan koyu tema tasarımı
- 📱 **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- 🔍 **URL Önizleme**: Kısaltmadan önce URL içeriğini görüntüleme
- 📊 **Geçmiş Takibi**: Kısaltılan linklerin geçmişini görüntüleme
- 📋 **Kolay Kopyalama**: Tek tıkla panoya kopyalama
- 📱 **QR Kod**: Kısa link için QR kod oluşturma ve indirme
- 🎨 **Modern UI**: Tailwind CSS ile şık ve profesyonel tasarım

## 🛠️ Teknolojiler

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Tailwind CSS
- **Icons**: Heroicons, QR Code React
- **API**: TinyURL API, Bit.ly API
- **Deployment**: Vercel
- **Package Manager**: npm

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın:**
   ```bash
   git clone https://github.com/nuekkis/Link-Shortener-Site.git
   cd Link-Shortener-Site
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Development server'ı başlatın:**
   ```bash
   npm run dev
   ```

4. **Tarayıcınızda açın:** `http://localhost:5173`

## 📖 Kullanım

### URL Kısaltma

1. Ana sayfada uzun URL'yi girin
2. TinyURL veya Bit.ly seçeneğini belirleyin
3. "Kısalt" butonuna tıklayın
4. Kısa URL'yi kopyalayın veya QR kod indirin

### Bit.ly API Kurulumu

Bit.ly kullanmak için:

1. [Bit.ly Developer](https://dev.bitly.com/) hesabınıza giriş yapın
2. API anahtarı alın
3. `config.json` dosyasında `BITLY_API_KEY` değerini güncelleyin:

```json
{
  "BITLY_API_KEY": "your_bitly_api_key_here"
}
```

## 🔧 Yapılandırma

### Çevre Değişkenleri

| Değişken | Açıklama | Varsayılan |
|----------|----------|------------|
| `BITLY_API_KEY` | Bit.ly API anahtarı | - |

### Geliştirme Modu

Development modunda URL önizleme özelliği mock data gösterir. Production'da gerçek API çağrısı yapılır.

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── UrlForm.tsx          # Ana URL giriş formu
│   ├── ShortenedUrlDisplay.tsx # Kısa URL gösterimi
│   ├── HistoryList.tsx      # Geçmiş listesi
│   └── ThemeToggle.tsx      # Tema değiştirme (kaldırıldı)
├── api/
│   └── preview-url.ts       # URL önizleme API (Vercel)
├── App.tsx                  # Ana uygulama komponenti
├── main.tsx                 # Uygulama giriş noktası
└── index.css               # Global stiller
```

## 🌐 API Endpoints

### URL Önizleme API

```
GET /api/preview-url?url={encoded_url}
```

**Response:**
```json
{
  "title": "Sayfa Başlığı",
  "description": "Sayfa Açıklaması",
  "image": "https://example.com/image.jpg",
  "url": "https://example.com"
}
```

## 🚀 Deployment

### Vercel'e Deploy Etme

1. [Vercel](https://vercel.com) hesabınıza giriş yapın
2. "New Project" oluşturun
3. GitHub repository'nizi bağlayın
4. Deploy edin!

### Environment Variables

Vercel dashboard'ında şu değişkenleri ayarlayın:

```
BITLY_API_KEY=your_bitly_api_key
```

## 🤝 Katkıda Bulunma

1. Fork edin 🍴
2. Feature branch oluşturun: `git checkout -b feature/amazing-feature`
3. Commit edin: `git commit -m 'Add amazing feature'`
4. Push edin: `git push origin feature/amazing-feature`
5. Pull Request açın 📝

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- [TinyURL](https://tinyurl.com/) - Ücretsiz URL kısaltma servisi
- [Bit.ly](https://bitly.com/) - Profesyonel URL kısaltma API'si
- [Vercel](https://vercel.com/) - Harika hosting platformu
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!