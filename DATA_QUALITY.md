# DATA_QUALITY — Cổng INTENSE (2026-09-14, đợt 3: trilingual EN/VI/ZH-TW)

`node scripts/audit.mjs`: **0 lỗi blocking** (2026-09-13).

## Nguồn Tier-1 mới (quyết định)

- **10 roster核定 MOE** tải qua CloakBrowser từ cổng NTU (`intensepo2023.ntu.edu.tw`, TLS cert bỏ qua có chủ đích):
  113F (108 lớp, khóa đầu Fall 2024), 113S, 114F (147 dòng, thêm cột funding/ngôn ngữ/quốc tịch),
  114S, 115F 2 đợt (Fall 2026), 115S 2 vòng, 116F 2 đợt (Fall 2027).
  Roster liệt kê lớp được duyệt — **KHÔNG có cột quota** (ghi rõ để không ai tìm quota ở đó).
- **Guideline PDFs Tier-2** đọc trực tiếp: NTHU ISICP (37 trang), NTUST IMT, NCKU Spring27 prospectus,
  YZU Fall26 prospectus + admission list, ISU Fall26 prospectus, TKU, TMU, KSU (shared), CCU brochure (Drive thumbnail).
- FETCH_FAIL诚实记录: NTUST Spring27 PDF (TLS host), NCU handbook (Drive binary), FCU guideline (SharePoint login),
  YZU IEM (không có trong prospectus), Studocu/mirror (bot-block).

## Coverage

- Trường: **18** (12 gốc + FCU/TKU/TMU/CCU/FJU/TSUST).
- Chương trình: **58** (đợt 5: +NCHU-Semi; đợt 6: +TSUST×9 — trường outcome VN #1).
- Nguồn: **62** (1 Tier-1 MOE + 10 roster Tier-1 portal + 51 Tier-2).
- Quota known: **32/58** (+CCU 14: CHENBRO 5/TA-FA 3/YEONG CHIN 4/hiPower 2; EECS-18 đã có từ bản Spring, bản Fall corroborate + thêm IELTS 5.0/iBT 70/TOEIC 600). Chi tiết: NTUST-IMT 24; NTHU ISICP 20 (cấp chương trình, KHÔNG chia track);
  NCKU Spring27 4×4=16 (ASE Process Engineer); YZU SME 23 / SIA 10 / Accounting 8 / PB-SME 57 (đợt 2024);
  ISU 30 + 20; TKU 11 + 10; TMU 3; KSU 10/30/16/25/25; còn lại UNKNOWN诚实.
- GPA known: 6/47 (YZU×4 + ISU×2, đều 60/100). IELTS known: 12/47. Học phí known: 14/47 (số niêm yết/kỳ theo guideline).
- Mỗi program ≥3 source URL distinct (audit enforced). Bậc học mở rộng: Thạc sĩ/Tiến sĩ + Sau đại học + Cử nhân 2 năm (theo roster 學士後/二年制學士).
- History events: 23 (2023–2026 + roster 113/114/115/116).

## Sửa sai quan trọng đợt 2 (từ roster Tier-1)

1. NCKU Chem Fall 2026: field **半導體** + **tiếng Anh** (trước đó UNKNOWN) — row 7 roster 115F_b1.
2. FCU: tham gia từ **2024** (113F row 29 水利永續綠色工程), không phải chỉ 2026; field Fall 2026 là **bán dẫn** (row 35).
3. NTHU ISICP quota 20 là **cấp chương trình** (PDF §VIII 至多20人, không chia track) — cả 2 track entries dùng chung số + note chống đọc nhầm per-track.
4. ISU tiếng Trung quota 20 = **Mechanical & Automation** (roster), website ISU ghi Semiconductor Engineering — giữ cả hai + note lệch tên.
5. NCU deadline 01–24/04/2026 hạ verification → **UNCONFIRMED** (trang sn/83 + sn/78 trống); NCU obligation → null (hub không công bố số năm).
6. NTU: tên chuẩn roster (金融科技/數理工程科技碩士+博士) + thêm **半導體科技碩士專班 (天鈺科技)**.
7. YZU SME tuyển **Thái Lan** (115F_b1 row 38); SIA tuyển Việt Nam (row 39) — ghi trong notes.

## Ô thiếu còn lại

- GPA: 41/47 unknown (có negative-evidence provenance). Quota: 26/47 unknown (roster MOE không có cột quota — giới hạn cấu trúc, không phải thiếu sót khai thác).
- NCU per-track quota: handbook Drive FETCH_FAIL + mirror bị chặn — UNKNOWN với notes đầy đủ.
- NTUST-IM Spring27: toàn bộ số học FETCH_FAIL (TLS) — chỉ giữ identity + deadline INTACT.
- Đối tác: 30/47 có tên; vòng quay đối tác theo kỳ (NCKU Fall26 Chem? vs Spring27 ASE) — không copy đối tác kỳ này sang kỳ khác.

## Xung đột (giữ cả hai)

1. NTU portal TLS cert fail vs inbound links → dùng CloakBrowser ignore-cert (đọc được, Tier-1).
2. TKU deadline: guideline 22/04–15/05 vs INTACT 22/04–25/05 → lấy guideline + note.
3. YZU SIA stipend: poster 12.000 vs prospectus 10.000 → lấy poster (program-specific) + note.
4. YZU IEM không có trong prospectus → quota UNKNOWN + admission list (3+4 waitlist AUO).
5. NTHU CoSR stipend 20k: liên kết INTENSE chưa xác nhận → scope DEPARTMENT.

## Giới hạn

- Tỷ giá `NTD_TO_VND = 830` (2026) một chỗ `src/lib/format.ts`. `INTENSE_START_YEAR = 2024` một chỗ `src/lib/data.ts`.
- KMU (Kaohsiung Medical, 企業全額補助) và CSU (正修 8+ programs) có trong roster nhưng chưa khai thác guideline → chưa vào dataset (ghi nhận, không bịa).
- NSYSU (Chem/MSE/Photon, không quota) chưa vào dataset — Chem chỉ tuyển MY/TH, ít liên quan VN.

## Đợt 3 (2026-09-14): trilingual review

- Search cả 3 ngôn ngữ đều dùng được. VI: bài INTACT 188 SV VN Fall 2026 (Tier-2: STEM 161/85,6%, EN 54,8%, thạc sĩ 98, cử nhân 2 năm 72; Bắc 112/Nam 52/Trung 11) → source intact-188-vi + history event.
- ZH: FJU Food master mới (quota 2, tuition 53.720, TOCFL A2→B1); NTHU CoSR-MS deadlines ZH cross-check; NYCU ICST deadlines Fall 04/02–02/03/2026 + Spring 10/08–01/09/2026; NCU AME quota NEGATIVE (hub không ghi số).
- EN: NCU deadline Apr 1–24/2026 khôi phục OFFICIAL (sn/83 posted 31/03/2026 + INTACT corroborate; cửa sổ chung sn/89); NCU stats PDF domestic-only (KHÔNG import); NCHU tuition chung Engineering 52.994/kỳ (scope UNIVERSITY_GENERAL); NCHU INTENSE URL chính thức iss.nchu.edu.tw (DNS-fail, ghi notes); MUST EN FETCH_FAIL toàn diện (522/JS/404).
- VI cross-check 15 claims: 188/79/MOE-standards ĐÚNG; 919-tổng/140-VN CHƯA RÕ (Tier-5 duy nhất, cấm nhập); MUST quotas 22/10/10 + GPA 60 TIER5-UNVERIFIED (cấm nhập); TSUST vắng roster nhưng 41,8% outcome → shell + follow-up.
- NCKU domestic quota table (EE 241/ME 167/...) TUYỆT ĐỐI không import xuống INTENSE — chỉ để thấy độ chọn lọc (INTENSE 4/ngành).
- ICST tuition offshore (USD250/kỳ) là 境外專班, cấm nhập vào INTENSE.

## Đợt 4 (2026-09-14): săn quota kỹ (Drive + mirror)

- Tải guideline Drive qua CloakBrowser: NCU Fall26 (31 trang) cho quota per-track 17/2/10 khớp tổng 29; NYCU ICST Fall26 quota 41 + EECS Spring27 quota 18; cả hai ghi Academic Grades Criteria: – (không GPA cutoff).
- FCU quota 20 từ mirror Scribd (SECONDARY_SOURCE: filename khớp SharePoint, ngày khớp trang FCU; số chờ bản gốc).
- Negative có giá trị: NTU Smart MHI / YZU IEM / NTU FinTech-STEM-Semi / NTUST-IM không công bố quota ở Tier-1/2; NCU stats PDF domestic-only; NCKU domestic table cấm import; TMU-SMD ô quota trống chính thức; NTUT handbook general-quota 5 (không phải INTENSE).
- Còn UNKNOWN (20): NTU×4, NTUST-IM, NYCU-PhD, NTHU-CoSR×2, NCKU-Chem, NTUT×3, YZU-IEM, TMU-SMD, CCU, NCHU×4 — đều có notes nêu đã thử gì.

## Đợt 5 (2026-09-14): Wayback + NCHU live (CloakBrowser qua DNS)

- Wayback: NTUST admission files có archive (IMT-2025, IMT-2026) nhưng KHÔNG có 2027Spring guideline (chưa từng crawl); int2027s không archive; archive.org throttle 429 sau query wildcard — kết luận: Wayback không cứu được file chưa từng crawl.
- Common Crawl: không có capture iss.nchu.edu.tw.
- NCHU live qua CloakBrowser (read-tool DNS chết): Semi quota 15 (MSE, IELTS 5.0/iBT 61/TOEIC 670, Micron), Civil quota 11 (stipend 12.500/tháng + 11 full-time, iHOUSE/For-Tune), Smart quota 6 (CHỈ Philippines — VN loại), tuition NCHU INTENSE 50.000/kỳ 2 năm, apply Spring 2027: 10/09–12/10/2026.
- WP-JSON iss.nchu.edu.tw chỉ có đúng 4 trang INTENSE (main/smart/civil/semi) — photo/intellisci các khóa cũ đã gỡ, chi tiết còn UNKNOWN诚实.

## Đợt 6 (2026-09-14): TSUST từ intact Fall table

- Trang hub /intense-program/ redirect về bảng Fall 2026 đã khai thác — không có nội dung mới, nhưng soát lại phát hiện 8 hàng TSUST.
- Guideline TSUST Fall 2026 (37 trang, Tier-2): 9 ngành VN-eligible (ICT/MAE/Fastener/Arch/Mechatronics/EM/Packaging/InfoComm/ConstrMgmt), học phí 50.853/kỳ, NDF rules đầy đủ, đối tác Sapido/EGM/Chun Yu/Fang Jun/You-Ji/ASE/NewSoft/công ty xây dựng; tổng 265 (7×30/2×20/1×15) nhưng KHÔNG mapping lớp↔quota → quota null诚实.
- Fang Jun (KSU) được corroborate độc lập qua TSUST Mechatronics.

## Đợt 7 (2026-09-14): vét link guideline INTACT

- Bài học: link Drive từng timeout vẫn tải được khi thử lại bằng CloakBrowser (NYCU EECS Fall26: IELTS 5.0/iBT 70/TOEIC 600, quota 18 khớp bản Spring).
- CCU brochure full 7 trang (tải qua uc-export sau khi viewer-only fail): quota 14 theo vị trí công ty, research plan 3000 từ bắt buộc, rec ×2.
- NTU reurl resolve ra trang OIA admission-system nhưng báo 無法取得簡章資訊 (dead end诚实); NTUST host vẫn chết.
- MHI tuition fix: 100.000/kỳ niêm yết (50.000 chỉ là subsidy).
