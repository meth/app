import format from 'date-fns/format'
import isAfter from 'date-fns/is_after'

export const formatDate = d => format(d, 'YYYY-MM-DD HH:mm:ss')

export const buildSortComparator = prop => (a, b) => (isAfter(a[prop], b[prop]) ? 1 : -1)
