import { Link, NavLink, useNavigate } from 'react-router-dom'
import { programs } from '../data/programs'
import { useState } from 'react'

const NAV: { to: string; label: string }[] = [
  { to: '/', label: 'Trang chủ' },
  { to: '/programs', label: 'Ngành học' },
  { to: '/universities', label: 'Trường' },
  { to: '/categories', label: 'Nhóm ngành' },
  { to: '/compare', label: 'So sánh' },
  { to: '/intense', label: 'INTENSE là gì' },
  { to: '/history', label: 'Lịch sử' },
  { to: '/statistics', label: 'Thống kê' },
  { to: '/sources', label: 'Nguồn' },
  { to: '/faq', label: 'Hỏi đáp' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-3 focus:py-2 focus:bg-white focus:text-sm"
      >
        Bỏ qua tới nội dung chính
      </a>
      <div className="h-1 bg-[var(--color-accent)]" aria-hidden="true" />
      <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-paper)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-3 px-4 py-4">
          <Link to="/" className="leading-none">
            <span className="display block text-[1.35rem]">INTENSE</span>
            <span className="mt-1 block text-[0.72rem] font-medium tracking-[0.14em] text-stone-500 uppercase">
              Cổng thông tin · Đài Loan
            </span>
          </Link>
          <form
            className="ml-auto flex items-center gap-2"
            role="search"
            aria-label="Tìm kiếm toàn cục"
            onSubmit={(e) => {
              e.preventDefault()
              navigate('/programs?q=' + encodeURIComponent(q))
            }}
          >
            <label htmlFor="global-search" className="sr-only">
              Tìm kiếm chương trình, trường
            </label>
            <input
              id="global-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm trường, ngành…"
              className="w-40 rounded-none border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[var(--color-accent)] sm:w-60"
            />
            <button
              type="submit"
              className="bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-deep)] active:translate-y-px"
            >
              Tìm
            </button>
          </form>
        </div>
        <nav aria-label="Điều hướng chính" className="border-t border-[var(--color-line)]">
          <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 text-sm whitespace-nowrap">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    'block border-b-2 px-3 py-2.5 transition-colors ' +
                    (isActive
                      ? 'border-[var(--color-accent)] font-semibold text-[var(--color-accent-deep)]'
                      : 'border-transparent text-stone-600 hover:border-stone-300 hover:text-stone-900')
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {children}
      </main>
      <footer className="mt-10 border-t border-[var(--color-line)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-3">
          <div>
            <p className="eyebrow">Về cổng này</p>
            <p className="mt-2 leading-relaxed text-stone-600">
              Cổng thông tin INTENSE cho học sinh Việt Nam — dữ liệu có nguồn gốc rõ ràng, ô chưa rõ không suy đoán.
            </p>
          </div>
          <div>
            <p className="eyebrow">Phương pháp</p>
            <p className="mt-2 leading-relaxed text-stone-600">
              Tên riêng giữ 3 dòng song song EN → ZH-TW → VI, không dịch tên
              riêng. Tiền tệ quy đổi theo một hằng số duy nhất, ghi năm tỷ giá
              cạnh con số.{' '}
              <Link className="font-medium text-[var(--color-accent-deep)] underline" to="/sources">
                Xem nguồn &amp; phương pháp
              </Link>
            </p>
          </div>
          <div>
            <p className="eyebrow">Đi nhanh</p>
            <ul className="mt-2 space-y-1.5 text-stone-600">
              <li><Link className="hover:text-stone-900 hover:underline" to="/programs">Khám phá {programs.length} ngành học</Link></li>
              <li><Link className="hover:text-stone-900 hover:underline" to="/compare">So sánh chương trình</Link></li>
              <li><Link className="hover:text-stone-900 hover:underline" to="/faq">Hỏi đáp</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--color-line)]">
          <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-stone-500">
            Cập nhật 09/2026 · Dữ liệu đọc từ bảng công bố chính thức MOE/trường, xem trang Nguồn.
          </p>
        </div>
      </footer>
    </div>
  )
}
