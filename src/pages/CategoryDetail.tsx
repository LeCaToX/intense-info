import { useSeo } from '../lib/seo'
import { Link, useParams } from 'react-router-dom'
import { getCategory, getProgramsByCategory } from '../lib/data'
import { universities } from '../data/universities'
export default function CategoryDetail() {
  useSeo('Chi tiết nhóm ngành', 'Chương trình, phân bố trường, xu hướng từ dataset.')
  const { id } = useParams()
  const c = id ? getCategory(id) : undefined
  if (!c) return (<div><h1 className="display text-2xl">Không tìm thấy nhóm ngành</h1><Link className="mt-2 inline-block text-sm font-medium text-[var(--color-accent-deep)] underline underline-offset-4" to="/categories">Về danh sách nhóm ngành</Link></div>)
  const progs = getProgramsByCategory(c.id)
  const byUni = new Map<string, number>()
  for (const p of progs) byUni.set(p.university_id, (byUni.get(p.university_id) ?? 0) + 1)
  const dist = [...byUni.entries()]
    .map(([uid, n]) => ({ u: universities.find((x) => x.id === uid), n }))
    .sort((a, b) => b.n - a.n)
  const max = dist.length > 0 ? dist[0].n : 0
  const uniCount = byUni.size
  return (<div>
  <p className="eyebrow">Nhóm ngành</p>
  <h1 className="display mt-1 max-w-[24ch] text-2xl sm:text-3xl">{c.name_vi}</h1>
  <p className="mt-1 text-stone-600">{c.name_en}</p>
  <p className="tabular mt-3 inline-block border-y border-[var(--color-line)] py-2 text-sm text-stone-600">
    <strong className="text-base font-extrabold text-stone-900">{progs.length}</strong> chương trình · <strong className="text-base font-extrabold text-stone-900">{uniCount}</strong> trường
    <span className="font-normal"> · xu hướng tính trực tiếp từ dataset (không suy diễn ngoài).</span>
  </p>
  <section className="mt-8 max-w-2xl" aria-label="Phân bố theo trường">
    <h2 className="border-b border-[var(--color-ink)]/20 pb-1.5 text-sm font-bold uppercase tracking-[0.1em] text-stone-700">Phân bố theo trường ({uniCount})</h2>
    <ul className="divide-y divide-[var(--color-line)]">
      {dist.map(({ u, n }) => (
        <li key={u?.id ?? '?'} className="flex items-center gap-3 py-2">
          <Link className="tabular w-16 shrink-0 text-sm font-bold text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/30 underline-offset-4 hover:decoration-[var(--color-accent)]" to={'/universities/' + (u?.id ?? '')}>{u?.acronym ?? '?'}</Link>
          <div className="h-1 min-w-0 flex-1 bg-[var(--color-line)]/60" role="img" aria-label={(u?.name_vi ?? '?') + ': ' + n + ' chương trình'}>
            <div className="h-1 bg-[var(--color-accent)]" style={{ width: (max > 0 ? Math.round((n / max) * 100) : 0) + '%' }} />
          </div>
          <span className="tabular w-6 shrink-0 text-right text-sm font-semibold">{n}</span>
        </li>
      ))}
    </ul>
  </section>
  <section className="mt-8" aria-label="Danh sách chương trình">
    <h2 className="border-b border-[var(--color-ink)]/20 pb-1.5 text-sm font-bold uppercase tracking-[0.1em] text-stone-700">Chương trình ({progs.length})</h2>
    <ul className="divide-y divide-[var(--color-line)]">
      {progs.map((p) => {
        const u = universities.find((x) => x.id === p.university_id)
        return (
          <li key={p.id} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
            <div className="min-w-0">
              <Link className="font-semibold text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/30 underline-offset-4 hover:decoration-[var(--color-accent)]" to={'/programs/' + p.id}>{p.name_vi}</Link>
              <p className="mt-0.5 truncate text-sm text-stone-600">{p.name_en}</p>
              <p className="mt-0.5 text-xs text-stone-500">{u?.acronym} · {p.degree} · {p.city} · {p.department}</p>
            </div>
            <dl className="tabular flex flex-wrap gap-x-5 gap-y-2 text-left sm:shrink-0 sm:flex-nowrap sm:justify-end sm:gap-6 sm:text-right">
              <div className="sm:shrink-0"><dt className="text-[11px] uppercase tracking-wide text-stone-400">IELTS</dt><dd className="mt-0.5 text-sm font-semibold whitespace-nowrap">{p.ielts.value ?? p.ielts.unknown_label ?? '—'}</dd></div>
              <div className="sm:shrink-0"><dt className="text-[11px] uppercase tracking-wide text-stone-400">Trợ cấp</dt><dd className="mt-0.5 text-sm font-semibold whitespace-nowrap">{p.monthly_stipend_ntd.value ? 'NT$' + (p.monthly_stipend_ntd.value as number).toLocaleString() : (p.monthly_stipend_ntd.unknown_label ?? '—')}</dd></div>
              <div className="sm:shrink-0"><dt className="text-[11px] uppercase tracking-wide text-stone-400">Chỉ tiêu</dt><dd className="mt-0.5 text-sm font-semibold whitespace-nowrap">{p.quota.value ?? p.quota.unknown_label ?? '—'}</dd></div>
            </dl>
          </li>
        )
      })}
    </ul>
  </section></div>)
}
