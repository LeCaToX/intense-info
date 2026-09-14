import { useSeo } from '../lib/seo'
import { sources } from '../data/sources'
import type { Provenance, Source, Verification } from '../lib/types'
import { collectCitations, SourceList, VerifyTag } from '../components/Field'

const TIERS: Record<number, string> = { 1: 'Tier 1 — MOE/GOV', 2: 'Tier 2 — Trường/Khoa', 3: 'Tier 3 — Doanh nghiệp', 4: 'Tier 4 — Media', 5: 'Tier 5 — Khác (chỉ tìm manh mối)' }
const VERIF: { k: Verification; d: string }[] = [
  { k: 'VERIFIED', d: 'Đã xác minh từ nguồn chính thức.' },
  { k: 'CROSS_CHECKED', d: 'Đã đối chiếu 2 nguồn độc lập.' },
  { k: 'OFFICIAL_SINGLE_SOURCE', d: 'Một nguồn chính thức duy nhất.' },
  { k: 'SECONDARY_SOURCE', d: 'Nguồn thứ cấp.' },
  { k: 'UNCONFIRMED', d: 'Chưa xác thực.' },
  { k: 'OUTDATED', d: 'Đã lỗi thời.' },
  { k: 'UNKNOWN', d: 'Không rõ.' },
]

function sourceTypeOf(s: Source): Provenance['source_type'] {
  if (/ministry|MOE/i.test(s.publisher)) return 'MOE'
  if (/FICHET|Study in Taiwan/i.test(s.publisher)) return 'GOV'
  if (s.tier === 3) return 'COMPANY'
  if (s.tier === 4) return 'MEDIA'
  if (s.tier === 5) return 'OTHER'
  return 'UNIVERSITY'
}

function verificationOf(s: Source): Verification {
  if (s.tier === 1) return 'VERIFIED'
  if (s.tier === 2) return 'OFFICIAL_SINGLE_SOURCE'
  if (s.tier === 3 || s.tier === 4) return 'SECONDARY_SOURCE'
  return 'UNCONFIRMED'
}

function toProv(s: Source): Provenance {
  return {
    source_url: s.url,
    source_title: s.title,
    source_type: sourceTypeOf(s),
    source_date: s.pub_date,
    accessed_date: s.accessed_date,
    language: (s.language === 'vi' || s.language === 'zh-TW' ? s.language : 'en') as Provenance['language'],
    verification: verificationOf(s),
  }
}

export default function SourcesPage() {
  useSeo('Nguồn & Phương pháp', 'Bảng nguồn theo tier, methodology, 7 trạng thái verification.')
  return (
    <div>
      <p className="eyebrow">Minh bạch</p>
      <h1 className="display mt-2 text-3xl">Nguồn &amp; Phương pháp</h1>

      <section className="mt-6 border-t border-[var(--color-line)] pt-6">
        <h2 className="display text-xl">Methodology</h2>
        <ul className="mt-3 divide-y divide-[var(--color-line)] text-sm leading-relaxed text-stone-700">
          <li className="py-2">Định nghĩa 5 năm: 2021–2023 tiền INTENSE + 2024–2026 INTENSE chính thức; cấm gắn nhãn tiền INTENSE thành INTENSE.</li>
          <li className="py-2">Xác minh: học phí/stipend/GPA/ngôn ngữ/quota/deadline/thời lượng/nghĩa vụ cần 2 nguồn độc lập khi có thể (brochure + trang khoa).</li>
          <li className="py-2">Tier 5 chỉ tìm manh mối, không bao giờ là nguồn duy nhất cho yêu cầu tuyển sinh.</li>
          <li className="py-2">Xung đột: giữ cả hai provenance.notes, hiển thị bản mới nhất + thẩm quyền cao nhất (Tier 1 {'>'} 2 {'>'} 3 {'>'} 4 {'>'} 5).</li>
          <li className="py-2">Unknown đúng 1 trong 4 chuỗi: “Chưa công bố”, “Không tìm thấy thông tin chính thức”, “Không áp dụng”, “Thông tin chưa xác thực”.</li>
        </ul>
      </section>

      <section className="mt-8 border-t border-[var(--color-line)] pt-6">
        <h2 className="display text-xl">7 trạng thái Verification</h2>
        <ul className="mt-3 divide-y divide-[var(--color-line)]">
          {VERIF.map((v) => (
            <li key={v.k} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2 text-sm">
              <VerifyTag value={v.k} />
              <span className="text-stone-600">{v.d}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 border-t border-[var(--color-line)] pt-6">
        <h2 className="display text-xl">Bảng nguồn ({sources.length})</h2>
        {sources.length === 0 ? (
          <p className="mt-2 text-sm text-stone-500">Đang bổ sung nguồn Tier 1/2.</p>
        ) : (
          [1, 2, 3, 4, 5].map((tier) => {
            const group = sources.filter((s) => s.tier === tier)
            if (group.length === 0) return null
            const items = collectCitations(group.map((s) => ({ label: s.applies_to, prov: toProv(s) })))
            return (
              <section key={tier} id={`tier-${tier}`} className="mt-6 scroll-mt-24">
                <h3 className="eyebrow">{TIERS[tier]} <span className="tabular">({group.length})</span></h3>
                <SourceList items={items} idPrefix={`tier-${tier}-nguon`} />
              </section>
            )
          })
        )}
      </section>
    </div>
  )
}
