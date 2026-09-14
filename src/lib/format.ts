// Chuẩn tiền tệ duy nhất: lưu gốc NTD, hiển thị NT$ + quy đổi ₫.
// KHÔNG hardcode tỷ giá ở component — chỉ dùng hằng số này.

/** Tỷ giá quy đổi NTD → VND kèm năm áp dụng (hiển thị cạnh mọi con số). */
export const NTD_TO_VND = 830
export const NTD_TO_VND_YEAR = '2026'

export function formatNTD(ntd: number | null | undefined): string {
  if (ntd === null || ntd === undefined) return 'Chưa công bố'
  return `NT$${ntd.toLocaleString('en-US')}`
}

export function formatVND(ntd: number | null | undefined): string {
  if (ntd === null || ntd === undefined) return 'Chưa công bố'
  const vnd = Math.round(ntd * NTD_TO_VND)
  return `≈ ${vnd.toLocaleString('vi-VN')} ₫`
}

export function formatMoneyPair(ntd: number | null | undefined): string {
  if (ntd === null || ntd === undefined) return 'Chưa công bố'
  return `${formatNTD(ntd)} (${formatVND(ntd)})`
}

export function formatStipendDuration(months: number | null | undefined): string {
  if (months === null || months === undefined) return 'Chưa công bố'
  return `${months} tháng`
}

/** Hiển thị FieldValue<number | string | boolean> dạng text + unknown_label chuẩn. */
export function fieldText<T>(
  field: { value: T | null; unknown_label?: string } | undefined,
  format?: (v: T) => string,
): string {
  if (!field) return 'Không tìm thấy thông tin chính thức'
  if (field.value !== null && field.value !== undefined) {
    return format ? format(field.value as T) : String(field.value)
  }
  return field.unknown_label ?? 'Chưa công bố'
}
