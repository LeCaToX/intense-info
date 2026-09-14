import { useEffect } from 'react'

export function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = title + ' | Cổng INTENSE Đài Loan'
    let m = document.querySelector('meta[name="description"]')
    if (m) m.setAttribute('content', description)
    let og = document.querySelector('meta[property="og:title"]')
    if (og) og.setAttribute('content', title)
  }, [title, description])
}
