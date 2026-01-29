import { ExternalLink, MessageCircle, Tag, User, Calendar } from 'lucide-react'
import type { Listing } from '@/types/listing'

interface ListingCardProps {
  listing: Listing
}

export default function ListingCard({ listing }: ListingCardProps) {
  const handleBuyClick = () => {
    const message = `Здравствуйте! Хочу купить товар:\n\nID: ${listing.id}\nНазвание: ${listing.title}\nЦена: ${listing.price} руб.\n\nСвяжитесь со мной для покупки.`
    const telegramUrl = `https://t.me/ваш_телеграм_ник?text=${encodeURIComponent(message)}`
    window.open(telegramUrl, '_blank')
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-500 transition-all duration-300">
      {listing.image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={listing.image} 
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold line-clamp-2">{listing.title}</h3>
          <span className="text-2xl font-bold whitespace-nowrap ml-2">{listing.price} ₽</span>
        </div>
        
        <p className="text-gray-300 mb-4 line-clamp-3">{listing.description}</p>
        
        <div className="space-y-2 mb-6">
          {listing.category && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Tag size={16} />
              <span>{listing.category}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <User size={16} />
            <span>{listing.seller}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar size={16} />
            <span>{listing.date}</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleBuyClick}
            className="flex-1 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Купить через Telegram
          </button>
          
          <a
            href={listing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 border border-gray-600 rounded-lg hover:border-white transition flex items-center justify-center"
            title="Открыть оригинал"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}
