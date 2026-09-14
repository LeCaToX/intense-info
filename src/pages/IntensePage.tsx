import { useSeo } from '../lib/seo'
import { sources } from '../data/sources'
import type { Provenance, Verification } from '../lib/types'
import { collectCitations, SourceList } from '../components/Field'

function Ref({ n }: { n: number }) {
  return (
    <a
      href={`#nguon-${n}`}
      className="ml-0.5 align-super text-xs font-semibold text-[var(--color-accent)] underline-offset-2 hover:underline"
    >
      [{n}]
    </a>
  )
}

const WANTED: {
  id: string
  source_type: Provenance['source_type']
  verification: Verification
  label: string
}[] = [
  {
    id: 'moe-intense-en',
    source_type: 'MOE',
    verification: 'VERIFIED',
    label: 'Định nghĩa; lĩnh vực trọng tâm; học phí 2 năm; sinh hoạt tối thiểu; lương thực tập; nghĩa vụ việc làm; đối tượng',
  },
  {
    id: 'intact-about-vi',
    source_type: 'UNIVERSITY',
    verification: 'CROSS_CHECKED',
    label: 'Khung học bổng và yêu cầu ngôn ngữ (bản tiếng Việt)',
  },
  {
    id: 'sit-home',
    source_type: 'GOV',
    verification: 'OFFICIAL_SINGLE_SOURCE',
    label: 'Cổng NTU tồn tại (đối chiếu qua Study in Taiwan)',
  },
  {
    id: 'sit-news',
    source_type: 'GOV',
    verification: 'OFFICIAL_SINGLE_SOURCE',
    label: 'Thông báo MOE về INTENSE (10/02/2025)',
  },
  {
    id: 'portal-113f',
    source_type: 'MOE',
    verification: 'VERIFIED',
    label: 'Roster khóa đầu Fall 2024 (108 lớp)',
  },
  {
    id: 'ph-first-cohort',
    source_type: 'UNIVERSITY',
    verification: 'CROSS_CHECKED',
    label: 'Cohort đầu tốt nghiệp: 491 sinh viên, 100% việc làm tại Đài Loan',
  },
  {
    id: 'intact-vn-grad2026',
    source_type: 'UNIVERSITY',
    verification: 'CROSS_CHECKED',
    label: '79 sinh viên Việt Nam cohort 1-2026',
  },
]

function toProv(id: string): Provenance | undefined {
  const s = sources.find((x) => x.id === id)
  const w = WANTED.find((x) => x.id === id)
  if (!s || !w) return undefined
  return {
    source_url: s.url,
    source_title: s.title,
    source_type: w.source_type,
    source_date: s.pub_date,
    accessed_date: s.accessed_date,
    language: (s.language === 'vi' || s.language === 'zh-TW' ? s.language : 'en') as Provenance['language'],
    verification: w.verification,
  }
}

const cited = collectCitations(
  WANTED.map((w) => ({ label: w.label, prov: toProv(w.id) })),
)

const TOC = [
  { href: '#tong-quan', label: 'Tổng quan' },
  { href: '#lich-su', label: 'Timeline' },
  { href: '#mo-hinh', label: 'Mô hình' },
  { href: '#ho-so', label: 'Eligibility & quy trình' },
  { href: '#chu-thich', label: 'Chú thích' },
]

export default function IntensePage() {
  useSeo('INTENSE là gì', 'Định nghĩa, timeline tiền INTENSE vs chính thức, mô hình học-thực tập-việc làm.')
  return (
    <article>
      <p className="eyebrow">Chương trình</p>
      <h1 className="display mt-2 text-3xl">INTENSE là gì</h1>
      <div id="tong-quan" className="prose-narrow mt-4 max-w-[68ch] space-y-4 text-[0.95rem] leading-relaxed text-stone-700">
        <p>
          INTENSE (International Industrial Talents Education Special Program) là chương trình đặc biệt về đào tạo
          nhân tài công nghiệp quốc tế của Bộ Giáo dục Đài Loan (MOE), công bố năm 2023 và triển khai tuyển sinh từ
          năm 2024. Mô hình: học gắn với doanh nghiệp + thực tập hưởng lương + làm việc sau tốt nghiệp tại Đài Loan.
          <Ref n={1} />
        </p>
        <p>
          Cổng thông tin chính thức của chương trình đặt tại Đại học Quốc lập Đài Loan (NTU).
          <Ref n={3} />
        </p>
      </div>

      <aside aria-label="Số liệu nổi bật" className="mt-6 grid grid-cols-3 gap-px border border-[var(--color-line)] bg-[var(--color-line)]">
        {[
          ['491', 'sinh viên cohort đầu tốt nghiệp 2026'],
          ['100%', 'tỷ lệ việc làm tại Đài Loan'],
          ['79', 'sinh viên Việt Nam trong cohort đầu'],
        ].map(([n, label]) => (
          <div key={label} className="bg-[var(--color-paper)] px-3 py-4 sm:px-5">
            <p className="display tabular text-2xl text-[var(--color-accent-deep)] sm:text-4xl">{n}</p>
            <p className="mt-1 text-xs leading-snug text-stone-500 sm:text-sm">{label}</p>
          </div>
        ))}
      </aside>

      <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <nav aria-label="Mục lục trang" className="md:sticky md:top-20 md:self-start">
          <ol className="space-y-1 border-l-2 border-[var(--color-line)] pl-3 text-sm">
            {TOC.map((t) => (
              <li key={t.href}>
                <a className="block py-0.5 text-stone-600 hover:text-[var(--color-accent-deep)] hover:underline hover:underline-offset-4" href={t.href}>{t.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0">
          <section id="lich-su" className="border-t border-[var(--color-line)] pt-6 first:border-t-0 first:pt-0">
            <p className="eyebrow">Lịch sử</p>
            <h2 className="display mt-2 text-xl">Timeline: tiền INTENSE vs INTENSE chính thức</h2>
            <ul className="prose-narrow mt-3 space-y-2 text-[0.95rem] leading-relaxed text-stone-700">
              <li className="border-l-2 border-[var(--color-line)] pl-3">
                <strong className="font-semibold text-stone-900">2021–2023 (tiền INTENSE):</strong> các chương trình
                industry-academia tiền thân, không gắn nhãn INTENSE.
              </li>
              <li className="border-l-2 border-[var(--color-line)] pl-3">
                <strong className="font-semibold text-stone-900">2023:</strong> MOE công bố INTENSE; cổng chính thức đặt
                tại NTU.<Ref n={3} /><Ref n={4} />
              </li>
              <li className="border-l-2 border-[var(--color-line)] pl-3">
                <strong className="font-semibold text-stone-900">2024–2026:</strong> các chu kỳ tuyển sinh INTENSE chính
                thức (2 năm đào tạo + nghĩa vụ làm việc tương ứng số năm nhận học bổng). Khóa đầu nhập học Fall 2024.
                <Ref n={1} /><Ref n={5} />
              </li>
            </ul>
          </section>

          <section id="mo-hinh" className="mt-8 border-t border-[var(--color-line)] pt-6">
            <p className="eyebrow">Mô hình</p>
            <h2 className="display mt-2 text-xl">Mô hình học + thực tập + việc làm</h2>
            <ul className="prose-narrow mt-3 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-stone-700">
              <li>
                Chính phủ Đài Loan chi trả học phí và chi phí hành chính tới 2 năm.<Ref n={1} />
              </li>
              <li>
                Doanh nghiệp hỗ trợ sinh hoạt tối thiểu NT$10.000/tháng khi học tại trường + lương thực tập không thấp hơn
                lương cơ bản khi thực tập ngoài trường.<Ref n={1} /><Ref n={2} />
              </li>
              <li>
                Sau tốt nghiệp: nghĩa vụ làm việc tại Đài Loan tương ứng số năm nhận tài trợ (số năm là FieldValue từng
                chương trình; unknown hiển thị “Chưa công bố”). Hết nghĩa vụ có thể ở lại hoặc về nước.<Ref n={1} />
              </li>
              <li>
                Đối tượng: sinh viên quốc tế đã xong năm 2–3 đại học ở nước ngoài, tốt nghiệp cao đẳng, hoặc đã có bằng cử
                nhân.<Ref n={1} />
              </li>
              <li>
                Lĩnh vực trọng tâm: STEM, tài chính, bán dẫn.<Ref n={1} />
              </li>
              <li>
                Cohort đầu tốt nghiệp năm 2026 gồm 491 sinh viên với tỷ lệ việc làm tại Đài Loan 100%, trong đó có 79 sinh
                viên Việt Nam.<Ref n={6} /><Ref n={7} />
              </li>
            </ul>
          </section>

          <section id="ho-so" className="mt-8 border-t border-[var(--color-line)] pt-6">
            <p className="eyebrow">Hồ sơ</p>
            <h2 className="display mt-2 text-xl">Eligibility &amp; quy trình</h2>
            <ol className="prose-narrow mt-3 list-decimal space-y-2 pl-5 text-[0.95rem] leading-relaxed text-stone-700">
              <li>Kiểm tra yêu cầu từng chương trình (GPA, IELTS/TOEFL/TOEIC, TOCFL/HSK nếu có, SOP, thư giới thiệu, phỏng vấn).</li>
              <li>Chuẩn bị hồ sơ theo brochure tuyển sinh + trang khoa (2 nguồn độc lập khi có thể).</li>
              <li>Nộp qua cổng admissions của trường, theo deadline giữ nguyên văn + năm áp dụng.</li>
              <li>Thực tập ngoài trường trong quá trình học; tốt nghiệp và thực hiện nghĩa vụ việc làm.</li>
            </ol>
          </section>

          <section id="chu-thich" className="mt-8 border-t border-[var(--color-line)] pt-6">
            <p className="eyebrow">Tham khảo</p>
            <h2 className="display mt-2 text-xl">Chú thích</h2>
            <SourceList items={cited} />
          </section>
        </div>
      </div>
    </article>
  )
}
