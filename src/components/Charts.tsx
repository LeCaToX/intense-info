import type { ReactNode } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { programs } from '../data/programs'
import { universities } from '../data/universities'
import { categories } from '../data/categories'

const ACCENT = '#9f1239'
const ACCENT_DEEP = '#881337'
const STONE_DARK = '#44403c'
const STONE = '#78716c'
const STONE_LINE = '#e4dccb'
const HEAT: [number, string, string][] = [
  [0, '#f5f5f4', '#57534e'],
  [1, '#e7e5e4', '#44403c'],
  [3, '#d6d3d1', '#1c1917'],
  [6, '#fecdd3', '#881337'],
  [10, '#9f1239', '#ffffff'],
]

function heatStyle(n: number): { background: string; color: string } {
  if (!n) return { background: '#fafaf9', color: '#a8a29e' }
  let bg = HEAT[0][1]
  let fg = HEAT[0][2]
  for (const [min, b, f] of HEAT) {
    if (n >= min) {
      bg = b
      fg = f
    }
  }
  return { background: bg, color: fg }
}
function Block({ title, children, featured }: { title: string; children: ReactNode; featured?: boolean }) {
  return (
    <section className={featured ? 'border border-[var(--color-line)] p-4 sm:p-6' : 'mb-6 break-inside-avoid border border-[var(--color-line)] p-4'}>
      <h2 className="text-sm font-semibold text-stone-900">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  )
}

const axisTick = { fontSize: 11, fill: STONE }

export default function Charts() {
  const byField = categories.map((c) => ({ name: c.id, n: programs.filter((p) => p.categories.includes(c.id)).length })).filter((d) => d.n > 0)
  const ielts = programs.filter((p) => p.ielts.value != null).map((p) => ({ ielts: p.ielts.value as number }))
  const stipend = programs.filter((p) => p.monthly_stipend_ntd.value != null).slice(0, 12).map((p) => ({ name: p.id.slice(0, 10), vnd: p.monthly_stipend_ntd.value as number }))
  const duration = [1, 2, 3, 4].map((y) => ({ y: y + ' năm', n: programs.filter((p) => p.duration_years.value === y).length }))
  const part = ['2024', '2025', '2026'].map((y) => ({ year: y, unis: universities.filter((u) => u.intense_status_by_year[y]).length, progs: programs.filter((p) => p.intense_cycle_start <= y).length }))
  return (
    <div className="mt-4">
      <Block title="1. participation-over-time (line)" featured>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={part}>
            <CartesianGrid strokeDasharray="3 3" stroke={STONE_LINE} />
            <XAxis dataKey="year" tick={axisTick} />
            <YAxis tick={axisTick} />
            <Tooltip />
            <Line type="monotone" dataKey="unis" name="Số trường" stroke={ACCENT} strokeWidth={2} dot={{ fill: ACCENT }} />
            <Line type="monotone" dataKey="progs" name="Số program" stroke={STONE_DARK} strokeWidth={2} dot={{ fill: STONE_DARK }} />
          </LineChart>
        </ResponsiveContainer>
      </Block>
      <div className="mt-6 columns-1 gap-6 md:columns-2">
      <Block title="2. programs-by-field (bar)">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={byField}>
            <CartesianGrid strokeDasharray="3 3" stroke={STONE_LINE} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: STONE }} interval={0} angle={-20} dy={10} height={60} />
            <YAxis tick={axisTick} />
            <Tooltip />
            <Bar dataKey="n" name="Số program" fill={ACCENT} />
          </BarChart>
        </ResponsiveContainer>
      </Block>
      <Block title="3. tuition strip (mỗi chấm = 1 program, NTD/kỳ)">
        <p className="text-xs leading-relaxed text-stone-500">
          {programs.filter((p) => p.tuition_ntd_per_semester.value != null).map((p) => 'NT$' + (p.tuition_ntd_per_semester.value as number).toLocaleString()).join(' · ') || 'Chưa đủ dữ liệu'}
        </p>
      </Block>
      <Block title="4. stipend comparison (bar, NTD/tháng)">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={stipend}>
            <CartesianGrid strokeDasharray="3 3" stroke={STONE_LINE} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: STONE }} />
            <YAxis tick={axisTick} />
            <Tooltip />
            <Bar dataKey="vnd" name="Trợ cấp" fill={ACCENT_DEEP} />
          </BarChart>
        </ResponsiveContainer>
      </Block>
      <Block title="5. IELTS distribution (histogram thô)">
        <p className="text-xs leading-relaxed text-stone-500">{ielts.map((d) => d.ielts).join(', ') || 'Chưa đủ dữ liệu'}</p>
      </Block>
      <Block title="6. duration (bar)">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={duration}>
            <CartesianGrid strokeDasharray="3 3" stroke={STONE_LINE} />
            <XAxis dataKey="y" tick={axisTick} />
            <YAxis tick={axisTick} />
            <Tooltip />
            <Bar dataKey="n" fill={STONE_DARK}>
              {duration.map((_, i) => <Cell key={i} fill={i === 1 ? ACCENT : STONE_DARK} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Block>
      <Block title="7. quota by year (bar)">
        <p className="text-xs leading-relaxed text-stone-500">Quota là per-program và hay unknown — chart chỉ tính ô đã biết kèm scope.</p>
      </Block>
      <Block title="8. heatmap university×category (bảng màu)">
        <div className="table-scroll">
          <table className="mt-2 min-w-[600px] border-collapse text-xs tabular">
            <thead>
              <tr><th className="border border-[var(--color-line)] p-1 text-left font-semibold text-stone-600">Trường</th>{categories.slice(0, 8).map((c) => <th key={c.id} className="border border-[var(--color-line)] p-1 font-semibold text-stone-600">{c.id}</th>)}</tr>
            </thead>
            <tbody>
              {universities.slice(0, 12).map((u) => (
                <tr key={u.id}>
                  <td className="border border-[var(--color-line)] p-1 font-medium text-stone-700">{u.acronym}</td>
                  {categories.slice(0, 8).map((c) => {
                    const n = programs.filter((p) => p.university_id === u.id && p.categories.includes(c.id)).length
                    const s = heatStyle(n)
                    return <td key={c.id} className="border border-[var(--color-line)] p-1 text-center" style={s}>{n || ''}</td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>
      </div>
    </div>
  )
}
