type Space = { title?: string; label?: string } | null | undefined

// Hides internal identifiers such as LONG_FORM or long_form
export function cleanLabel(v?: string | null) {
    const s = (v || '').trim()
    if (!s) return undefined
    if (/^[A-Za-z0-9]+(?:_[A-Za-z0-9]+)+$/.test(s)) return undefined
    return s
}
export const cleanTitle = (v?: string | null) => cleanLabel(v) || 'Untitled'
export const spaceLabel = (space: Space) => cleanLabel(space?.label) || cleanLabel(space?.title)
export const scriptLabel = (space: Space) => spaceLabel(space) || 'Long-form script'