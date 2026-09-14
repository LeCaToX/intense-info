// Build tĩnh sitemap.xml: 13 route + mọi university/program id từ data.
// Chạy trong `npm run build` trước vite build. Không phụ thuộc TS.
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'

function idsFrom(file, exportName) {
  try {
    const text = readFileSync(file, 'utf8')
    const ids = [...text.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
    // Lọc bỏ id không phải kebab slug (verification ids v.v.) bằng heuristic độ dài file?
    // Giữ đơn giản: chỉ lấy khi file là universities/programs/categories.
    return ids
  } catch { return [] }
}

const routes = ['/', '/programs', '/universities', '/categories', '/compare', '/intense', '/history', '/statistics', '/sources', '/faq']
const uniIds = idsFrom('src/data/universities.ts')
const progIds = idsFrom('src/data/programs.ts')
const catIds = idsFrom('src/data/categories.ts')
const urls = [...routes]
for (const id of uniIds) urls.push('/universities/' + id)
for (const id of progIds) urls.push('/programs/' + id)
for (const id of catIds) urls.push('/categories/' + id)
const today = new Date().toISOString().slice(0, 10)
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map((u) => '  <url><loc>' + u + '</loc><lastmod>' + today + '</lastmod></url>').join('\n') + '\n</urlset>\n'
mkdirSync('public', { recursive: true })
mkdirSync('dist', { recursive: true })
writeFileSync('public/sitemap.xml', xml)
// dist có thể chưa có khi chạy trước vite build; vite sẽ copy public -> dist.
if (existsSync('dist')) writeFileSync('dist/sitemap.xml', xml)
console.log('sitemap: ' + urls.length + ' urls')
