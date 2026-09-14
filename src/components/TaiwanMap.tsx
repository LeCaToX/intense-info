import { Link } from 'react-router-dom'
import { universities } from '../data/universities'

export const CITY_COORDS: Record<string, { x: number; y: number; label_vi: string }> = {
  'Taipei': { x: 78, y: 12, label_vi: 'Dai Bac' },
  'New Taipei': { x: 72, y: 18, label_vi: 'Tan Bac' },
  'Taoyuan': { x: 60, y: 26, label_vi: 'Dao Vien' },
  'Hsinchu': { x: 54, y: 36, label_vi: 'Tan Truc' },
  'Taichung': { x: 46, y: 54, label_vi: 'Dai Trung' },
  'Tainan': { x: 36, y: 78, label_vi: 'Dai Nam' },
  'Kaohsiung': { x: 44, y: 88, label_vi: 'Cao Hung' },
  'Pingtung': { x: 52, y: 97, label_vi: 'Binh Dong' },
}

function countByCity(): Record<string, { n: number; uniIds: string[] }> {
  const m: Record<string, { n: number; uniIds: string[] }> = {}
  for (const u of universities) {
    const key = Object.keys(CITY_COORDS).find((k) => u.city.includes(k)) ?? u.city
    if (!m[key]) m[key] = { n: 0, uniIds: [] }
    m[key].n += 1
    m[key].uniIds.push(u.id)
  }
  return m
}

export default function TaiwanMap() {
  const byCity = countByCity()
  const entries = Object.entries(byCity)
  return (
    <figure className="border-t border-[var(--color-line)] pt-4">
      <svg viewBox="0 0 100 112" role="img" aria-label="Luoc do Dai Loan minh hoa vung theo thanh pho" className="mx-auto w-full max-w-[280px]">
        <path d="M70,4 L86,10 L88,28 L78,44 L66,58 L58,72 L52,92 L44,102 L34,94 L30,74 L40,56 L52,40 L60,22 Z" fill="#e7e5e4" stroke="#a8a29e" strokeWidth="1" />
        {Object.entries(CITY_COORDS).map(([city, c]) => {
          const info = byCity[city]
          const r = info ? 3 + Math.min(5, info.n) : 2
          return (
            <g key={city}>
              <Link to={info ? '/universities/' + info.uniIds[0] : '/universities'}>
                <circle cx={c.x} cy={c.y} r={r} fill={info ? '#9f1239' : '#d6d3d1'} stroke="#f7f4ed" strokeWidth="1">
                  <title>{c.label_vi + (info ? ': ' + info.n + ' truong' : ': chua co du lieu')}</title>
                </circle>
              </Link>
              <text x={city === 'Taipei' ? c.x - 7 : c.x + 5} y={c.y + 2} fontSize="4.5" fill="#57534e" textAnchor={city === 'Taipei' ? 'end' : 'start'}>{c.label_vi}</text>
            </g>
          )
        })}
      </svg>
      <figcaption className="mt-2 text-xs leading-relaxed text-stone-500">Vi tri tuong doi theo thanh pho (minh hoa, khong theo ti le dia ly). Cham do theo so truong.</figcaption>
      {entries.length === 0 && <p className="mt-2 text-sm text-stone-500">Chua du du lieu de ve ban do.</p>}
    </figure>
  )
}
