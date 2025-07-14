import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { SanityTest } from '@colourfully-digital/types'

// Mock the Sanity client
const mockClient = {
  fetch: vi.fn()
}

vi.mock('@sanity/client', () => ({
  createClient: vi.fn(() => mockClient)
}))

vi.mock('@sanity/image-url', () => ({
  default: vi.fn(() => ({
    image: vi.fn(() => ({ url: vi.fn(() => 'http://example.com/image.jpg') }))
  }))
}))

describe('Sanity Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('testConnection', () => {
    it('should return success when connection works', async () => {
      const mockData: SanityTest = {
        _id: 'test1',
        _type: 'sanityTest',
        _createdAt: '2023-01-01T00:00:00Z',
        _updatedAt: '2023-01-01T00:00:00Z',
        _rev: 'rev1',
        title: 'Test Document',
        message: 'This is a test',
        isActive: true,
        language: 'en'
      }

      mockClient.fetch.mockResolvedValueOnce(mockData)

      const { testConnection } = await import('./sanity')
      const result = await testConnection('en')

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockData)
      expect(result.error).toBeUndefined()
      expect(mockClient.fetch).toHaveBeenCalledWith('*[_type == "sanityTest" && language == $language][0]', { language: 'en' })
    })

    it('should return error when connection fails', async () => {
      const errorMessage = 'Connection failed'
      mockClient.fetch.mockRejectedValueOnce(new Error(errorMessage))

      const { testConnection } = await import('./sanity')
      const result = await testConnection('en')

      expect(result.success).toBe(false)
      expect(result.data).toBeUndefined()
      expect(result.error).toBe(errorMessage)
    })

    it('should handle unknown errors', async () => {
      mockClient.fetch.mockRejectedValueOnce('Unknown error')

      const { testConnection } = await import('./sanity')
      const result = await testConnection('en')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Unknown error occurred while connecting to Sanity')
    })
  })

  describe('getAllTestDocuments', () => {
    it('should return array of test documents', async () => {
      const mockData: SanityTest[] = [
        {
          _id: 'test1',
          _type: 'sanityTest',
          _createdAt: '2023-01-01T00:00:00Z',
          _updatedAt: '2023-01-01T00:00:00Z',
          _rev: 'rev1',
          title: 'Test Document 1',
          message: 'First test',
          isActive: true,
          language: 'en'
        },
        {
          _id: 'test2',
          _type: 'sanityTest',
          _createdAt: '2023-01-02T00:00:00Z',
          _updatedAt: '2023-01-02T00:00:00Z',
          _rev: 'rev2',
          title: 'Test Document 2',
          message: 'Second test',
          isActive: false,
          language: 'fr'
        }
      ]

      mockClient.fetch.mockResolvedValueOnce(mockData)

      const { getAllTestDocuments } = await import('./sanity')
      const result = await getAllTestDocuments('en')

      expect(result).toEqual(mockData)
      expect(mockClient.fetch).toHaveBeenCalledWith('*[_type == "sanityTest" && language == $language] | order(_createdAt desc)', { language: 'en' })
    })

    it('should return empty array when fetch fails', async () => {
      mockClient.fetch.mockRejectedValueOnce(new Error('Fetch failed'))
      
      // Mock console.error to avoid noise in test output
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const { getAllTestDocuments } = await import('./sanity')
      const result = await getAllTestDocuments('en')

      expect(result).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching test documents:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })

    it('should return empty array when result is null', async () => {
      mockClient.fetch.mockResolvedValueOnce(null)

      const { getAllTestDocuments } = await import('./sanity')
      const result = await getAllTestDocuments('en')

      expect(result).toEqual([])
    })
  })
})
