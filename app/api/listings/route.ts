import { NextResponse } from 'next/server'
import { parseListings } from '@/lib/parser'

export async function GET() {
  try {
    // Для реального использования нужно указать конкретный URL LZT.market
    const listings = await parseListings('https://lzt.market/')
    
    // Если парсинг не работает, возвращаем тестовые данные
    const testListings = listings.length > 0 ? listings : [
      {
        id: '1',
        title: 'Пример объявления 1',
        description: 'Описание товара или услуги',
        price: 1000,
        currency: 'RUB',
        category: 'accounts',
        seller: 'Продавец 1',
        date: '2024-01-15',
        image: 'https://via.placeholder.com/300x200?text=Товар',
        url: '#'
      },
      {
        id: '2',
        title: 'Пример объявления 2',
        description: 'Другое описание товара',
        price: 2500,
        currency: 'RUB',
        category: 'items',
        seller: 'Продавец 2',
        date: '2024-01-14',
        image: 'https://via.placeholder.com/300x200?text=Товар+2',
        url: '#'
      }
    ]
    
    return NextResponse.json({ listings: testListings })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении объявлений' },
      { status: 500 }
    )
  }
}
