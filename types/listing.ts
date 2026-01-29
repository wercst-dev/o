export interface Listing {
  id: string
  title: string
  description: string
  price: number
  currency: string
  category: string
  seller: string
  date: string
  image?: string
  url: string
  views?: number
  likes?: number
}
