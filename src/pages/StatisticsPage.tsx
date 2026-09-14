import { useSeo } from '../lib/seo'
import { Suspense, lazy } from 'react'
import { programs } from '../data/programs'
void 0

const Charts = lazy(() => import('../components/Charts'))

function Empty({ label }: { label: string }) {
  return <div className="border-t border-[var(--color-line)] py-4 text-sm text-stone-500">Chưa đủ dữ liệu — {label}. (Nguồn: dataset, năm 2026)</div>
}

export default function StatisticsPage() {
  useSeo('Thống kê', '8 chart từ dataset: tham gia, nhóm ngành, học phí, trợ cấp, IELTS, thời lượng, quota, heatmap.')
  const aiCount = programs.filter((p) => p.categories.includes('ai-ml')).length
  const aiPct = programs.length ? Math.round((aiCount / programs.length) * 100) : 0
  return (
    <div>
      <p className="eyebrow">Số liệu</p>
      <h1 className="display mt-2 text-3xl">Thống kê</h1>
      <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-stone-500">Mọi insight tính trực tiếp từ dataset, ghi công thức/mẫu số. Tách Fact vs Nhận định.</p>
      <div className="mt-4 border-l-2 border-[var(--color-accent)] pl-4 text-sm leading-relaxed">
        <p><strong className="font-semibold text-stone-900">Fact:</strong> <span className="text-stone-700">AI chiếm <span className="tabular font-semibold text-[var(--color-accent-deep)]">{aiPct}%</span> ({aiCount}/{programs.length}). Công thức: số program có category ai-ml / tổng số program.</span></p>
        <p className="mt-1"><strong className="font-semibold text-stone-900">Nhận định:</strong> <span className="text-stone-700">tỷ lệ cao phản ánh trọng tâm STEM của INTENSE, không phải dự báo trúng tuyển.</span></p>
      </div>
      {programs.length === 0 ? (
        <div className="mt-4">
          <Empty label="participation-over-time" /><Empty label="programs-by-field" />
          <Empty label="tuition strip" /><Empty label="stipend comparison" />
          <Empty label="IELTS distribution" /><Empty label="duration" />
          <Empty label="quota by year" /><Empty label="heatmap university×category" />
        </div>
      ) : (
        <Suspense fallback={<p className="mt-4 text-sm text-stone-500">Đang tải charts…</p>}>
          <Charts />
        </Suspense>
      )}
      <div className="mt-4 space-y-1 border-t border-[var(--color-line)] pt-4 text-xs leading-relaxed text-stone-500">
        <p>Đơn vị: NTD; năm: 2026; nguồn: dataset có provenance từng ô (xem Program detail + Sources).</p>
        <p>Heatmap university×category là bảng màu (không dùng chart lib).</p>
      </div>
    </div>
  )
}
