import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { BlogPost, Author } from '@colourfully-digital/types/sanity'

// Mock the Sanity client
const mockClient = {
  fetch: vi.fn()
}

vi.mock('@sanity/client', () => ({
  createClient: vi.fn(() => mockClient)
}))

vi.mock('@sanity/image-url', () => ({
  default: vi.fn(() => ({
    image: vi.fn(() => ({ 
      width: vi.fn().mockReturnThis(),
      height: vi.fn().mockReturnThis(),
      fit: vi.fn().mockReturnThis(),
      url: vi.fn(() => 'http://example.com/image.jpg') 
    }))
  }))
}))

describe('Blog Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Mock blog post data
  const mockBlogPost: BlogPost = {
    _id: 'blog1',
    _type: 'blogPost',
    _createdAt: '2023-01-01T00:00:00Z',
    _updatedAt: '2023-01-01T00:00:00Z',
    _rev: 'rev1',
    title: 'Test Blog Post',
    slug: { _type: 'slug', current: 'test-blog-post' },
    publishedAt: '2023-01-01T00:00:00Z',
    mainImage: {
      asset: { _id: 'image-abc123', url: 'http://example.com/image.jpg' },
      alt: 'Test image'
    },
    body: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'This is a test blog post content.'
          }
        ]
      }
    ],
    language: 'en',
    author: {
      _id: 'author1',
      _type: 'author',
      _createdAt: '2023-01-01T00:00:00Z',
      _updatedAt: '2023-01-01T00:00:00Z',
      _rev: 'rev1',
      name: 'Test Author',
      picture: {
        asset: { _id: 'image-def456', url: 'http://example.com/author.jpg' },
        alt: 'Author picture'
      }
    }
  }

  const mockBlogPosts: BlogPost[] = [
    mockBlogPost,
    {
      ...mockBlogPost,
      _id: 'blog2',
      title: 'Second Blog Post',
      slug: { _type: 'slug', current: 'second-blog-post' },
      publishedAt: '2023-01-02T00:00:00Z'
    }
  ]

  describe('getBlogPosts', () => {
    it('should fetch blog posts with default pagination', async () => {
      mockClient.fetch.mockResolvedValueOnce(mockBlogPosts)

      const { getBlogPosts } = await import('./sanity')
      const result = await getBlogPosts('en')

      expect(result).toEqual(mockBlogPosts)
      expect(mockClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('*[_type == "blogPost" && language == $language]'),
        { language: 'en', offset: 0, end: 9 }
      )
    })

    it('should fetch blog posts with custom pagination', async () => {
      mockClient.fetch.mockResolvedValueOnce([mockBlogPost])

      const { getBlogPosts } = await import('./sanity')
      const result = await getBlogPosts('en', 5, 10)

      expect(result).toEqual([mockBlogPost])
      expect(mockClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('*[_type == "blogPost" && language == $language]'),
        { language: 'en', offset: 10, end: 14 }
      )
    })

    it('should return empty array when fetch fails', async () => {
      mockClient.fetch.mockRejectedValueOnce(new Error('Fetch failed'))
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const { getBlogPosts } = await import('./sanity')
      const result = await getBlogPosts('en')

      expect(result).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching blog posts:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })

    it('should handle French language', async () => {
      const frenchBlogPost = { ...mockBlogPost, language: 'fr' as const }
      mockClient.fetch.mockResolvedValueOnce([frenchBlogPost])

      const { getBlogPosts } = await import('./sanity')
      const result = await getBlogPosts('fr')

      expect(result).toEqual([frenchBlogPost])
      expect(mockClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('*[_type == "blogPost" && language == $language]'),
        { language: 'fr', offset: 0, end: 9 }
      )
    })
  })

  describe('getBlogPostCount', () => {
    it('should return correct count', async () => {
      mockClient.fetch.mockResolvedValueOnce(15)

      const { getBlogPostCount } = await import('./sanity')
      const result = await getBlogPostCount('en')

      expect(result).toBe(15)
      expect(mockClient.fetch).toHaveBeenCalledWith(
        'count(*[_type == "blogPost" && language == $language])',
        { language: 'en' }
      )
    })

    it('should return 0 when fetch fails', async () => {
      mockClient.fetch.mockRejectedValueOnce(new Error('Count failed'))
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const { getBlogPostCount } = await import('./sanity')
      const result = await getBlogPostCount('en')

      expect(result).toBe(0)
      expect(consoleSpy).toHaveBeenCalledWith('Error getting blog post count:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })

    it('should return 0 when result is null', async () => {
      mockClient.fetch.mockResolvedValueOnce(null)

      const { getBlogPostCount } = await import('./sanity')
      const result = await getBlogPostCount('en')

      expect(result).toBe(0)
    })
  })

  describe('getBlogPost', () => {
    it('should fetch single blog post by slug', async () => {
      mockClient.fetch.mockResolvedValueOnce(mockBlogPost)

      const { getBlogPost } = await import('./sanity')
      const result = await getBlogPost('test-blog-post', 'en')

      expect(result).toEqual(mockBlogPost)
      expect(mockClient.fetch).toHaveBeenCalledWith(
        expect.stringContaining('*[_type == "blogPost" && slug.current == $slug && language == $language][0]'),
        { slug: 'test-blog-post', language: 'en' }
      )
    })

    it('should return null when blog post not found', async () => {
      mockClient.fetch.mockResolvedValueOnce(null)

      const { getBlogPost } = await import('./sanity')
      const result = await getBlogPost('non-existent-slug', 'en')

      expect(result).toBeNull()
    })

    it('should return null when fetch fails', async () => {
      mockClient.fetch.mockRejectedValueOnce(new Error('Fetch failed'))
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const { getBlogPost } = await import('./sanity')
      const result = await getBlogPost('test-blog-post', 'en')

      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching blog post:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })
  })

  describe('urlFor', () => {
    it('should build image URL correctly', async () => {
      const { urlFor } = await import('./sanity')
      const result = urlFor({ asset: { _id: 'image-abc123', url: 'http://example.com/image.jpg' } })

      expect(result).toBeDefined()
      // The mock returns a chainable object, so we test the structure
      expect(typeof result.width).toBe('function')
      expect(typeof result.height).toBe('function')
      expect(typeof result.fit).toBe('function')
    })
  })
})
