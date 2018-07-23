import { formatDate, buildSortComparator } from './datetime'

describe('.formatDate()', () => {
  it('formats a date', () => {
    expect(formatDate('2017-02-27 08:45:34')).toEqual('2017-02-27 08:45:34')
    expect(formatDate(new Date('1995-12-17T03:24:01'))).toEqual(
      '1995-12-17 03:24:01'
    )
  })
})

describe('.buildSortComparator()', () => {
  it('builds a comparator to sort dates', () => {
    const cmp = buildSortComparator('ts')

    const unsorted = [
      {
        id: 1,
        ts: '1995-12-17T03:24:01'
      },
      {
        id: 2,
        ts: '1995-11-17T03:24:01'
      },
      {
        id: 3,
        ts: '1996-11-17T03:24:01'
      },
      {
        id: 4,
        ts: '1991-11-17T03:24:01'
      }
    ]

    const ret = unsorted.sort(cmp)

    expect(ret.map(r => r.id)).toEqual([ 4, 2, 1, 3 ])
  })
})
