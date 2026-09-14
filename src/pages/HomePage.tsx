import { useSeo } from '../lib/seo'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { programs } from '../data/programs'
import { universities } from '../data/universities'
import { categories } from '../data/categories'
import { historyEvents } from '../data/history'
import { getProgramsByUniversity } from '../lib/data'
import TaiwanMap from '../components/TaiwanMap'

const PERSONAS: { id: string; label: string; desc: string; href: string }[] = [
  { id: 'cs-ai', label: 'CS/AI', desc: 'Ngành AI/CS dạy tiếng Anh.', href: '/programs?cat=ai-ml' },
  { id: 'ee-semi', label: 'EE/Bán dẫn', desc: 'Điện – điện tử – bán dẫn.', href: '/programs?cat=semiconductor' },
  { id: 'mech', label: 'Cơ khí', desc: 'Cơ khí, sản xuất thông minh.', href: '/programs?cat=mechanical' },
  { id: 'bio', label: 'Biotech', desc: 'Công nghệ sinh học, y sinh.', href: '/programs?cat=biotech' },
  { id: 'biz', label: 'Business', desc: 'Kinh doanh, fintech.', href: '/programs?cat=business-mgmt' },
  { id: 'en-only', label: 'Giỏi tiếng Anh, ít tiếng Trung', desc: 'Lọc không yêu cầu tiếng Trung.', href: '/programs?noChinese=1' },
  { id: 'scholar', label: 'Ưu tiên học bổng', desc: 'Sort trợ cấp giảm dần + miễn học phí (heuristic công khai).', href: '/programs?sort=stipend&stipend=1' },
  { id: 'job', label: 'Ưu tiên việc làm', desc: 'Xem nghĩa vụ + đối tác doanh nghiệp từng program.', href: '/programs' },
  { id: 'research', label: 'Ưu tiên nghiên cứu', desc: 'Tiến sĩ + cần research proposal (xem Program detail).', href: '/programs' },
]

const REGIONS = ['Bắc', 'Trung', 'Nam', 'Đông'] as const

export default function HomePage() {
  useSeo('Trang chủ', 'Cổng INTENSE cho học sinh Việt Nam: trường, ngành, học bổng, chỉ tiêu có nguồn rõ ràng.')
  const recent = [...historyEvents].slice(-4).reverse()
  const byRegion = useMemo(() => {
    return REGIONS.map((r) => ({ region: r, list: universities.filter((u) => u.region === r) })).filter((g) => g.list.length > 0)
  }, [])
  return (
    <div>
      <section className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:gap-12">
        <div className="min-w-0">
          <p className="eyebrow">Cổng thông tin INTENSE</p>
          <h1 className="display mt-2 max-w-[22ch] text-3xl sm:text-4xl lg:text-[2.75rem]">Cổng thông tin INTENSE cho học sinh Việt Nam</h1>
          <p className="prose-narrow mt-4 text-stone-600">
            Database thông minh <strong className="tabular font-bold text-stone-900">{programs.length}</strong> chương trình
            {' '}thuộc <strong className="tabular font-bold text-stone-900">{universities.length}</strong> trường
            {' '}và <strong className="tabular font-bold text-stone-900">{categories.length}</strong> nhóm ngành, có nguồn gốc rõ ràng:
            trường nào tham gia, ngành nào, nhóm nào, điều kiện GPA/IELTS, học phí, học bổng, chỉ tiêu, doanh nghiệp, nghĩa vụ làm việc
            {' '}(cập nhật 2026-09). Unknown hiển thị đúng chuẩn, không suy đoán.
          </p>
          <nav className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm" aria-label="Điều hướng chính">
            <Link className="bg-[var(--color-accent-deep)] px-4 py-2 font-semibold text-white no-underline hover:bg-[var(--color-accent)]" to="/programs">Khám phá ngành</Link>
            <Link className="border border-[var(--color-line)] px-4 py-2 font-medium text-stone-700 hover:border-[var(--color-accent)] hover:text-[var(--color-accent-deep)]" to="/intense">INTENSE là gì</Link>
            <Link className="px-2 py-2 font-medium text-stone-700 underline decoration-[var(--color-line)] underline-offset-4 hover:text-[var(--color-accent-deep)] hover:decoration-[var(--color-accent)]" to="/compare">So sánh</Link>
          </nav>
        </div>
        <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">
          <div className="border border-[var(--color-line)] px-4 pb-3 pt-4">
            <TaiwanMap />
          </div>
        </aside>
      </section>

      <section className="mt-12">
        <p className="eyebrow">Định hướng</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
          <h2 className="display text-xl">Phù hợp với bạn</h2>
          <p className="text-xs text-stone-500">gợi ý, không phải dự đoán trúng tuyển</p>
        </div>
        <ol className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2" aria-label="Gợi ý theo hồ sơ">
          {PERSONAS.map((p, i) => (
            <li key={p.id} className="w-56 shrink-0 snap-start border border-[var(--color-line)] p-4">
              <span className="tabular text-xs font-bold text-[var(--color-accent-deep)]" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="mt-2">
                <Link className="font-semibold text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/30 underline-offset-4 hover:decoration-[var(--color-accent)]" to={p.href}>{p.label}</Link>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <p className="eyebrow">Trường tham gia</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
          <h2 className="display text-xl">Trường theo vùng</h2>
          <Link className="text-sm font-medium text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/40 underline-offset-4 hover:decoration-[var(--color-accent)]" to="/universities">Tất cả {universities.length} trường</Link>
        </div>
        <div className="mt-4 space-y-7">
          {byRegion.map((g) => (
            <div key={g.region}>
              <h3 className="flex items-baseline gap-2 border-b border-[var(--color-ink)]/20 pb-1.5 text-sm font-bold uppercase tracking-[0.1em] text-stone-700">
                Vùng {g.region} <span className="tabular font-semibold normal-case tracking-normal text-stone-500">({g.list.length})</span>
              </h3>
              <ul className="mt-1 divide-y divide-[var(--color-line)]">
                {g.list.map((u) => (
                  <li key={u.id} className="flex items-baseline justify-between gap-4 py-2">
                    <Link className="min-w-0 truncate font-medium text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/30 underline-offset-4 hover:decoration-[var(--color-accent)]" to={'/universities/' + u.id}>
                      {u.name_vi} <span className="font-normal text-stone-500">· {u.city}</span>
                    </Link>
                    <span className="tabular shrink-0 text-sm text-stone-500">{getProgramsByUniversity(u.id).length}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 max-w-2xl">
        <p className="eyebrow">Theo dõi</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
          <h2 className="display text-xl">Cập nhật gần đây</h2>
          <Link className="text-sm font-medium text-[var(--color-accent-deep)] underline decoration-[var(--color-accent)]/40 underline-offset-4 hover:decoration-[var(--color-accent)]" to="/history">Lịch sử 2021–2026</Link>
        </div>
        {recent.length === 0
          ? <p className="mt-2 text-sm text-stone-500">Đang bổ sung bản ghi lịch sử.</p>
          : (
            <ol className="mt-3 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
              {recent.map((e, i) => (
                <li key={i} className="flex gap-4 py-2.5 text-sm">
                  <span className="tabular w-12 shrink-0 font-bold text-[var(--color-accent-deep)]">{e.year}</span>
                  <p className="prose-narrow text-stone-700"><strong className="font-semibold">{e.entity}:</strong> {e.change}</p>
                </li>
              ))}
            </ol>
          )}
      </section>
    </div>
  )
}
