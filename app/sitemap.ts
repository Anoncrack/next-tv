import { MetadataRoute } from 'next'
import newsData from '@/app/data/news.json'
import roomsData from '@/app/data/rooms.json'
import activitiesData from '@/app/data/activities.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thundervoyage.com'

  const staticRoutes = [
    '',
    '/book',
    '/guide',
    '/membership',
    '/login',
    '/account',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }))

  const newsRoutes = newsData.map((item) => ({
    url: `${baseUrl}${item.link}`, 
    lastModified: new Date(item.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const roomRoutes = roomsData.map((room) => ({
    url: `${baseUrl}/rooms/${room.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const activityRoutes = activitiesData.map((act) => ({
    url: `${baseUrl}/activities/${act.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...newsRoutes, ...roomRoutes, ...activityRoutes]
}