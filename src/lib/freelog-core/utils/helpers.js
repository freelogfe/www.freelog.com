export function createScript(url, type) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    // script.type = type || 'module'
    script.src = url
    script.onload = resolve
    script.onerror = reject
    script.async = 'async'
    document.getElementsByTagName('head').item(0).appendChild(script)
  })
}

export function createCssLink(href, type) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.ref = 'stylesheet'
    link.type = type || 'text/css'
    link.href = href
    link.onload = resolve
    link.onerror = reject
    document.getElementsByTagName('head').item(0).appendChild(link)
  })
}
