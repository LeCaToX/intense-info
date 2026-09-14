import type { Category } from '../lib/types'

// Taxonomy chốt: giữ `other` cuối. Mỗi program 1–3 categories,
// ưu tiên phân loại chính thức của trường rồi mới map về taxonomy này.
export const categories: Category[] = [
  { id: 'ai-ml', name_vi: 'Trí tuệ nhân tạo & Học máy', name_en: 'AI & Machine Learning', description_vi: 'Trí tuệ nhân tạo, học máy, thị giác máy tính, NLP.' },
  { id: 'cs-software', name_vi: 'Khoa học máy tính & Phần mềm', name_en: 'Computer Science & Software', description_vi: 'Khoa học máy tính, công nghệ phần mềm, hệ thống.' },
  { id: 'data-science', name_vi: 'Khoa học dữ liệu', name_en: 'Data Science', description_vi: 'Khoa học dữ liệu, thống kê, phân tích dữ liệu lớn.' },
  { id: 'electrical', name_vi: 'Kỹ thuật điện', name_en: 'Electrical Engineering', description_vi: 'Hệ thống điện, năng lượng, điều khiển.' },
  { id: 'electronics', name_vi: 'Kỹ thuật điện tử', name_en: 'Electronics Engineering', description_vi: 'Mạch điện tử, vi mạch, hệ thống nhúng.' },
  { id: 'semiconductor', name_vi: 'Bán dẫn', name_en: 'Semiconductor', description_vi: 'Vật liệu, thiết kế và chế tạo chip bán dẫn.' },
  { id: 'info-eng', name_vi: 'Kỹ thuật thông tin', name_en: 'Information Engineering', description_vi: 'Kỹ thuật thông tin, mạng, hệ thống thông tin.' },
  { id: 'robotics', name_vi: 'Robot & Tự động hoá', name_en: 'Robotics & Automation', description_vi: 'Robot, tự động hoá, điều khiển thông minh.' },
  { id: 'mechanical', name_vi: 'Kỹ thuật cơ khí', name_en: 'Mechanical Engineering', description_vi: 'Cơ khí, cơ điện tử, thiết kế chế tạo.' },
  { id: 'civil', name_vi: 'Kỹ thuật xây dựng', name_en: 'Civil Engineering', description_vi: 'Xây dựng dân dụng, kết cấu, địa kỹ thuật.' },
  { id: 'materials', name_vi: 'Vật liệu', name_en: 'Materials Science', description_vi: 'Khoa học và kỹ thuật vật liệu.' },
  { id: 'chemical', name_vi: 'Kỹ thuật hoá học', name_en: 'Chemical Engineering', description_vi: 'Hoá học ứng dụng, quy trình hoá học.' },
  { id: 'biotech', name_vi: 'Công nghệ sinh học', name_en: 'Biotechnology', description_vi: 'Công nghệ sinh học, nông nghiệp công nghệ cao.' },
  { id: 'biomedical', name_vi: 'Kỹ thuật y sinh', name_en: 'Biomedical Engineering', description_vi: 'Y sinh, thiết bị y tế, tin sinh học.' },
  { id: 'green-energy', name_vi: 'Năng lượng xanh', name_en: 'Green Energy', description_vi: 'Năng lượng tái tạo, bền vững, môi trường.' },
  { id: 'smart-manufacturing', name_vi: 'Sản xuất thông minh', name_en: 'Smart Manufacturing', description_vi: 'Sản xuất thông minh, công nghiệp 4.0.' },
  { id: 'communications', name_vi: 'Truyền thông & Viễn thông', name_en: 'Communications', description_vi: 'Viễn thông, mạng 5G/6G, truyền thông số.' },
  { id: 'fintech', name_vi: 'Công nghệ tài chính', name_en: 'Fintech', description_vi: 'Công nghệ tài chính, ngân hàng số.' },
  { id: 'business-mgmt', name_vi: 'Kinh doanh & Quản lý', name_en: 'Business & Management', description_vi: 'Quản trị, kinh doanh công nghệ, quản lý công nghiệp.' },
  { id: 'other', name_vi: 'Khác', name_en: 'Other', description_vi: 'Ngành khác ngoài taxonomy chính.' },
]
