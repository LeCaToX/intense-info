import type { FieldValue, Provenance, Verification } from '../lib/types'

const SCOPE_LABEL: Record<string, string> = {
  INTENSE: 'INTENSE',
  UNIVERSITY_GENERAL: 'Chung trường',
  DEPARTMENT: 'Khoa',
  SCHOLARSHIP: 'Học bổng',
  GRADUATION: 'Tốt nghiệp',
  INTERNSHIP: 'Thực tập',
  EMPLOYMENT: 'Việc làm',
}

export const VERIFICATION_LABEL: Record<Verification, string> = {
  VERIFIED: 'Đã xác minh',
  CROSS_CHECKED: 'Đối chiếu 2 nguồn',
  OFFICIAL_SINGLE_SOURCE: 'Một nguồn chính thức',
  SECONDARY_SOURCE: 'Nguồn thứ cấp',
  UNCONFIRMED: 'Chưa xác thực',
  OUTDATED: 'Đã cũ',
  UNKNOWN: 'Không rõ',
}

export function ScopeTag({ scope }: { scope: string }) {
  return (
    <span className="ml-2 inline-block border border-stone-300 px-1 py-px align-middle text-[10px] font-semibold tracking-[0.08em] text-stone-500 uppercase">
      {SCOPE_LABEL[scope] ?? scope}
    </span>
  )
}

export function VerifyTag({ value }: { value: Verification }) {
  const strong = value === 'VERIFIED' || value === 'CROSS_CHECKED'
  const weak = value === 'UNCONFIRMED' || value === 'UNKNOWN' || value === 'OUTDATED'
  return (
    <span
      className={
        'inline-block border px-1 py-px align-middle text-[10px] font-semibold tracking-[0.08em] uppercase ' +
        (strong
          ? 'border-green-800/40 bg-green-50 text-green-900'
          : weak
            ? 'border-amber-700/40 bg-amber-50 text-amber-900'
            : 'border-stone-300 bg-stone-100 text-stone-600')
      }
    >
      {VERIFICATION_LABEL[value]}
    </span>
  )
}

export function FieldCell<T>({ field, format }: { field: FieldValue<T> | undefined; format?: (v: T) => string }) {
  if (!field) return <span className="text-stone-400">Không tìm thấy thông tin chính thức</span>
  if (field.value !== null && field.value !== undefined) {
    const text = format ? format(field.value as T) : String(field.value)
    return (
      <span>
        {text}
        <ScopeTag scope={field.scope} />
      </span>
    )
  }
  return (
    <span className="border border-dashed border-amber-700/50 bg-amber-50 px-1.5 py-0.5 text-[0.83rem] text-amber-900">
      {field.unknown_label ?? 'Chưa công bố'}
      <ScopeTag scope={field.scope} />
    </span>
  )
}

export interface CitedSource {
  prov: Provenance
  fields: string[]
}

/** Gom provenance theo URL: một nguồn xuất hiện đúng một lần, kèm danh sách ô dùng nó. */
export function collectCitations(pairs: { label: string; prov?: Provenance }[]): CitedSource[] {
  const out: CitedSource[] = []
  for (const { label, prov } of pairs) {
    if (!prov) continue
    const hit = out.find((c) => c.prov.source_url === prov.source_url)
    if (hit) {
      if (!hit.fields.includes(label)) hit.fields.push(label)
    } else {
      out.push({ prov, fields: [label] })
    }
  }
  return out
}

export function SourceList({ items, idPrefix = 'nguon' }: { items: CitedSource[]; idPrefix?: string }) {
  if (items.length === 0) {
    return <p className="mt-2 text-sm text-stone-500">Thông tin chưa xác thực — đang bổ sung nguồn Tier 1/2.</p>
  }
  return (
    <ol className="mt-3 space-y-3">
      {items.map((c, i) => (
        <li key={c.prov.source_url} id={`${idPrefix}-${i + 1}`} className="border-l-2 border-[var(--color-line)] pl-3 text-sm scroll-mt-24">
          <p className="leading-relaxed">
            <span className="stat-num mr-1.5 font-bold text-[var(--color-accent-deep)]">[{i + 1}]</span>
            <a
              className="font-medium text-stone-900 underline decoration-stone-300 underline-offset-2 hover:decoration-[var(--color-accent)]"
              href={c.prov.source_url}
              target="_blank"
              rel="noreferrer"
            >
              {c.prov.source_title}
            </a>
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500">
            <span>{c.prov.source_type}</span>
            <span aria-hidden="true">·</span>
            <span>Truy cập {c.prov.accessed_date}</span>
            <span aria-hidden="true">·</span>
            <VerifyTag value={c.prov.verification} />
          </p>
          <p className="mt-1 text-xs text-stone-500">Dùng cho: {c.fields.join('; ')}</p>
          {c.prov.notes && <p className="mt-1 text-xs leading-relaxed text-stone-600">{c.prov.notes}</p>}
        </li>
      ))}
    </ol>
  )
}
