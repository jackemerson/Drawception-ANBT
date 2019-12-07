export function getPanelId(url) {
  const match = url.match(/\/panel\/[^/]+\/(\w+)\//)
  if (match) return match[1]
}
