import { useSeo } from '../lib/seo'
import { Link, useParams } from 'react-router-dom'
import { getProgramsByUniversity, getUniversity } from '../lib/data'
import { categories } from '../data/categories'
import { collectCitations, SourceList } from '../components/Field'

const DEGREE_RANK: Record<string, number> = { 'Thạc sĩ': 0, 'Tiến sĩ': 1 }

export default function UniversityDetail() {
  useSeo('Chi tiết trường', 'Tổng quan tam ngữ, chương trình, điểm nổi bật từ số liệu.')
  const { id } = useParams()
  const u = id ? getUniversity(id) : undefined
  if (!u) return (<div><h1 className="display text-2xl">Không tìm thấy trường</h1><Link className="mt-2 inline-block text-sm font-medium text-[var(--color-accent-deep)] underline underline-offset-4" to="/universities">Về danh sách trường</Link></div>)
  const progs = getProgramsByUniversity(u.id)
  const years = Object.entries(u.intense_status_by_year).filter(([, v]) => v).map(([y]) => y).join(', ')
  const fields = [...new Set(progs.flatMap((p) => p.categories))].map((c) => categories.find((x) => x.id === c)?.name_vi ?? c)
  const citations = collectCitations([
    { label: 'Trang tuyển sinh', prov: u.admissions_url?.provenance },
    { label: 'Trang INTENSE', prov: u.intense_page?.provenance },
  ])
  const degrees = [...new Set(progs.map((p) => p.degree))].sort((a, b) => (DEGREE_RANK[a] ?? 2) - (DEGREE_RANK[b] ?? 2) || a.localeCompare(b, 'vi'))
  return (
    <div>
      <p className="eyebrow">Trường tham gia</p>
      <h1 className="display mt-1 max-w-3xl text-2xl sm:text-4xl">{u.name_vi}</h1>
      <p className="mt-3 max-w-3xl text-lg text-stone-700">{u.name_en}</p>
      <p className="mt-1 max-w-3xl text-stone-500">{u.name_zh}</p>
      <dl className="tabular mt-5 grid grid-cols-2 gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-4">
        {[
          ['Vùng', u.region],
          ['Thành phố', u.city],
          ['Năm tham gia', years || 'Chưa công bố'],
          ['Số ngành', String(progs.length)],
        ].map(([k, v]) => (
          <div key={k} className="bg-[var(--color-paper)] px-4 py-3">
            <dt className="eyebrow">{k}</dt>
            <dd className="mt-1 text-sm font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-sm text-stone-600">{u.acronym} · {u.type}</p>
      {u.location_note && <p className="prose-narrow mt-1 text-sm text-stone-500">{u.location_note}</p>}
      <p className="mt-1 text-sm">Website: <a className="font-medium text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/30 underline-offset-2 hover:decoration-[var(--color-accent)]" href={u.website} target="_blank" rel="noreferrer">{u.website}</a></p>
      <section className="mt-8 border-t border-[var(--color-line)] pt-5">
        <p className="eyebrow">Hồ sơ</p>
        <h2 className="display mt-1 text-lg">Điểm nổi bật (từ số liệu)</h2>
        <p className="prose-narrow mt-2 text-stone-700">{progs.length} chương trình thuộc {fields.length} nhóm ngành{fields.length ? ': ' + fields.join(', ') : ''}.</p>
      </section>
      <section className="mt-8 border-t border-[var(--color-line)] pt-5">
        <p className="eyebrow">Tuyển sinh</p>
        <h2 className="display mt-1 text-lg">Nguồn tuyển sinh &amp; INTENSE</h2>
        <SourceList items={citations} />
      </section>
      <section className="mt-8 border-t border-[var(--color-line)] pt-5">
        <p className="eyebrow">Đào tạo</p>
        <h2 className="display mt-1 text-lg">Chương trình <span className="tabular">({progs.length})</span></h2>
        <div className="mt-4 space-y-7">
          {degrees.map((d) => {
            const list = progs.filter((p) => p.degree === d)
            return (
              <div key={d}>
                <h3 className="border-b border-[var(--color-ink)]/20 pb-1.5 text-sm font-semibold text-stone-900">
                  {d} <span className="tabular font-medium text-stone-500">({list.length})</span>
                </h3>
                <ul className="divide-y divide-[var(--color-line)]">
                  {list.map((p) => (
                    <li key={p.id} className="py-3">
                      <Link className="font-medium text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/30 underline-offset-2 hover:decoration-[var(--color-accent)]" to={'/programs/' + p.id}>{p.name_vi} — {p.degree}</Link>
                      <p className="mt-0.5 text-sm text-stone-600">{p.department} · {p.city}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
