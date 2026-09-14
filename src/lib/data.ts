import { categories } from '../data/categories'
import { historyEvents } from '../data/history'
import { programs } from '../data/programs'
import { sources } from '../data/sources'
import { universities } from '../data/universities'

/** Năm INTENSE chính thức bắt đầu tuyển sinh. Đổi 1 chỗ này nếu MOE chốt năm khác. */
export const INTENSE_START_YEAR = 2024
/** Năm MOE công bố chương trình. */
export const INTENSE_ANNOUNCE_YEAR = 2023
/** Cửa sổ lịch sử hiển thị: gồm tiền INTENSE + INTENSE chính thức. */
export const HISTORY_START_YEAR = 2021
export const HISTORY_END_YEAR = 2026

export function getUniversity(id: string) {
  return universities.find((u) => u.id === id)
}

export function getProgram(id: string) {
  return programs.find((p) => p.id === id)
}

export function getProgramsByUniversity(universityId: string) {
  return programs.filter((p) => p.university_id === universityId)
}

export function getProgramsByCategory(categoryId: string) {
  return programs.filter((p) => p.categories.includes(categoryId))
}

export function getCategory(id: string) {
  return categories.find((c) => c.id === id)
}

export function getSource(id: string) {
  return sources.find((s) => s.id === id)
}

export function getHistoryByYear(year: string) {
  return historyEvents.filter((e) => e.year === year)
}

/** Năm < INTENSE_START_YEAR là predecessor (tiền INTENSE), cấm gắn nhãn INTENSE. */
export function isPreIntenseYear(year: string): boolean {
  return Number(year) < INTENSE_START_YEAR
}

export function participatingUniversities(year: string) {
  return universities.filter((u) => u.intense_status_by_year[year] === true)
}

export const stats = {
  programCount: programs.length,
  universityCount: universities.length,
  categoryCount: categories.length,
  lastUpdated: '2026-09-13',
}
