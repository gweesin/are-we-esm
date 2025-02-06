import { describe, expect, it } from 'vitest'
import { constructPatternFilter } from '../src/utils'

describe('constructPatternFilter', () => {
  it('should match exact strings', () => {
    const filter = constructPatternFilter(['test', 'example'])
    expect(filter('test')).toBe(true)
    expect(filter('example')).toBe(true)
    expect(filter('other')).toBe(false)
  })

  it('should match patterns with wildcards', () => {
    const filter = constructPatternFilter(['*.js', '*.ts'])
    expect(filter('file.js')).toBe(true)
    expect(filter('file.ts')).toBe(true)
    expect(filter('file.txt')).toBe(false)
  })

  it('should match patterns with regex special characters', () => {
    const filter = constructPatternFilter(['example*'])
    expect(filter('example123')).toBe(true)
    expect(filter('test123')).toBe(false)
  })

  it('should handle empty patterns', () => {
    const filter = constructPatternFilter([])
    expect(filter('anything')).toBe(false)
  })

  it('should match mixed exact strings and patterns', () => {
    const filter = constructPatternFilter(['test', '*.js'])
    expect(filter('test')).toBe(true)
    expect(filter('file.js')).toBe(true)
    expect(filter('example')).toBe(false)
  })
})
