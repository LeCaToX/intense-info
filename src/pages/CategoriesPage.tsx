import { useSeo } from '../lib/seo'
import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { programs } from '../data/programs'
import { getProgramsByCategory } from '../lib/data'
export default function CategoriesPage() {
  useSeo('Nhóm ngành', 'Taxonomy 20 nhóm ngành INTENSE với số chương trình.')
  const total = programs.length
  return (<div>
  <p className="eyebrow">Phân loại</p>
  <h1 className="display mt-1 text-2xl sm:text-3xl">Nhóm ngành <span className="tabular">({categories.length})</span></h1>
  <p className="prose-narrow mt-2 text-sm text-stone-600">Thanh tỉ lệ = số chương trình của nhóm trên tổng <span className="tabular font-semibold">{total}</span> chương trình trong dataset.</p>
  <ul className="mt-4 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">{categories.map((c) => {
    const n = getProgramsByCategory(c.id).length
    const pct = total > 0 ? Math.round((n / total) * 100) : 0
    return (
      <li key={c.id} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
        <div className="min-w-0">
          <Link className="font-semibold text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/30 underline-offset-4 hover:decoration-[var(--color-accent)]" to={'/categories/' + c.id}>{c.name_vi}</Link>
          <p className="mt-0.5 text-sm text-stone-500">{c.name_en}</p>
          <div className="mt-2 h-1 w-full max-w-md bg-[var(--color-line)]/60" role="img" aria-label={c.name_vi + ': ' + n + ' trên ' + total + ' chương trình'}>
            <div className="h-1 bg-[var(--color-accent)]" style={{ width: pct + '%' }} />
          </div>
          <p className="prose-narrow mt-1.5 text-sm text-stone-600">{c.description_vi}</p>
        </div>
        <span className="tabular shrink-0 text-sm font-bold">{n} <span className="font-normal text-stone-500">chương trình · {pct}%</span></span>
      </li>
    )
  })}</ul></div>)
}
