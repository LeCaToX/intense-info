// Kiểu chuẩn cổng INTENSE. Mọi ô quan trọng là FieldValue để giữ
// unknown_label đúng 1 trong 4 chuỗi + scope + provenance.

export type Verification =
  | 'VERIFIED'
  | 'CROSS_CHECKED'
  | 'OFFICIAL_SINGLE_SOURCE'
  | 'SECONDARY_SOURCE'
  | 'UNCONFIRMED'
  | 'OUTDATED'
  | 'UNKNOWN'

export interface Provenance {
  source_url: string
  source_title: string
  source_type: 'MOE' | 'GOV' | 'UNIVERSITY' | 'DEPARTMENT' | 'COMPANY' | 'MEDIA' | 'OTHER'
  source_date?: string
  accessed_date: string
  language: 'en' | 'vi' | 'zh-TW'
  verification: Verification
  notes?: string
}

export type UnknownLabel =
  | 'Chưa công bố'
  | 'Không tìm thấy thông tin chính thức'
  | 'Không áp dụng'
  | 'Thông tin chưa xác thực'

export type FieldScope =
  | 'INTENSE'
  | 'UNIVERSITY_GENERAL'
  | 'DEPARTMENT'
  | 'SCHOLARSHIP'
  | 'GRADUATION'
  | 'INTERNSHIP'
  | 'EMPLOYMENT'

export interface FieldValue<T> {
  value: T | null
  unknown_label?: UnknownLabel
  provenance?: Provenance
  scope: FieldScope
}

export interface University {
  id: string
  name_en: string
  name_zh: string
  name_vi: string
  acronym: string
  city: string
  region: 'Bắc' | 'Trung' | 'Nam' | 'Đông'
  location_note?: string
  type: string
  website: string
  admissions_url?: FieldValue<string>
  intense_page?: FieldValue<string>
  intense_status_by_year: Record<string, boolean>
}
// Bậc học mở rộng theo roster MOE: 學士後 (post-bacc) và 二年制學士 (bachelor 2 năm) ngoài thạc/tiến sĩ.
export type Degree = 'Thạc sĩ' | 'Tiến sĩ' | 'Sau đại học' | 'Cử nhân 2 năm'
export type TeachingLanguage = 'Tiếng Anh' | 'Song ngữ' | 'Tiếng Trung'
export type QuotaScope =
  | 'INTENSE_PROGRAM'
  | 'DEPARTMENT'
  | 'UNIVERSITY'
  | 'COMPANY_SPONSORED'
  | 'UNKNOWN'

export interface Program {
  id: string
  university_id: string
  college?: string
  department: string
  name_en: string
  name_zh?: string
  name_vi: string
  degree: Degree
  campus?: string
  city: string
  categories: string[]
  duration_years: FieldValue<number>
  language: FieldValue<TeachingLanguage>
  english_taught: FieldValue<boolean>
  min_gpa: FieldValue<number>
  gpa_scale: FieldValue<number>
  ielts: FieldValue<number>
  toefl_ibt: FieldValue<number>
  toeic: FieldValue<number>
  chinese_req: FieldValue<string>
  docs: {
    sop: boolean
    recommendation_letters: number
    research_proposal: boolean
    interview: boolean
    portfolio: boolean
  }
  deadlines: FieldValue<string>
  tuition_ntd_per_semester: FieldValue<number>
  monthly_stipend_ntd: FieldValue<number>
  stipend_duration_months: FieldValue<number>
  tuition_waiver: FieldValue<boolean>
  quota: FieldValue<number>
  quota_scope: QuotaScope
  partners: string[]
  internship_required: FieldValue<boolean>
  postgrad_obligation_years: FieldValue<number>
  intense_cycle_start: string
}

export interface Source {
  id: string
  title: string
  url: string
  tier: 1 | 2 | 3 | 4 | 5
  publisher: string
  pub_date?: string
  accessed_date: string
  language: string
  applies_to: string
}

export type HistoryKind =
  | 'NEW_PROGRAM'
  | 'CLOSED'
  | 'QUOTA'
  | 'REQUIREMENT'
  | 'SCHOLARSHIP'
  | 'POLICY'

export interface HistoryEvent {
  year: string
  entity: string
  change: string
  source_id: string
  kind: HistoryKind
}

export interface Category {
  id: string
  name_vi: string
  name_en: string
  description_vi: string
}

export interface Faq {
  id: string
  question: string
  answer: string
  links?: { label: string; to: string }[]
}

export interface CompanyPartner {
  name: string
  sector: string
  programs: string[]
}
