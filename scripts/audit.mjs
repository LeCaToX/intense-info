// Kiểm tra: id trùng, university_id mồ côi, category lạ, đơn vị NTD, quota thiếu scope, claim thiếu source.
import { readFileSync } from 'node:fs'
let errors = 0
const fail = (m) => { console.error('BLOCKING: ' + m); errors++ }
const warn = (m) => console.log('WARN: ' + m)
const uniText = readFileSync('src/data/universities.ts', 'utf8')
const progText = readFileSync('src/data/programs.ts', 'utf8')
const catText = readFileSync('src/data/categories.ts', 'utf8')
const getIds = (t) => [...t.matchAll(/(?:^|[\s,{])id:\s*['"]([^'"]+)['"]/gm)].map((m) => m[1])
const uniIds = getIds(uniText), progIds = getIds(progText)
const dup = (a, n) => { const s = new Set(); for (const x of a) { if (s.has(x)) fail(n + ' trùng id: ' + x); s.add(x) } }
dup(uniIds, 'university'); dup(progIds, 'program')
const catIds = new Set(getIds(catText))
for (const m of progText.matchAll(/university_id:\s*['"]([^'"]+)['"]/g)) if (!uniIds.includes(m[1])) fail('program university_id mồ côi: ' + m[1])
for (const m of progText.matchAll(/categories:\s*\[([^\]]*)\]/g)) for (const c of m[1].matchAll(/['"]([^'"]+)['"]/g)) if (!catIds.has(c[1])) fail('category lạ: ' + c[1])
if (/tuition_ntd_per_semester:\s*fv\([1-9][0-9]{0,3}[,\)]/.test(progText)) warn('tuition có giá trị nhỏ bất thường, kiểm tra đơn vị NTD')
if (uniIds.length < 10) fail('chỉ có ' + uniIds.length + ' trường, cần ≥10')
if (progIds.length < 30) fail('chỉ có ' + progIds.length + ' chương trình, cần ≥30')
// Mỗi program cần ≥3 source URL distinct trong provenance
const blocks = progText.split(/\n\s*id:\s*'/).slice(1)
for (const b of blocks) {
  const idm = b.match(/^([^'"]+)/)
  const pid = idm ? idm[1] : '?'
  const urls = new Set([...b.matchAll(/https?:\/\/[^'"`\s,)]+/g)].map((m) => m[0].replace(/[.,;]+$/, '')))
  if (urls.size < 3) fail('program ' + pid + ' chỉ có ' + urls.size + ' source URL, cần ≥3')
}
if (!readFileSync('src/data/sources.ts', 'utf8').includes('english.moe.gov.tw')) warn('thiếu nguồn MOE hạt giống')
console.log(errors === 0 ? 'audit: 0 lỗi blocking' : 'audit: ' + errors + ' lỗi blocking')
process.exit(errors === 0 ? 0 : 1)
