import { useMemo, useState } from 'react'
import { useSeo } from '../lib/seo'
import { faqs } from '../data/faqs'
import { Link } from 'react-router-dom'

const FALLBACK: { q: string; a: string }[] = [
  { q: 'INTENSE là gì?', a: 'International Industrial Talents Education Special Program của Bộ Giáo dục Đài Loan, công bố 2023, tuyển sinh từ 2024, mô hình học gắn doanh nghiệp + làm việc sau tốt nghiệp.' },
  { q: 'Ai đủ điều kiện?', a: 'Sinh viên quốc tế xong năm 2–3 đại học, tốt nghiệp cao đẳng, hoặc đã có bằng cử nhân (thạc sĩ/tiến sĩ tùy chương trình).' },
  { q: 'Học bổng gồm gì?', a: 'Chính phủ chi trả học phí tới 2 năm + doanh nghiệp hỗ trợ sinh hoạt ≥NT$10.000/tháng và lương thực tập ≥ lương cơ bản.' },
]

export default function FaqPage() {
  useSeo('Hỏi đáp', '19 câu hỏi INTENSE với link sâu tới program, trường, nguồn.')
  const list = faqs.length ? faqs : FALLBACK.map((f, i) => ({ id: 'fallback-' + i, question: f.q, answer: f.a, links: [] as { label: string; to: string }[] }))
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter((f) => (f.question + ' ' + f.answer).toLowerCase().includes(q))
  }, [query, list])
  return (
    <div>
      <p className="eyebrow">Giải đáp</p>
      <h1 className="display mt-2 text-3xl">Hỏi đáp ({list.length})</h1>
      <div className="mt-4 max-w-md">
        <label htmlFor="faq-search" className="text-sm font-medium text-stone-700">Tìm câu hỏi</label>
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập từ khóa, ví dụ: học bổng, IELTS, chỉ tiêu…"
          className="mt-1 w-full border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400"
        />
      </div>
      <div className="mt-6 grid gap-8 md:grid-cols-[220px_1fr]">
        <nav aria-label="Danh sách câu hỏi" className="md:sticky md:top-4 md:self-start">
          <ol className="space-y-1 border-l-2 border-[var(--color-line)] pl-3 text-sm">
            {filtered.length === 0 && <li className="text-stone-500">Không tìm thấy câu hỏi phù hợp.</li>}
            {filtered.map((f, i) => (
              <li key={f.id}>
                <a href={`#${f.id}`} className="block py-0.5 leading-snug text-stone-600 hover:text-[var(--color-accent-deep)] hover:underline hover:underline-offset-2">
                  <span className="tabular mr-1.5 text-xs font-semibold text-[var(--color-accent)]">{i + 1}.</span>
                  {f.question}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div>
          {filtered.length === 0 ? (
            <p className="border-t border-[var(--color-line)] pt-4 text-sm text-stone-500">
              Không tìm thấy câu hỏi phù hợp với “{query}”. Thử từ khóa khác.
            </p>
          ) : (
            <ol className="divide-y divide-[var(--color-line)]">
              {filtered.map((f, i) => (
                <li key={f.id} id={f.id} className="scroll-mt-24 py-5 first:pt-0">
                  <h2 className="display text-base">
                    <span className="tabular mr-2 text-sm font-bold text-[var(--color-accent)]">{i + 1}.</span>
                    {f.question}
                  </h2>
                  <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-stone-700">{f.answer}</p>
                  {(f.links ?? []).length > 0 && (
                    <p className="mt-2 space-x-4 text-sm">
                      {(f.links ?? []).map((l) => (
                        <Link key={l.to + l.label} className="text-[var(--color-accent)] underline underline-offset-2 hover:text-[var(--color-accent-deep)]" to={l.to}>{l.label}</Link>
                      ))}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  )
}
