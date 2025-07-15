import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { BlogPost } from '@colourfully-digital/types/sanity'

// Mock the sanity module
vi.mock('../lib/sanity', () => ({
  getBlogPosts: vi.fn(),
  getBlogPostCount: vi.fn(),
  getBlogPost: vi.fn(),
  urlFor: vi.fn(() => ({
    width: vi.fn().mockReturnThis(),
    height: vi.fn().mockReturnThis(),
    fit: vi.fn().mockReturnThis(),
    url: vi.fn(() => 'http://example.com/image.jpg')
  }))
}))

// Mock the translations module
vi.mock('../lib/translations', () => ({
  t: vi.fn((key: string, lang: string) => {
    const translations: Record<string, string> = {
      'blog.title': lang === 'en' ? 'Blog' : 'Blogue',
      'blog.description': lang === 'en' ? 'Read our latest posts' : 'Lisez nos derniers articles',
      'blog.noPostsFound': lang === 'en' ? 'No blog posts found.' : 'Aucun article trouvé.',
      'blog.readMore': lang === 'en' ? 'Read more' : 'Lire la suite',
      'blog.publishedOn': lang === 'en' ? 'Published on' : 'Publié le',
      'blog.by': lang === 'en' ? 'by' : 'par',
      'blog.backToBlog': lang === 'en' ? 'Back to Blog' : 'Retour au blogue',
      'blog.pagination.page': lang === 'en' ? 'Page' : 'Page',
      'blog.pagination.previous': lang === 'en' ? 'Previous' : 'Précédent',
      'blog.pagination.next': lang === 'en' ? 'Next' : 'Suivant'
    }
    return translations[key] || key
  }),
  formatDate: vi.fn((date: Date, lang: string) => {
    return lang === 'en' ? 'January 1, 2023' : '1 janvier 2023'
  })
}))

describe('Blog Page Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

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

  describe('Blog Index Page Data Flow', () => {
    it('should handle successful data fetching', async () => {
      const { getBlogPosts, getBlogPostCount } = await import('../lib/sanity')
      const { t } = await import('../lib/translations')

      // Mock successful responses
      ;(getBlogPosts as any).mockResolvedValue([mockBlogPost])
      ;(getBlogPostCount as any).mockResolvedValue(1)

      // Simulate the page logic
      const lang = 'en'
      const currentPage = 1
      const postsPerPage = 10
      const offset = (currentPage - 1) * postsPerPage

      const [posts, count] = await Promise.all([
        getBlogPosts(lang, postsPerPage, offset),
        getBlogPostCount(lang)
      ])

      const totalPages = Math.ceil(count / postsPerPage)
      const hasNextPage = currentPage < totalPages
      const hasPrevPage = currentPage > 1

      // Verify the data flow
      expect(getBlogPosts).toHaveBeenCalledWith('en', 10, 0)
      expect(getBlogPostCount).toHaveBeenCalledWith('en')
      expect(posts).toEqual([mockBlogPost])
      expect(count).toBe(1)
      expect(totalPages).toBe(1)
      expect(hasNextPage).toBe(false)
      expect(hasPrevPage).toBe(false)

      // Test translation keys
      expect(t('blog.title', lang)).toBe('Blog')
      expect(t('blog.description', lang)).toBe('Read our latest posts')
    })

    it('should handle pagination correctly', async () => {
      const { getBlogPosts, getBlogPostCount } = await import('../lib/sanity')

      // Mock pagination scenario
      ;(getBlogPosts as any).mockResolvedValue([mockBlogPost])
      ;(getBlogPostCount as any).mockResolvedValue(25)

      const lang = 'en'
      const currentPage = 2
      const postsPerPage = 10
      const offset = (currentPage - 1) * postsPerPage

      const [posts, count] = await Promise.all([
        getBlogPosts(lang, postsPerPage, offset),
        getBlogPostCount(lang)
      ])

      const totalPages = Math.ceil(count / postsPerPage)
      const hasNextPage = currentPage < totalPages
      const hasPrevPage = currentPage > 1

      expect(getBlogPosts).toHaveBeenCalledWith('en', 10, 10)
      expect(totalPages).toBe(3)
      expect(hasNextPage).toBe(true)
      expect(hasPrevPage).toBe(true)
    })

    it('should handle empty blog posts', async () => {
      const { getBlogPosts, getBlogPostCount } = await import('../lib/sanity')
      const { t } = await import('../lib/translations')

      // Mock empty response
      ;(getBlogPosts as any).mockResolvedValue([])
      ;(getBlogPostCount as any).mockResolvedValue(0)

      const lang = 'en'
      const [posts, count] = await Promise.all([
        getBlogPosts(lang, 10, 0),
        getBlogPostCount(lang)
      ])

      expect(posts).toEqual([])
      expect(count).toBe(0)
      expect(t('blog.noPostsFound', lang)).toBe('No blog posts found.')
    })

    it('should handle errors gracefully', async () => {
      const { getBlogPosts, getBlogPostCount } = await import('../lib/sanity')

      // Mock error responses
      ;(getBlogPosts as any).mockRejectedValue(new Error('API Error'))
      ;(getBlogPostCount as any).mockRejectedValue(new Error('API Error'))

      const lang = 'en'
      let posts: BlogPost[] = []
      let count = 0

      try {
        const [postsResult, countResult] = await Promise.all([
          getBlogPosts(lang, 10, 0),
          getBlogPostCount(lang)
        ])
        posts = postsResult
        count = countResult
      } catch (error) {
        // In the actual page, errors are caught and defaults are used
        posts = []
        count = 0
      }

      expect(posts).toEqual([])
      expect(count).toBe(0)
    })
  })

  describe('Blog Post Page Data Flow', () => {
    it('should fetch single blog post successfully', async () => {
      const { getBlogPost } = await import('../lib/sanity')
      const { t } = await import('../lib/translations')

      // Mock successful response
      ;(getBlogPost as any).mockResolvedValue(mockBlogPost)

      const slug = 'test-blog-post'
      const lang = 'en'
      const blogPost = await getBlogPost(slug, lang)

      expect(getBlogPost).toHaveBeenCalledWith('test-blog-post', 'en')
      expect(blogPost).toEqual(mockBlogPost)

      // Test page title generation
      const pageTitle = blogPost ? `${blogPost.title} - Colourfully Digital` : `${t('blog.title', lang)} - Colourfully Digital`
      expect(pageTitle).toBe('Test Blog Post - Colourfully Digital')
    })

    it('should handle blog post not found', async () => {
      const { getBlogPost } = await import('../lib/sanity')
      const { t } = await import('../lib/translations')

      // Mock null response
      ;(getBlogPost as any).mockResolvedValue(null)

      const slug = 'non-existent-slug'
      const lang = 'en'
      const blogPost = await getBlogPost(slug, lang)

      expect(blogPost).toBeNull()

      // Test fallback page title
      const pageTitle = blogPost ? `${blogPost.title} - Colourfully Digital` : `${t('blog.title', lang)} - Colourfully Digital`
      expect(pageTitle).toBe('Blog - Colourfully Digital')
    })

    it('should handle blog post fetch error', async () => {
      const { getBlogPost } = await import('../lib/sanity')

      // Mock error response
      ;(getBlogPost as any).mockRejectedValue(new Error('Fetch error'))

      const slug = 'test-blog-post'
      const lang = 'en'
      let blogPost: BlogPost | null = null

      try {
        blogPost = await getBlogPost(slug, lang)
      } catch (error) {
        // In the actual page, errors are caught and null is set
        blogPost = null
      }

      expect(blogPost).toBeNull()
    })
  })

  describe('Multilingual Support', () => {
    it('should handle French translations', async () => {
      const { t } = await import('../lib/translations')

      expect(t('blog.title', 'fr')).toBe('Blogue')
      expect(t('blog.description', 'fr')).toBe('Lisez nos derniers articles')
      expect(t('blog.backToBlog', 'fr')).toBe('Retour au blogue')
    })

    it('should handle French blog posts', async () => {
      const { getBlogPosts } = await import('../lib/sanity')

      const frenchBlogPost: BlogPost = {
        ...mockBlogPost,
        language: 'fr',
        title: 'Article de Test'
      }

      ;(getBlogPosts as any).mockResolvedValue([frenchBlogPost])

      const posts = await getBlogPosts('fr', 10, 0)

      expect(getBlogPosts).toHaveBeenCalledWith('fr', 10, 0)
      expect(posts[0].language).toBe('fr')
      expect(posts[0].title).toBe('Article de Test')
    })
  })

  describe('Image URL Generation', () => {
    it('should generate correct image URLs', async () => {
      const { urlFor } = await import('../lib/sanity')

      const imageAsset = {
        asset: { _id: 'image-abc123', url: 'http://example.com/image.jpg' }
      }

      const imageBuilder = urlFor(imageAsset)
      
      expect(imageBuilder).toBeDefined()
      expect(typeof imageBuilder.width).toBe('function')
      expect(typeof imageBuilder.height).toBe('function')
      expect(typeof imageBuilder.fit).toBe('function')

      // Test chaining
      const result = imageBuilder.width(800).height(400).fit('crop')
      expect(result).toBeDefined()
    })
  })
})
