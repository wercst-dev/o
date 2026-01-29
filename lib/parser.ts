import axios from 'axios'
import * as cheerio from 'cheerio'

export async function parseListings(url: string = 'https://lzt.market/') {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const $ = cheerio.load(data)
    const listings: any[] = []
    
    // Парсинг объявлений (нужно адаптировать под конкретную структуру LZT.market)
    $('.market-index-item').each((index, element) => {
      const title = $(element).find('.market-index-item-title').text().trim()
      const priceText = $(element).find('.market-index-item-price').text().trim()
      const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0
      
      listings.push({
        id: `lzt-${Date.now()}-${index}`,
        title,
        description: $(element).find('.market-index-item-desc').text().trim(),
        price,
        currency: 'RUB',
        category: $(element).find('.market-index-item-category').text().trim(),
        seller: $(element).find('.market-index-item-seller').text().trim(),
        date: $(element).find('.market-index-item-date').text().trim(),
        image: $(element).find('img').attr('src'),
        url: $(element).find('a').attr('href') || '#'
      })
    })
    
    return listings
  } catch (error) {
    console.error('Ошибка парсинга:', error)
    return []
  }
}
