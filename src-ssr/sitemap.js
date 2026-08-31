import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

export default async function sitemap(req, res) {
  const hostname = 'https://masterrizal.com'

  const staticLinks = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/#armada', changefreq: 'daily', priority: 0.9 },
    { url: '/#testimoni', changefreq: 'weekly', priority: 0.8 },
    { url: '/#lokasi', changefreq: 'weekly', priority: 0.8 },
    { url: '/#kontak', changefreq: 'weekly', priority: 0.8 }
  ]

  const stream = new SitemapStream({ hostname })
  res.setHeader('Content-Type', 'application/xml')
  const xml = await streamToPromise(Readable.from(staticLinks).pipe(stream))
  res.end(xml.toString())
}
