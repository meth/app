import { sha256, sha512, encrypt, decrypt } from './'

jest.mock('./random', () => () => Promise.resolve([ 100, 100, 100, 100 ]), { virtual: true })

describe('.sha256', () => {
  it('works as expected', () => {
    expect(sha256('my random string')).toEqual('7b67e25ebe3995ce714e04ed30ad8f6636fda2baace5690af804fd14a10fbaf5')
  })
})

describe('.sha512', () => {
  it('works as expected', () => {
    expect(sha512('my random string')).toEqual('4e3e0ff891258fa02d2d08703f5faa598ebea49720075e88dbd81148b98a2b6f16f5b642825441f83320e0042bb59ddbbf6f470bbe5f3cf014fbcdda135b85ca')
  })
})

describe('.encrypt', () => {
  it('works as expected', async () => {
    const result = await encrypt(sha256('my key'), 'my data')

    expect(result).toEqual('eyJpdiI6IkFBQUFaQUFBQUdRQUFBQmtBQUFBWkE9PSIsInYiOjEsIml0ZXIiOjEwMDAsImtzIjoyNTYsInRzIjoxMjgsIm1vZGUiOiJnY20iLCJhZGF0YSI6IiIsImNpcGhlciI6ImFlcyIsImN0IjoiSmpZYmVEUzlXVjEzL0VXdWJ0bW1uNTZmcVcxZGc0blJEQT09In0=')
  })
})

describe('.decrypt', () => {
  it('works as expected', async () => {
    const result = await decrypt(sha256('my key'), 'eyJpdiI6IkFBQUFaQUFBQUdRQUFBQmtBQUFBWkE9PSIsInYiOjEsIml0ZXIiOjEwMDAsImtzIjoyNTYsInRzIjoxMjgsIm1vZGUiOiJnY20iLCJhZGF0YSI6IiIsImNpcGhlciI6ImFlcyIsImN0IjoiSmpZYmVEUzlXVjEzL0VXdWJ0bW1uNTZmcVcxZGc0blJEQT09In0=')

    expect(result).toEqual('my data')
  })
})
