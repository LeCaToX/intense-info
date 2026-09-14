import { useSeo } from '../lib/seo'
import { useState } from 'react'
import { HISTORY_START_YEAR, HISTORY_END_YEAR, INTENSE_START_YEAR, isPreIntenseYear } from '../lib/data'
import { historyEvents } from '../data/history'
import { universities } from '../data/universities'
import { programs } from '../data/programs'
import type { HistoryKind } from '../lib/types'

const YEARS: string[] = []
for (let y = HISTORY_START_YEAR; y <= HISTORY_END_YEAR; y++) YEARS.push(String(y))

const KIND_LABEL: Record<HistoryKind, string> = {
  NEW_PROGRAM: 'Mở mới',
  CLOSED: 'Đóng',
  QUOTA: 'Chỉ tiêu',
  REQUIREMENT: 'Yêu cầu',
  SCHOLARSHIP: 'Học bổng',
  POLICY: 'Chính sách',
}

export default function HistoryPage() {
  useSeo('Lịch sử 2021-2026', 'Trường tham gia, số program, quota, thay đổi yêu cầu theo năm.')
  const [year, setYear] = useState('2025')
  const evts = historyEvents.filter((e) => e.year === year)
  const unis = universities.filter((u) => u.intense_status_by_year[year])
  const progs = programs.filter((p) => p.intense_cycle_start <= year)
  return (
    <div>
      <p className="eyebrow">Dòng thời gian</p>
      <h1 className="display mt-2 text-3xl">Lịch sử 2021–2026</h1>
      <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-stone-500">
        INTENSE chính thức từ {INTENSE_START_YEAR} (công bố 2023). Năm trước đó là tiền INTENSE — cấm gắn nhãn INTENSE.
      </p>
      <div className="mt-5 flex flex-wrap gap-x-1 border-b border-[var(--color-line)]" role="tablist" aria-label="Chọn năm">
        {YEARS.map((y) => {
          const active = year === y
          const pre = isPreIntenseYear(y)
          return (
            <button
              key={y}
              role="tab"
              aria-selected={active}
              onClick={() => setYear(y)}
              className={
                '-mb-px border-b-2 px-3 py-2 text-sm tabular ' +
                (active
                  ? 'border-[var(--color-accent)] font-semibold text-[var(--color-accent-deep)]'
                  : 'border-transparent ' + (pre ? 'text-stone-400' : 'text-stone-600 hover:text-stone-900'))
              }
            >
              {y}
              {pre && <span className="ml-1 text-xs">tiền</span>}
            </button>
          )
        })}
      </div>
      <div className="mt-6 grid gap-8 md:grid-cols-[140px_minmax(0,1fr)]">
        <div aria-hidden="true" className="hidden md:block">
          <ol className="sticky top-20 space-y-0 border-l-2 border-[var(--color-line)]">
            {YEARS.map((y) => {
              const active = year === y
              return (
                <li key={y} className="relative py-2 pl-5">
                  <span className={'absolute top-1/2 -left-[7px] block h-3 w-3 -translate-y-1/2 rounded-full border-2 ' + (active ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : isPreIntenseYear(y) ? 'border-stone-300 bg-[var(--color-paper)]' : 'border-[var(--color-accent)]/40 bg-[var(--color-paper)]')} />
                  <span className={'tabular text-sm ' + (active ? 'font-bold text-[var(--color-accent-deep)]' : 'text-stone-400')}>{y}</span>
                </li>
              )
            })}
          </ol>
        </div>
        <section className="min-w-0">
          <h2 className="display text-xl">
            Năm {year}{' '}
            <span className={'text-base font-semibold ' + (isPreIntenseYear(year) ? 'text-stone-400' : 'text-[var(--color-accent-deep)]')}>
              {isPreIntenseYear(year) ? '— tiền INTENSE (predecessor)' : '— INTENSE chính thức'}
            </span>
          </h2>
          {(unis.length === 0 && evts.length === 0) && (
            <p className="mt-3 border-t border-[var(--color-line)] pt-4 text-sm text-stone-500">
              Không đủ dữ liệu lịch sử.
            </p>
          )}
          {unis.length > 0 && (
            <p className="tabular mt-3 text-sm text-stone-600">
              {unis.length} trường tham gia · {progs.length} chương trình (tính từ dataset).
            </p>
          )}
          {evts.length > 0 && (
            <ol className="mt-4 space-y-3">
              {evts.map((e, i) => (
                <li key={i} className="border border-[var(--color-line)] px-4 py-3 text-sm leading-relaxed text-stone-700">
                  <span className="mr-2 inline-block border border-stone-300 px-1 py-px align-middle text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-500">
                    {KIND_LABEL[e.kind] ?? e.kind}
                  </span>
                  <strong className="font-semibold text-stone-900">{e.entity}</strong>: {e.change}
                </li>
              ))}
            </ol>
          )}
          {unis.length > 0 && (
            <ul className="mt-5 space-y-1 border-t border-[var(--color-line)] pt-3 text-sm text-stone-600">
              {unis.map((u) => <li key={u.id}>• {u.name_vi} ({u.acronym})</li>)}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
