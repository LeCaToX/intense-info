import { useSeo } from '../lib/seo'
import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { categories } from '../data/categories'
import { programs } from '../data/programs'
import { universities } from '../data/universities'

function useQP(key: string, fallback = '') {
  const [sp, setSp] = useSearchParams()
  const v = sp.get(key) ?? fallback
  const set = (val: string) => { const n = new URLSearchParams(sp); if (val) n.set(key, val); else n.delete(key); setSp(n, { replace: true }) }
  return [v, set] as const
}

const inputCls = 'mt-1 block w-full border border-[var(--color-line)] bg-transparent px-2 py-1.5 text-sm text-stone-900 placeholder:text-stone-400'

export default function ExplorePage() {
  useSeo('Khám phá ngành học', 'Tìm kiếm, lọc, sắp xếp chương trình INTENSE theo trường, nhóm ngành, IELTS, học phí, học bổng.')
  const [sp, setSp] = useSearchParams()
  const [q, setQ] = useQP('q')
  const [uni, setUni] = useQP('uni')
  const [cat, setCat] = useQP('cat')
  const [ieltsMax, setIeltsMax] = useQP('ieltsMax')
  const [stipendOnly, setStipendOnly] = useQP('stipend')
  const [noChinese, setNoChinese] = useQP('noChinese')
  const [sort, setSort] = useQP('sort')

  const applyPreset = (name: string) => {
    const n = new URLSearchParams()
    if (name === 'ai-en') { n.set('cat', 'ai-ml'); n.set('ieltsMax', '6.5'); n.set('stipend', '1') }
    if (name === 'semi-north') { n.set('cat', 'semiconductor') }
    if (name === 'no-chinese') { n.set('noChinese', '1') }
    setSp(n, { replace: true })
  }

  const list = useMemo(() => {
    let r = [...programs]
    const needle = (sp.get('q') ?? '').toLowerCase()
    if (needle) r = r.filter((p) => [p.name_en, p.name_vi, p.name_zh ?? '', p.department, p.university_id].join(' ').toLowerCase().includes(needle))
    const u = sp.get('uni'); if (u) r = r.filter((p) => p.university_id === u)
    const c = sp.get('cat'); if (c) {
      if (c === 'semiconductor') {
        // preset mien Bac: loc them region Bac
        const northIds = new Set(universities.filter((x) => x.region === 'Bắc').map((x) => x.id))
        r = r.filter((p) => p.categories.includes(c) && northIds.has(p.university_id))
      } else r = r.filter((p) => p.categories.includes(c))
    }
    const im = Number(sp.get('ieltsMax')); if (sp.get('ieltsMax') && !Number.isNaN(im)) r = r.filter((p) => p.ielts.value !== null && (p.ielts.value as number) <= im)
    if (sp.get('stipend') === '1') r = r.filter((p) => p.monthly_stipend_ntd.value !== null && (p.monthly_stipend_ntd.value as number) > 0)
    if (sp.get('noChinese') === '1') r = r.filter((p) => (p.chinese_req.value ?? '').toLowerCase().includes('không') || p.chinese_req.value === null)
    const s = sp.get('sort')
    if (s === 'tuition') r.sort((a, b) => (a.tuition_ntd_per_semester.value ?? 1e12) as number - ((b.tuition_ntd_per_semester.value ?? 1e12) as number))
    if (s === 'stipend') r.sort((a, b) => ((b.monthly_stipend_ntd.value ?? -1) as number) - ((a.monthly_stipend_ntd.value ?? -1) as number))
    if (s === 'ielts') r.sort((a, b) => ((a.ielts.value ?? 99) as number) - ((b.ielts.value ?? 99) as number))
    return r
  }, [sp])

  if (programs.length === 0) return (<div><h1 className="display text-2xl">Khám phá ngành học</h1><p className="prose-narrow mt-2 text-sm text-stone-500">Chưa có dữ liệu. Dataset đang được nghiên cứu (mục tiêu ≥30 chương trình).</p></div>)

  return (
    <div>
      <p className="eyebrow">Tra cứu</p>
      <h1 className="display mt-1 text-2xl sm:text-3xl">Khám phá ngành học</h1>
      <nav className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm" aria-label="Lọc nhanh">
        <button className="p-0 text-left font-medium text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/40 underline-offset-4 hover:decoration-[var(--color-accent)]" onClick={() => applyPreset('ai-en')}>Thạc sĩ + AI + tiếng Anh + IELTS ≤ 6.5 + có học bổng</button>
        <span className="text-[var(--color-line)]" aria-hidden="true">·</span>
        <button className="p-0 text-left font-medium text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/40 underline-offset-4 hover:decoration-[var(--color-accent)]" onClick={() => applyPreset('semi-north')}>Semiconductor miền Bắc</button>
        <span className="text-[var(--color-line)]" aria-hidden="true">·</span>
        <button className="p-0 text-left font-medium text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/40 underline-offset-4 hover:decoration-[var(--color-accent)]" onClick={() => applyPreset('no-chinese')}>Không yêu cầu tiếng Trung khi xét tuyển</button>
      </nav>
      <details className="mt-4 border-y border-[var(--color-line)] py-3 lg:hidden"><summary className="cursor-pointer text-sm font-semibold">Bộ lọc (chạm để mở/đóng)</summary>
        <div className="mt-3 grid gap-3">
          <label className="text-sm">Tìm kiếm<input value={q} onChange={(e) => setQ(e.target.value)} className={inputCls} placeholder="Tên EN/ZH/VI, trường, khoa" /></label>
          <label className="text-sm">Trường<select value={uni} onChange={(e) => setUni(e.target.value)} className={inputCls}><option value="">Tất cả</option>{universities.map((u) => <option key={u.id} value={u.id}>{u.acronym} — {u.name_vi}</option>)}</select></label>
          <label className="text-sm">Nhóm ngành<select value={cat} onChange={(e) => setCat(e.target.value)} className={inputCls}><option value="">Tất cả</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name_vi}</option>)}</select></label>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <label>IELTS ≤ <input value={ieltsMax} onChange={(e) => setIeltsMax(e.target.value)} className="tabular w-20 border border-[var(--color-line)] bg-transparent px-2 py-1 text-sm" placeholder="6.5" /></label>
            <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={stipendOnly === '1'} onChange={(e) => setStipendOnly(e.target.checked ? '1' : '')} className="accent-[#9f1239]" /> Có stipend</label>
            <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={noChinese === '1'} onChange={(e) => setNoChinese(e.target.checked ? '1' : '')} className="accent-[#9f1239]" /> Không tiếng Trung</label>
          </div>
        </div>
      </details>
      <div className="mt-5 grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="hidden lg:block" aria-label="Bộ lọc">
          <div className="sticky top-6 grid gap-3 border-r border-[var(--color-line)] pr-6">
            <label className="text-sm">Tìm kiếm<input value={q} onChange={(e) => setQ(e.target.value)} className={inputCls} placeholder="Tên EN/ZH/VI, trường, khoa" /></label>
            <label className="text-sm">Trường<select value={uni} onChange={(e) => setUni(e.target.value)} className={inputCls}><option value="">Tất cả</option>{universities.map((u) => <option key={u.id} value={u.id}>{u.acronym} — {u.name_vi}</option>)}</select></label>
            <label className="text-sm">Nhóm ngành<select value={cat} onChange={(e) => setCat(e.target.value)} className={inputCls}><option value="">Tất cả</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name_vi}</option>)}</select></label>
            <div className="grid gap-2 border-t border-[var(--color-line)] pt-3 text-sm">
              <label>IELTS ≤ <input value={ieltsMax} onChange={(e) => setIeltsMax(e.target.value)} className="tabular w-20 border border-[var(--color-line)] bg-transparent px-2 py-1 text-sm" placeholder="6.5" /></label>
              <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={stipendOnly === '1'} onChange={(e) => setStipendOnly(e.target.checked ? '1' : '')} className="accent-[#9f1239]" /> Có stipend</label>
              <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={noChinese === '1'} onChange={(e) => setNoChinese(e.target.checked ? '1' : '')} className="accent-[#9f1239]" /> Không tiếng Trung</label>
            </div>
          </div>
        </aside>
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-[var(--color-ink)]/20 pb-2">
            <p className="tabular text-sm text-stone-600"><strong className="text-base font-extrabold text-stone-900">{list.length}</strong> / {programs.length} chương trình</p>
            <label className="flex items-center gap-2 text-sm text-stone-600">Sắp xếp
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-[var(--color-line)] bg-transparent px-2 py-1.5 text-sm text-stone-900"><option value="">Mặc định</option><option value="tuition">Học phí tăng dần</option><option value="stipend">Trợ cấp giảm dần</option><option value="ielts">IELTS tăng dần</option></select>
            </label>
          </div>
          <ul className="divide-y divide-[var(--color-line)]">
            {list.map((p) => (
              <li key={p.id} className="grid gap-2 py-3.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6">
                <div className="min-w-0">
                  <Link className="font-semibold text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/30 underline-offset-4 hover:decoration-[var(--color-accent)]" to={'/programs/' + p.id}>{p.name_vi}</Link>
                  <p className="mt-0.5 truncate text-sm text-stone-600">{p.name_en}</p>
                  <p className="mt-0.5 text-xs text-stone-500">{p.university_id.toUpperCase()} · {p.degree} · {p.city}</p>
                </div>
                <dl className="tabular flex flex-wrap gap-x-4 gap-y-3 text-left sm:flex-nowrap sm:justify-end sm:gap-6 sm:text-right">
                  <div className="min-w-14 sm:shrink-0"><dt className="text-[11px] uppercase tracking-wide text-stone-400">IELTS</dt><dd className="mt-0.5 text-sm font-semibold whitespace-nowrap">{p.ielts.value ?? p.ielts.unknown_label ?? '—'}</dd></div>
                  <div className="min-w-14 sm:shrink-0"><dt className="text-[11px] uppercase tracking-wide text-stone-400">Học phí</dt><dd className="mt-0.5 text-sm font-semibold whitespace-nowrap">{p.tuition_ntd_per_semester.value ? 'NT$' + (p.tuition_ntd_per_semester.value as number).toLocaleString() : (p.tuition_ntd_per_semester.unknown_label ?? '—')}</dd></div>
                  <div className="min-w-14 sm:shrink-0"><dt className="text-[11px] uppercase tracking-wide text-stone-400">Trợ cấp</dt><dd className="mt-0.5 text-sm font-semibold whitespace-nowrap">{p.monthly_stipend_ntd.value ? 'NT$' + (p.monthly_stipend_ntd.value as number).toLocaleString() : (p.monthly_stipend_ntd.unknown_label ?? '—')}</dd></div>
                  <div className="min-w-14 sm:shrink-0"><dt className="text-[11px] uppercase tracking-wide text-stone-400">Chỉ tiêu</dt><dd className="mt-0.5 text-sm font-semibold whitespace-nowrap">{p.quota.value ?? p.quota.unknown_label ?? '—'}</dd></div>
                </dl>
              </li>
            ))}
          </ul>
          {list.length === 0 && <p className="mt-3 text-sm text-stone-500">Không có kết quả khớp filter.</p>}
        </div>
      </div>
    </div>
  )
}
