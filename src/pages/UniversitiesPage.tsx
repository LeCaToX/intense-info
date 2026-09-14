import { useSeo } from '../lib/seo'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { universities } from '../data/universities'
import { getProgramsByUniversity } from '../lib/data'

const YEARS = ['2024', '2025', '2026']
const REGIONS = ['Bắc', 'Trung', 'Nam', 'Đông'] as const

export default function UniversitiesPage() {
  useSeo('Các trường tham gia', 'Danh sách trường INTENSE theo thành phố, vùng, số chương trình.')
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return universities
    return universities.filter((u) => [u.name_en, u.name_zh, u.name_vi, u.city, u.acronym].join(' ').toLowerCase().includes(needle))
  }, [q])
  const groups = useMemo(() => {
    return REGIONS.map((r) => ({ region: r, list: list.filter((u) => u.region === r) })).filter((g) => g.list.length > 0)
  }, [list])
  if (universities.length === 0) return (<div><h1 className="display text-2xl">Các trường tham gia</h1><p className="prose-narrow mt-2 text-sm text-stone-500">Chưa có dữ liệu. Dataset đang được nghiên cứu.</p></div>)
  return (
    <div>
      <p className="eyebrow">Trường tham gia</p>
      <h1 className="display mt-1 text-2xl sm:text-3xl">Các trường tham gia <span className="tabular">({list.length})</span></h1>
      <div className="mt-4 flex max-w-2xl flex-wrap items-end gap-x-6 gap-y-2">
        <label className="min-w-0 flex-1 basis-64 text-sm">Tìm theo tên / thành phố
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="vd: Taipei, NTUST…" className="mt-1 block w-full border border-[var(--color-line)] bg-transparent px-3 py-2 text-sm placeholder:text-stone-400" />
        </label>
        <p className="flex items-center gap-1.5 pb-2 text-xs text-stone-500" aria-label="Chú thích chấm tham gia">
          Tham gia
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
          <span className="tabular">2024–2026</span>
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-line)]" aria-hidden="true" />
          <span>vắng mặt / chưa rõ</span>
        </p>
      </div>
      <div className="mt-5 space-y-8">
        {groups.map((g) => (
          <section key={g.region} aria-label={'Vùng ' + g.region}>
            <h2 className="flex items-baseline gap-2 border-b border-[var(--color-ink)]/20 pb-1.5 text-sm font-bold uppercase tracking-[0.1em] text-stone-700">
              Vùng {g.region} <span className="tabular font-semibold normal-case tracking-normal text-stone-500">({g.list.length})</span>
            </h2>
            <ul className="divide-y divide-[var(--color-line)]">
              {g.list.map((u) => {
                const n = getProgramsByUniversity(u.id).length
                return (
                  <li key={u.id} className="flex items-center justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <Link to={'/universities/' + u.id} className="font-semibold text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/30 underline-offset-4 hover:decoration-[var(--color-accent)]">{u.name_vi}</Link>
                      <p className="mt-0.5 truncate text-sm text-stone-600">{u.name_en}</p>
                      <p className="text-sm text-stone-600">{u.name_zh}</p>
                      <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-stone-600">
                        <span>{u.city}</span>
                        <span className="flex items-center gap-1" role="img" aria-label={'Tham gia INTENSE: ' + YEARS.filter((y) => u.intense_status_by_year[y]).join(', ')}>
                          {YEARS.map((y) => (
                            <span
                              key={y}
                              title={y + ': ' + (u.intense_status_by_year[y] ? 'tham gia' : 'vắng mặt / chưa rõ')}
                              className={'inline-block h-2 w-2 rounded-full ' + (u.intense_status_by_year[y] ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-line)]')}
                            />
                          ))}
                        </span>
                        <span className="tabular text-xs text-stone-400">2024–2026</span>
                      </p>
                    </div>
                    <span className="tabular shrink-0 text-right text-sm font-bold">{n} <span className="block font-normal text-stone-500 sm:inline">chương trình</span></span>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
      {list.length === 0 && <p className="mt-3 text-sm text-stone-500">Không có trường nào khớp tìm kiếm.</p>}
    </div>
  )
}
