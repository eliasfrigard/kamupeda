export const normalizeSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-')
}
