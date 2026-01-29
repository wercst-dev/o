'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, ExternalLink, MessageCircle, RefreshCw } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { parseListings } from '@/lib/parser'
import type { Listing } from '@/types/listing'

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const fetchListings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/listings')
      const data = await response.json()
      setListings(data.listings || [])
    } catch (error) {
      console.error('Ошибка при загрузке объявлений:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListings()
  }, [])

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === 'all' || listing.category === category
    const matchesMinPrice = !minPrice || listing.price >= parseFloat(minPrice)
    const matchesMaxPrice = !maxPrice || listing.price <= parseFloat(maxPrice)
    
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice
  })

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Заголовок */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">LZT.Market Парсер</h1>
        <p className="text-gray-400">Нашли что нужно? Напишите в Telegram для покупки</p>
      </header>

      {/* Поиск и фильтры */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск объявлений..."
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button
            onClick={fetchListings}
            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Обновить
          </button>
        </div>

        <div className="flex flex-wrap gap-4 p-4 bg-gray-900 rounded-lg">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Категория</label>
            <select 
              className="bg-black border border-gray-700 rounded px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Все категории</option>
              <option value="accounts">Аккаунты</option>
              <option value="items">Предметы</option>
              <option value="services">Услуги</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Цена от</label>
            <input
              type="number"
              className="bg-black border border-gray-700 rounded px-3 py-2 w-32"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Цена до</label>
            <input
              type="number"
              className="bg-black border border-gray-700 rounded px-3 py-2 w-32"
              placeholder="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Список объявлений */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          <p className="mt-4 text-gray-400">Загрузка объявлений...</p>
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>Объявления не найдены</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {/* Информация о покупке */}
      <div className="mt-12 p-6 bg-gray-900 rounded-xl border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="text-white" size={24} />
          <h2 className="text-xl font-bold">Как купить?</h2>
        </div>
        <p className="text-gray-300 mb-2">
          Чтобы приобрести товар, напишите в Telegram:
        </p>
        <div className="inline-block px-4 py-2 bg-white text-black rounded-lg font-mono">
          @ваш_телеграм_ник
        </div>
        <p className="mt-4 text-gray-400 text-sm">
          Укажите ID объявления и название товара в сообщении
        </p>
      </div>

      {/* Футер */}
      <footer className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>Данные парсятся с LZT.Market. Покупка осуществляется только через Telegram.</p>
        <p className="mt-2">Все права принадлежат их владельцам.</p>
      </footer>
    </main>
  )
}
