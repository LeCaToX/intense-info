import { useSeo } from '../lib/seo'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Papa from 'papaparse'
import { programs } from '../data/programs'
import { getUniversity } from '../lib/data'
import { formatNTD } from '../lib/format'

const ROWS: { key: string; label: string; get: (id: string) => string }[] = [
  { key: 'uni', label: 'Trường', get: (id) => getUniversity(programs.find((p) => p.id === id)?.university_id ?? '')?.acronym ?? '—' },
  { key: 'dept', label: 'Ngành', get: (id) => programs.find((p) => p.id === id)?.name_vi ?? '—' },
  { key: 'degree', label: 'Bậc học', get: (id) => programs.find((p) => p.id === id)?.degree ?? '—' },
  { key: 'ielts', label: 'IELTS', get: (id) => { const v = programs.find((p) => p.id === id)?.ielts; return v?.value != null ? String(v.value) : (v?.unknown_label ?? '—') } },
  { key: 'gpa', label: 'GPA', get: (id) => { const v = programs.find((p) => p.id === id)?.min_gpa; return v?.value != null ? String(v.value) : (v?.unknown_label ?? '—') } },
  { key: 'tuition', label: 'Học phí', get: (id) => { const v = programs.find((p) => p.id === id)?.tuition_ntd_per_semester; return v?.value != null ? formatNTD(v.value as number) : (v?.unknown_label ?? '—') } },
  { key: 'waiver', label: 'Học bổng', get: (id) => { const v = programs.find((p) => p.id === id)?.tuition_waiver; return v?.value != null ? ((v.value as boolean) ? 'Miễn' : 'Không') : (v?.unknown_label ?? '—') } },
  { key: 'stipend', label: 'Trợ cấp/tháng', get: (id) => { const v = programs.find((p) => p.id === id)?.monthly_stipend_ntd; return v?.value != null ? formatNTD(v.value as number) : (v?.unknown_label ?? '—') } },
  { key: 'duration', label: 'Thời lượng', get: (id) => { const v = programs.find((p) => p.id === id)?.duration_years; return v?.value != null ? (v.value as number) + ' năm' : (v?.unknown_label ?? '—') } },
  { key: 'lang', label: 'Ngôn ngữ', get: (id) => { const v = programs.find((p) => p.id === id)?.language; return v?.value != null ? String(v.value) : (v?.unknown_label ?? '—') } },
  { key: 'quota', label: 'Chỉ tiêu', get: (id) => { const v = programs.find((p) => p.id === id)?.quota; return v?.value != null ? String(v.value) + ' (' + (programs.find((p) => p.id === id)?.quota_scope ?? '') + ')' : (v?.unknown_label ?? '—') } },
  { key: 'partners', label: 'Doanh nghiệp', get: (id) => programs.find((p) => p.id === id)?.partners.join(', ') || 'Chưa công bố' },
  { key: 'intern', label: 'Thực tập', get: (id) => { const v = programs.find((p) => p.id === id)?.internship_required; return v?.value != null ? ((v.value as boolean) ? 'Bắt buộc' : 'Không') : (v?.unknown_label ?? '—') } },
  { key: 'chinese', label: 'Yêu cầu tiếng Trung', get: (id) => { const v = programs.find((p) => p.id === id)?.chinese_req; return v?.value != null ? String(v.value) : (v?.unknown_label ?? '—') } },
]

const btnOutline = 'border border-[var(--color-ink)]/25 px-3 py-1.5 text-sm font-medium text-stone-800 hover:border-[var(--color-accent-deep)] hover:text-[var(--color-accent-deep)]'

function numOf(id: string, key: 'tuition' | 'stipend' | 'ielts'): number | null {
  const p = programs.find((x) => x.id === id)
  if (!p) return null
  const v = key === 'tuition' ? p.tuition_ntd_per_semester.value : key === 'stipend' ? p.monthly_stipend_ntd.value : p.ielts.value
  return typeof v === 'number' ? v : null
}

export default function ComparePage() {
  useSeo('So sánh', 'Bảng 14 hàng so sánh 2-4 chương trình, export CSV, copy link.')
  const [sp, setSp] = useSearchParams()
  const raw = (sp.get('ids') ?? '').split(',').filter(Boolean)
  const truncated = raw.length > 4
  const ids = raw.slice(0, 4)
  const [pick, setPick] = useState('')

  const setIds = (next: string[]) => { const n = new URLSearchParams(sp); if (next.length) n.set('ids', next.join(',')); else n.delete('ids'); setSp(n, { replace: true }) }

  const diff = useMemo(() => {
    const m: Record<string, boolean> = {}
    for (const r of ROWS) { const vals = ids.map((id) => r.get(id)); m[r.key] = new Set(vals).size > 1 }
    return m
  }, [sp])

  const best = useMemo(() => {
    const m: Record<string, string | null> = { tuition: null, stipend: null, ielts: null }
    if (ids.length < 2) return m
    for (const key of ['tuition', 'stipend', 'ielts'] as const) {
      let bid: string | null = null
      let bv = key === 'stipend' ? -Infinity : Infinity
      for (const id of ids) {
        const v = numOf(id, key)
        if (v == null) continue
        if (key === 'stipend' ? v > bv : v < bv) { bv = v; bid = id }
      }
      m[key] = bid
    }
    return m
  }, [sp])

  const exportCSV = () => {
    const rows = ROWS.map((r) => ({ Hang: r.label, ...Object.fromEntries(ids.map((id) => [id, r.get(id)])) }))
    const csv = Papa.unparse(rows)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'compare.csv'
    a.click()
  }
  const copyLink = async () => { await navigator.clipboard.writeText(window.location.href) }

  return (
    <div>
      <p className="eyebrow">Đối chiếu</p>
      <h1 className="display mt-1 text-2xl sm:text-3xl">So sánh chương trình (2–4)</h1>
      {truncated && <p className="mt-3 border-l-2 border-amber-700/60 bg-amber-50 px-3 py-2 text-sm text-amber-900">URL có quá 4 ids — chỉ lấy 4 đầu.</p>}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <select value={pick} onChange={(e) => setPick(e.target.value)} className="border border-[var(--color-line)] bg-transparent px-2 py-1.5 text-sm" aria-label="Chọn chương trình">
          <option value="">— Chọn chương trình —</option>
          {programs.map((p) => <option key={p.id} value={p.id}>{p.name_vi} ({p.university_id})</option>)}
        </select>
        <button className={btnOutline} onClick={() => { if (pick && !ids.includes(pick) && ids.length < 4) setIds([...ids, pick]) }}>Thêm</button>
        <button className={btnOutline} onClick={exportCSV}>Export CSV</button>
        <button className={btnOutline} onClick={copyLink}>Copy link</button>
      </div>
      {ids.length === 0 && <p className="mt-3 text-sm text-stone-500">Chưa chọn chương trình nào. Ví dụ: <code>?ids=a,b</code>.</p>}
      {ids.length > 0 && (
        <div className="table-scroll mt-4">
          <table className="tabular w-full min-w-[640px] text-sm">
            <thead><tr className="border-b border-[var(--color-ink)]/20 text-left"><th className="sticky left-0 bg-[var(--color-paper)] py-2 pr-2 font-semibold">Hàng (14)</th>{ids.map((id) => <th key={id} className="px-2 py-2 font-semibold">{id} <button className="ml-1 text-xs font-medium text-[var(--color-accent-deep)] underline underline-offset-2" onClick={() => setIds(ids.filter((x) => x !== id))}>xóa</button></th>)}</tr></thead>
            <tbody className="divide-y divide-[var(--color-line)]">
              {ROWS.map((r) => (
                <tr key={r.key}>
                  <th className="sticky left-0 bg-[var(--color-paper)] py-2 pr-2 text-left font-medium">{r.label}</th>
                  {ids.map((id) => <td key={id} className={'min-w-28 px-2 py-2 text-center align-top ' + (diff[r.key] ? 'border-l-2 border-amber-700/50 bg-amber-50/60' : '')}><span className="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1"><span>{r.get(id)}</span>{best[r.key] === id && <span className="inline-block border border-[var(--color-accent)] px-1 align-middle text-[10px] font-semibold whitespace-nowrap uppercase tracking-wide text-[var(--color-accent-deep)]">tốt nhất</span>}</span></td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 space-y-0 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)] sm:hidden">
            {ids.map((id) => (
              <div key={id} className="py-3">
                <strong className="text-sm">{id}</strong>
                {ROWS.map((r) => <p key={r.key} className="mt-0.5 text-sm"><span className="text-stone-500">{r.label}:</span> {r.get(id)}{best[r.key] === id && <span className="ml-1.5 inline-block border border-[var(--color-accent)] px-1 align-middle text-[10px] font-semibold whitespace-nowrap uppercase tracking-wide text-[var(--color-accent-deep)]">tốt nhất</span>}</p>)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
