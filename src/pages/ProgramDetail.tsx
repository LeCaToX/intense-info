import { useSeo } from '../lib/seo'
import { Link, useParams } from 'react-router-dom'
import { getCategory, getProgram, getUniversity } from '../lib/data'
import { formatMoneyPair, NTD_TO_VND, NTD_TO_VND_YEAR } from '../lib/format'
import { FieldCell, SourceList, collectCitations } from '../components/Field'

export default function ProgramDetail() {
  useSeo('Chi tiết chương trình', 'Điều kiện GPA/IELTS, học phí, học bổng, chỉ tiêu, doanh nghiệp, nghĩa vụ việc làm kèm nguồn.')
  const { id } = useParams()
  const p = id ? getProgram(id) : undefined
  if (!p) {
    return (
      <div>
        <h1 className="display text-3xl">Không tìm thấy chương trình</h1>
        <p className="mt-3"><Link className="font-medium text-[var(--color-accent-deep)] underline" to="/programs">Về danh sách ngành</Link></p>
      </div>
    )
  }
  const u = getUniversity(p.university_id)
  const cites = collectCitations([
    { label: 'GPA', prov: p.min_gpa.provenance },
    { label: 'IELTS', prov: p.ielts.provenance },
    { label: 'TOEFL iBT', prov: p.toefl_ibt.provenance },
    { label: 'TOEIC', prov: p.toeic.provenance },
    { label: 'Tiếng Trung', prov: p.chinese_req.provenance },
    { label: 'Deadline', prov: p.deadlines.provenance },
    { label: 'Học phí', prov: p.tuition_ntd_per_semester.provenance },
    { label: 'Trợ cấp', prov: p.monthly_stipend_ntd.provenance },
    { label: 'Thời gian trợ cấp', prov: p.stipend_duration_months.provenance },
    { label: 'Miễn học phí', prov: p.tuition_waiver.provenance },
    { label: 'Chỉ tiêu', prov: p.quota.provenance },
    { label: 'Thực tập', prov: p.internship_required.provenance },
    { label: 'Nghĩa vụ việc làm', prov: p.postgrad_obligation_years.provenance },
    { label: 'Thời lượng', prov: p.duration_years.provenance },
  ])
  return (
    <article>
      <p className="text-sm text-stone-500">
        <Link className="hover:underline" to="/programs">Ngành học</Link>
        <span aria-hidden="true"> / </span>
        <span>{p.id}</span>
      </p>
      <h1 className="display mt-2 max-w-3xl text-3xl sm:text-4xl">{p.name_vi}</h1>
      <p className="mt-2 text-stone-600">{p.name_en}{p.name_zh ? ` · ${p.name_zh}` : ''}</p>
      {u && (
        <p className="mt-2 text-sm text-stone-600">
          <Link className="font-medium text-[var(--color-accent-deep)] underline" to={'/universities/' + u.id}>{u.name_vi}</Link>
          {` · ${p.department}`}{p.college ? ` · ${p.college}` : ''}{` · ${p.city}`}{p.campus ? ` · ${p.campus}` : ''}
        </p>
      )}

      <dl className="mt-6 grid grid-cols-2 gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-4">
        {[
          ['Bậc học', p.degree],
          ['Thành phố', p.city],
          ['Nhóm ngành', p.categories.map((c) => getCategory(c)?.name_vi ?? c).join(', ')],
          ['Chu kỳ INTENSE', `từ ${p.intense_cycle_start}`],
        ].map(([k, v]) => (
          <div key={k} className="bg-[var(--color-paper)] px-4 py-3">
            <dt className="eyebrow">{k}</dt>
            <dd className="mt-1 text-sm font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_290px]">
        <aside aria-label="Con số chính" className="order-first lg:order-2 lg:sticky lg:top-20 lg:self-start">
          <div className="border border-[var(--color-line)]">
            <p className="eyebrow border-b border-[var(--color-line)] px-4 py-2.5">Con số chính</p>
            <div className="px-4 py-4">
              <p className="eyebrow">Chỉ tiêu</p>
              {p.quota.value != null ? (
                <>
                  <p className="display tabular mt-1 text-5xl text-[var(--color-accent-deep)]">{p.quota.value}</p>
                  <p className="mt-1 text-xs text-stone-500">phạm vi: {p.quota_scope}</p>
                </>
              ) : (
                <p className="mt-1 text-sm"><FieldCell field={p.quota} format={(v) => String(v)} /></p>
              )}
            </div>
            <dl className="divide-y divide-[var(--color-line)] border-t border-[var(--color-line)] text-sm">
              {[
                ['Trợ cấp / tháng', <FieldCell key="s" field={p.monthly_stipend_ntd} format={(v) => formatMoneyPair(v)} />],
                ['Học phí / kỳ', <FieldCell key="t" field={p.tuition_ntd_per_semester} format={(v) => formatMoneyPair(v)} />],
                ['IELTS', <FieldCell key="i" field={p.ielts} format={(v) => String(v)} />],
                ['Deadline', <FieldCell key="d" field={p.deadlines} />],
              ].map(([k, v]) => (
                <div key={k as string} className="px-4 py-2.5">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="tabular mt-0.5 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        <div className="order-last min-w-0 lg:order-1">
          <aside className="border-l-2 border-[var(--color-accent)] pl-4 text-sm leading-relaxed text-stone-600">
            <strong className="font-semibold text-stone-800">Phù hợp với sinh viên muốn…</strong> (nhãn
            phân tích, không phải phát ngôn chính thức): theo học {p.degree} khối{' '}
            {p.categories.map((c) => getCategory(c)?.name_vi ?? c).join(', ')}, giảng dạy bằng{' '}
            <FieldCell field={p.language} />.
          </aside>

          <section className="mt-8">
            <h2 className="eyebrow">Tuyển sinh</h2>
            <dl className="mt-3 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)] text-sm">
              {[
                ['GPA tối thiểu', <FieldCell key="g" field={p.min_gpa} format={(v) => String(v)} />, p.gpa_scale.value ? `(thang ${p.gpa_scale.value})` : ''],
                ['IELTS', <FieldCell key="i" field={p.ielts} format={(v) => String(v)} />, ''],
                ['TOEFL iBT', <FieldCell key="t" field={p.toefl_ibt} format={(v) => String(v)} />, ''],
                ['TOEIC', <FieldCell key="e" field={p.toeic} format={(v) => String(v)} />, ''],
                ['Tiếng Trung khi xét tuyển', <FieldCell key="c" field={p.chinese_req} />, ''],
                ['Deadline', <FieldCell key="d" field={p.deadlines} />, ''],
              ].map(([k, v, extra]) => (
                <div key={k as string} className="grid gap-1 py-2.5 sm:grid-cols-[220px_1fr]">
                  <dt className="text-stone-500">{k}</dt>
                  <dd>{v} {extra}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-stone-600">
              Hồ sơ: SOP {p.docs.sop ? 'có' : 'không yêu cầu rõ'},{' '}
              {p.docs.recommendation_letters === 0 ? 'không yêu cầu thư giới thiệu' : `${p.docs.recommendation_letters} thư giới thiệu`},{' '}
              {p.docs.research_proposal ? 'cần' : 'không cần'} research proposal,{' '}
              {p.docs.interview ? 'có' : 'không rõ'} phỏng vấn{p.docs.portfolio ? ', cần portfolio' : ''}.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="eyebrow">Tài chính · NTD gốc, tỷ giá {NTD_TO_VND}/NT$ năm {NTD_TO_VND_YEAR}</h2>
            <dl className="mt-3 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)] text-sm">
              {[
                ['Học phí / kỳ', <FieldCell key="t" field={p.tuition_ntd_per_semester} format={(v) => formatMoneyPair(v)} />],
                ['Trợ cấp / tháng', <FieldCell key="s" field={p.monthly_stipend_ntd} format={(v) => formatMoneyPair(v)} />],
                ['Thời gian trợ cấp', <FieldCell key="d" field={p.stipend_duration_months} format={(v) => v + ' tháng'} />],
                ['Miễn học phí', <FieldCell key="w" field={p.tuition_waiver} format={(v) => (v ? 'Có' : 'Không')} />],
              ].map(([k, v]) => (
                <div key={k as string} className="grid gap-1 py-2.5 sm:grid-cols-[220px_1fr]">
                  <dt className="text-stone-500">{k}</dt>
                  <dd className="tabular">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-8">
            <h2 className="eyebrow">Chương trình INTENSE</h2>
            <dl className="mt-3 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)] text-sm">
              <div className="grid gap-1 py-2.5 sm:grid-cols-[220px_1fr]">
                <dt className="text-stone-500">Chỉ tiêu</dt>
                <dd><FieldCell field={p.quota} format={(v) => String(v)} /> <span className="text-xs text-stone-500">(phạm vi: {p.quota_scope})</span></dd>
              </div>
              <div className="grid gap-1 py-2.5 sm:grid-cols-[220px_1fr]">
                <dt className="text-stone-500">Doanh nghiệp</dt>
                <dd>{p.partners.length ? p.partners.join(', ') : 'Chưa công bố'}</dd>
              </div>
              <div className="grid gap-1 py-2.5 sm:grid-cols-[220px_1fr]">
                <dt className="text-stone-500">Thực tập bắt buộc</dt>
                <dd><FieldCell field={p.internship_required} format={(v) => (v ? 'Có' : 'Không')} /></dd>
              </div>
              <div className="grid gap-1 py-2.5 sm:grid-cols-[220px_1fr]">
                <dt className="text-stone-500">Nghĩa vụ việc làm</dt>
                <dd><FieldCell field={p.postgrad_obligation_years} format={(v) => v + ' năm'} /></dd>
              </div>
              <div className="grid gap-1 py-2.5 sm:grid-cols-[220px_1fr]">
                <dt className="text-stone-500">Thời lượng</dt>
                <dd><FieldCell field={p.duration_years} format={(v) => v + ' năm'} /></dd>
              </div>
            </dl>
          </section>

          <section className="mt-8">
            <h2 className="eyebrow">Nguồn ({cites.length})</h2>
            <SourceList items={cites} />
            <p className="mt-3 text-xs text-stone-500">
              Mỗi nguồn liệt kê một lần, kèm các ô dữ liệu dùng nó. Xem ý nghĩa nhãn xác minh tại{' '}
              <Link className="underline" to="/sources">trang Nguồn</Link>.
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
